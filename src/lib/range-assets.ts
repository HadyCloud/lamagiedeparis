/**
 * HTTP Range support for the site's video files on Cloudflare Workers.
 *
 * Workers static assets ignore the `Range` header: they always answer `200` with
 * the whole file. Safari and iOS refuse to play a <video> unless the server
 * answers its first `Range: bytes=0-1` probe with `206 Partial Content`.
 *
 * So in production videos are requested as `/range/<name>.mp4` (see
 * `videoUrl()` in ./video-url). That path is not a static file, so the request
 * reaches the Worker (src/server.ts), which reads `/assets/<name>.mp4` through
 * the ASSETS binding and answers the requested byte range itself.
 *
 * Only small `.mp4` files are served this way: the whole file is read into
 * memory for every request (the largest video is about 4 MB).
 */

export const RANGE_PREFIX = "/range/";

/** Files above this size are never buffered; they are answered with a plain 200. */
const MAX_BUFFERED_BYTES = 16 * 1024 * 1024;

type AssetsBinding = {
  fetch: (input: Request | string | URL, init?: RequestInit) => Promise<Response>;
};

type WorkerEnv = { ASSETS?: AssetsBinding };

/** The Workers `env` is attached to the request by Nitro and mirrored on globalThis. */
function getAssetsBinding(request: Request): AssetsBinding | undefined {
  const fromRequest = (request as unknown as { runtime?: { cloudflare?: { env?: WorkerEnv } } })
    .runtime?.cloudflare?.env?.ASSETS;
  return fromRequest ?? (globalThis as unknown as { __env__?: WorkerEnv }).__env__?.ASSETS;
}

type ByteRange = { start: number; end: number };

/**
 * Parses a single `bytes=a-b`, `bytes=a-` or `bytes=-n` range.
 * Returns `null` when the header must be ignored (malformed, multi-range, or
 * last byte before first byte) and "unsatisfiable" when it starts past the end.
 */
export function parseRange(header: string, size: number): ByteRange | "unsatisfiable" | null {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match) return null;
  const [, first, last] = match;
  if (first === "" && last === "") return null;

  if (first === "") {
    const suffix = Number(last);
    if (suffix === 0 || size === 0) return "unsatisfiable";
    return { start: Math.max(0, size - suffix), end: size - 1 };
  }

  const start = Number(first);
  if (start >= size) return "unsatisfiable";
  const end = last === "" ? size - 1 : Math.min(Number(last), size - 1);
  if (Number(last) < start && last !== "") return null;
  return { start, end };
}

/**
 * Answers `/range/<name>.mp4` requests. Returns `null` for any other request
 * (and when no ASSETS binding exists, e.g. in the Vite dev server) so the
 * normal server pipeline handles it.
 */
export async function serveRangedAsset(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  if (!url.pathname.startsWith(RANGE_PREFIX)) return null;

  const assets = getAssetsBinding(request);
  if (!assets) return null;

  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
  }

  const name = url.pathname.slice(RANGE_PREFIX.length);
  if (!/^[A-Za-z0-9._-]+\.mp4$/.test(name)) return new Response("Not found", { status: 404 });

  const upstream = await assets.fetch(
    new Request(new URL(`/assets/${name}`, url), { method: "GET" }),
  );
  if (upstream.status === 404) return new Response("Not found", { status: 404 });
  if (!upstream.ok) return new Response("Bad gateway", { status: 502 });

  const length = Number(upstream.headers.get("content-length") ?? 0);
  if (length > MAX_BUFFERED_BYTES) return upstream;

  const body = await upstream.arrayBuffer();
  const size = body.byteLength;
  const etag = upstream.headers.get("etag");

  const headers = new Headers({
    "Content-Type": upstream.headers.get("content-type") ?? "video/mp4",
    "Cache-Control": upstream.headers.get("cache-control") ?? "public, max-age=31536000, immutable",
    "Accept-Ranges": "bytes",
  });
  if (etag) headers.set("ETag", etag);

  // If-Range: only honour the range when the client's copy is still the current one.
  const ifRange = request.headers.get("if-range");
  const rangeHeader = ifRange && ifRange !== etag ? null : request.headers.get("range");
  const range = rangeHeader ? parseRange(rangeHeader, size) : null;

  if (range === "unsatisfiable") {
    headers.set("Content-Range", `bytes */${size}`);
    return new Response(null, { status: 416, headers });
  }

  const isHead = request.method === "HEAD";

  if (!range) {
    headers.set("Content-Length", String(size));
    return new Response(isHead ? null : body, { status: 200, headers });
  }

  headers.set("Content-Range", `bytes ${range.start}-${range.end}/${size}`);
  headers.set("Content-Length", String(range.end - range.start + 1));
  // `bytes=0-` (what Chrome sends) covers the whole file: reuse the buffer, skip the copy.
  const covers = range.start === 0 && range.end === size - 1;
  const payload = covers ? body : body.slice(range.start, range.end + 1);
  return new Response(isHead ? null : payload, { status: 206, headers });
}
