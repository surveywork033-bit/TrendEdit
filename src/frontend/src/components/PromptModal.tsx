import { usePromptStore } from "@/store/usePromptStore";
import type { Prompt } from "@/types/prompt";
import { Check, Clipboard, Heart, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&q=80";

interface PromptModalProps {
  prompt: Prompt;
  onClose: () => void;
}

export function PromptModal({ prompt, onClose }: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const [imgSrc, setImgSrc] = useState(prompt.image_url || FALLBACK_IMAGE);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgErrored, setImgErrored] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  const { favorites, toggleFavorite, addToCopyHistory } = usePromptStore();
  const isFav = favorites.includes(prompt.id);

  // Auto-focus close button on mount
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const handleImgError = useCallback(() => {
    if (!imgErrored) {
      setImgErrored(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  }, [imgErrored]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
    } catch {
      // fallback silent
    }
    addToCopyHistory(prompt);
    setCopied(true);
    toast.success("Copied to clipboard!", {
      duration: 2500,
      style: {
        background: "oklch(0.12 0.015 265)",
        border: "1px solid oklch(0.55 0.2 142 / 0.5)",
        color: "oklch(0.88 0.18 142)",
      },
    });
    setTimeout(() => setCopied(false), 2000);
  }, [prompt, addToCopyHistory]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={handleBackdropClick}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
      data-ocid="prompt.dialog"
    >
      {/* Modal panel */}
      <dialog
        open
        aria-label={`Prompt: ${prompt.title}`}
        className="relative w-full mx-4 rounded-2xl overflow-hidden m-0 border-0 p-0 bg-transparent max-w-none"
        style={{
          maxWidth: "480px",
          maxHeight: "90dvh",
          overflowY: "auto",
          background: "oklch(0.1 0.01 265 / 0.98)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid oklch(0.28 0.02 265 / 0.35)",
          boxShadow:
            "0 0 60px oklch(0.75 0.28 280 / 0.22), 0 30px 80px rgba(0,0,0,0.85)",
          animation: "scale-pop 0.32s cubic-bezier(0.34,1.56,0.64,1) both",
        }}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          className="absolute top-3 right-3 z-20 btn-icon-neon"
          onClick={onClose}
          aria-label="Close"
          data-ocid="prompt.close_button"
        >
          <X size={16} />
        </button>

        {/* Image */}
        <div
          className="relative w-full bg-black/30"
          style={{ minHeight: "200px" }}
        >
          {/* Skeleton */}
          {!imgLoaded && (
            <div
              className="absolute inset-0 animate-pulse"
              style={{ background: "oklch(0.14 0.01 265 / 0.8)" }}
              aria-hidden
            />
          )}
          <img
            src={imgSrc}
            alt={prompt.title}
            onError={handleImgError}
            onLoad={() => setImgLoaded(true)}
            loading="eager"
            className={`w-full object-cover transition-opacity duration-300 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ maxHeight: "320px", display: "block" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-6 space-y-4">
          {/* Title */}
          <h2 className="font-display text-base font-bold text-foreground leading-snug pr-8">
            {prompt.title}
          </h2>

          {/* Prompt text box */}
          <div
            className="rounded-xl p-3 max-h-44 overflow-y-auto"
            style={{
              background: "oklch(0.14 0.01 265 / 0.5)",
              border: "1px solid oklch(0.25 0.02 265 / 0.3)",
            }}
          >
            <p className="text-sm text-muted-foreground leading-relaxed font-body select-all">
              {prompt.prompt_text}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {/* Copy button */}
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-semibold text-sm transition-smooth"
              style={{
                background: copied
                  ? "oklch(0.55 0.2 142 / 0.3)"
                  : "oklch(0.72 0.26 264)",
                color: copied ? "oklch(0.85 0.2 142)" : "oklch(0.06 0 0)",
                boxShadow: copied
                  ? "0 0 20px oklch(0.55 0.2 142 / 0.4)"
                  : "0 0 28px oklch(0.72 0.26 264 / 0.55)",
              }}
              onClick={handleCopy}
              data-ocid="prompt.confirm_button"
              aria-label="Copy prompt to clipboard"
            >
              {copied ? <Check size={16} /> : <Clipboard size={16} />}
              {copied ? "Copied!" : "Copy Prompt"}
            </button>

            {/* Favorite button */}
            <button
              type="button"
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-smooth"
              style={{
                background: isFav
                  ? "oklch(0.55 0.28 25 / 0.25)"
                  : "oklch(0.14 0.01 265 / 0.5)",
                border: isFav
                  ? "1.5px solid oklch(0.65 0.28 25 / 0.7)"
                  : "1px solid oklch(0.28 0.02 265 / 0.3)",
                boxShadow: isFav
                  ? "0 0 16px oklch(0.65 0.28 25 / 0.3)"
                  : "none",
              }}
              onClick={() => toggleFavorite(prompt.id)}
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              data-ocid="prompt.favorite_button"
            >
              <Heart
                size={18}
                className={
                  isFav
                    ? "fill-rose-500 text-rose-500"
                    : "text-muted-foreground"
                }
              />
            </button>
          </div>
        </div>
      </dialog>
    </div>,
    document.body,
  );
}
