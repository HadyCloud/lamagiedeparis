import { useEffect, useRef } from "react";
import { videoUrl } from "@/lib/video-url";

type LazyVideoProps = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Muted, looping tile video that costs nothing until it is seen: no video bytes
 * are fetched until the tile is within ~200px of the viewport, it plays while
 * visible and pauses once scrolled away. Behaves the same on mobile and desktop.
 */
export function LazyVideo({ src, poster, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    // React only sets the `muted` attribute on the server render; iOS needs the
    // property set before it allows autoplay.
    video.muted = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.src = videoUrl(src);
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return (
    <video ref={ref} poster={poster} muted loop playsInline preload="none" className={className} />
  );
}
