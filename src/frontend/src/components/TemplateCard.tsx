import type { Template } from "@/types/template";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

interface TemplateCardProps {
  template: Template;
  onClick: (template: Template) => void;
  index?: number;
}

const BADGE_STYLES: Record<
  Template["category"],
  { label: string; className: string }
> = {
  trending: { label: "Trending 🔥", className: "badge-trending" },
  popular: { label: "Popular ✨", className: "badge-popular" },
  new: { label: "New 🆕", className: "badge-new" },
};

export function TemplateCard({
  template,
  onClick,
  index = 0,
}: TemplateCardProps) {
  const [hovered, setHovered] = useState(false);
  const badge = BADGE_STYLES[template.category];

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ scale: 1.025, y: -4 }}
      onClick={() => onClick(template)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        background: "oklch(0.14 0.015 265 / 0.7)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid oklch(0.30 0.02 265 / 0.35)",
        boxShadow: hovered
          ? "0 8px 40px oklch(0.07 0.01 261 / 0.7), 0 0 20px oklch(0.72 0.27 200 / 0.12)"
          : "0 2px 16px oklch(0.07 0.01 261 / 0.4)",
        transition: "box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      data-ocid={`template.card.${index + 1}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={template.image_url}
          alt={template.title}
          className="w-full h-full object-cover transition-smooth"
          style={{ transform: hovered ? "scale(1.08)" : "scale(1)" }}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://picsum.photos/400/300?grayscale";
            e.currentTarget.onerror = null;
          }}
        />

        {/* Hover overlay with prompt */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-end p-3"
              style={{
                background:
                  "linear-gradient(to top, oklch(0.07 0.01 261 / 0.92) 0%, oklch(0.07 0.01 261 / 0.4) 50%, transparent 100%)",
              }}
            >
              <p
                className="text-xs leading-snug line-clamp-3"
                style={{ color: "oklch(0.85 0.02 240)" }}
              >
                {template.prompt_text}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category badge */}
        <div className="absolute top-2.5 left-2.5">
          <span className={badge.className}>{badge.label}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 flex items-center justify-between">
        <h3
          className="font-display font-semibold text-sm truncate"
          style={{ color: "oklch(0.92 0.02 240)" }}
        >
          {template.title}
        </h3>
        <span
          className="text-xs font-medium ml-2 shrink-0"
          style={{ color: "oklch(0.68 0.28 264)" }}
        >
          Use This &rarr;
        </span>
      </div>
    </motion.article>
  );
}
