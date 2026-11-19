/**
 * Address to use for a bundled .mp4 in <video>.
 *
 * In production the bundler gives `/assets/<name>-<hash>.mp4`. Those static files
 * do not support HTTP Range requests on Cloudflare Workers, which Safari and iOS
 * need to play video, so they are requested through `/range/…` instead, where the
 * Worker answers byte ranges itself (see ./range-assets).
 *
 * In development the URL is not under `/assets/`, so it is returned unchanged
 * (the Vite dev server already supports range requests).
 */
export function videoUrl(assetUrl: string): string {
  return assetUrl.startsWith("/assets/") ? `/range/${assetUrl.slice("/assets/".length)}` : assetUrl;
}
