import { FilterTabs } from "@/components/FilterTabs";
import { PromptCard } from "@/components/PromptCard";
import { SearchBar } from "@/components/SearchBar";
import { usePromptStore } from "@/store/usePromptStore";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

export default function HomePage() {
  const { prompts, isLoading, activeFilter, searchQuery, fetchPrompts } =
    usePromptStore(
      useShallow((s) => ({
        prompts: s.prompts,
        isLoading: s.isLoading,
        activeFilter: s.activeFilter,
        searchQuery: s.searchQuery,
        fetchPrompts: s.fetchPrompts,
      })),
    );

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  const filteredPrompts = useMemo(() => {
    let result = prompts;
    if (activeFilter !== "all") {
      result = result.filter((p) => p.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.prompt_text.toLowerCase().includes(q),
      );
    }
    return result;
  }, [prompts, activeFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-background" data-ocid="home.page">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30 px-4 pt-4 pb-3 space-y-3">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold gradient-text-purple tracking-tight">
            PromptVault
          </span>
          <span className="text-xs text-muted-foreground font-body opacity-70">
            AI Prompt Gallery
          </span>
        </div>

        {/* Search */}
        <SearchBar />

        {/* Filter tabs */}
        <FilterTabs />
      </div>

      {/* Masonry grid */}
      <main className="px-3 pt-4 pb-24" data-ocid="home.list">
        {isLoading ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="home.loading_state"
          >
            <div
              className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mb-4"
              style={{
                borderColor: "oklch(0.72 0.26 264 / 0.6)",
                borderTopColor: "transparent",
              }}
            />
            <p className="text-sm text-muted-foreground">Loading prompts…</p>
          </div>
        ) : filteredPrompts.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            data-ocid="home.empty_state"
          >
            <span className="text-5xl mb-4">✨</span>
            <p className="font-display text-lg font-semibold text-foreground mb-1">
              No prompts yet
            </p>
            <p className="text-sm text-muted-foreground">
              Add your first prompt from the Admin panel
            </p>
          </div>
        ) : (
          <div className="columns-2 gap-3 sm:columns-2 md:columns-3 lg:columns-4">
            {filteredPrompts.map((prompt, index) => (
              <PromptCard key={prompt.id} prompt={prompt} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
