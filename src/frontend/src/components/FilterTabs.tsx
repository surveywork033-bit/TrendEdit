import { usePromptStore } from "@/store/usePromptStore";
import type { CategoryFilter } from "@/types/prompt";

const TABS: { label: string; value: CategoryFilter }[] = [
  { label: "All", value: "all" },
  { label: "Trending 🔥", value: "trending" },
  { label: "Popular ✨", value: "popular" },
  { label: "New 🆕", value: "new" },
];

export function FilterTabs() {
  const activeFilter = usePromptStore((s) => s.activeFilter);
  const setFilter = usePromptStore((s) => s.setFilter);

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-0.5"
      data-ocid="home.filter.tab"
      role="tablist"
      aria-label="Filter prompts"
      style={{ scrollbarWidth: "none" }}
    >
      {TABS.map((tab) => (
        <button
          type="button"
          key={tab.value}
          role="tab"
          aria-selected={activeFilter === tab.value}
          onClick={() => setFilter(tab.value)}
          className={`shrink-0 px-4 py-1.5 text-sm font-body font-medium rounded-full transition-smooth border ${
            activeFilter === tab.value
              ? "border-cyan-400/60 text-cyan-300 tab-active"
              : "border-border/40 text-muted-foreground tab-inactive hover:border-border/70"
          }`}
          style={
            activeFilter === tab.value
              ? {
                  background: "oklch(0.72 0.26 264 / 0.15)",
                  boxShadow: "0 0 16px oklch(0.72 0.26 264 / 0.3)",
                }
              : { background: "oklch(0.12 0.01 265 / 0.4)" }
          }
          data-ocid={`filter.${tab.value}.tab`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
