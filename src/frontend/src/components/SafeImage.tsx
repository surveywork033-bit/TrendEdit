import { useCallback, useState } from "react";

const FALLBACK =
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&q=80";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  onLoad?: () => void;
}

export function SafeImage({
  src,
  alt,
  className = "",
  style,
  onLoad,
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleError = useCallback(() => {
    if (!errored) {
      setErrored(true);
      setImgSrc(FALLBACK);
    }
  }, [errored]);

  const handleLoad = useCallback(() => {
    setLoaded(true);
    onLoad?.();
  }, [onLoad]);

  return (
    <div className="relative w-full overflow-hidden" style={style}>
      {/* Skeleton shown while loading */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "oklch(0.14 0.01 265 / 0.8)" }}
          aria-hidden
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-auto block transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}
