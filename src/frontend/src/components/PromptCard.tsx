import { PromptModal } from "@/components/PromptModal";
import type { Prompt } from "@/types/prompt";
import { memo, useCallback, useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&q=80";

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

export const PromptCard = memo(function PromptCard({
  prompt,
  index,
}: PromptCardProps) {
  const [imgSrc, setImgSrc] = useState(prompt.image_url || FALLBACK_IMAGE);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleError = useCallback(() => {
    if (!errored) {
      setErrored(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  }, [errored]);

  const handleOpen = useCallback(() => setModalOpen(true), []);
  const handleClose = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <button
        type="button"
        className="relative overflow-hidden cursor-pointer mb-3 break-inside-avoid w-full block rounded-xl"
        style={{
          animation: "scale-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          animationDelay: `${Math.min(index * 0.05, 0.5)}s`,
        }}
        onClick={handleOpen}
        data-ocid={`prompt.item.${index + 1}`}
        aria-label={`Open prompt: ${prompt.title}`}
      >
        {/* Skeleton */}
        {!loaded && (
          <div
            className="absolute inset-0 animate-pulse rounded-xl"
            style={{
              background: "oklch(0.14 0.01 265 / 0.8)",
              minHeight: "160px",
            }}
            aria-hidden
          />
        )}
        {/* Pure image — no text, no overlays, no icons */}
        <img
          src={imgSrc}
          alt={prompt.title}
          loading="lazy"
          decoding="async"
          onError={handleError}
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto block rounded-xl transition-all duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          } hover:brightness-110 hover:scale-[1.02] transition-transform`}
        />
      </button>

      {modalOpen && <PromptModal prompt={prompt} onClose={handleClose} />}
    </>
  );
});
