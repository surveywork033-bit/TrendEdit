import type { FilterTab } from "@/types/template";
import { motion } from "motion/react";

const TABS: { id: FilterTab; label: string; emoji: string }[] = [
  { id: "all", label: "All", emoji: "" },
  { id: "trending", label: "Trending", emoji: "🔥" },
  { id: "popular", label: "Popular", emoji: "✨" },
  { id: "new", label: "New", emoji: "🆕" },
];

interface FilterTabsProps {
  active: FilterTab;
  onChange: (tab: FilterTab) => void;
}

export function FilterTabs({ active, onChange }: FilterTabsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
      className="flex items-center gap-1 sm:gap-2"
      role="tablist"
      aria-label="Filter templates"
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className="relative px-4 py-2 rounded-xl text-sm font-medium font-display transition-smooth focus-visible:outline-none focus-visible:ring-2"
            style={{
              color: isActive ? "oklch(0.72 0.27 200)" : "oklch(0.60 0.01 260)",
              background: isActive
                ? "oklch(0.72 0.27 200 / 0.1)"
                : "transparent",
              border: `1px solid ${isActive ? "oklch(0.72 0.27 200 / 0.35)" : "oklch(0.30 0.01 265 / 0.3)"}`,
              boxShadow: isActive
                ? "0 0 14px oklch(0.72 0.27 200 / 0.2)"
                : "none",
            }}
            data-ocid={`filter.tab.${tab.id}`}
          >
            {tab.emoji && <span className="mr-1">{tab.emoji}</span>}
            {tab.label}
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full"
                style={{ background: "oklch(0.72 0.27 200)" }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </motion.div>
  );
}
