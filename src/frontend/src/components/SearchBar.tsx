import { usePromptStore } from "@/store/usePromptStore";
import { Search, X } from "lucide-react";
import { useRef } from "react";

export function SearchBar() {
  const searchQuery = usePromptStore((s) => s.searchQuery);
  const setSearch = usePromptStore((s) => s.setSearch);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className="relative flex items-center w-full"
      data-ocid="home.search_input"
    >
      <Search
        size={15}
        className="absolute left-3.5 text-muted-foreground pointer-events-none"
      />
      <input
        ref={inputRef}
        type="search"
        value={searchQuery}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search prompts, styles, tags…"
        className="input-glass w-full rounded-xl pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 font-body"
        aria-label="Search prompts"
      />
      {searchQuery && (
        <button
          type="button"
          className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => {
            setSearch("");
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          data-ocid="search.clear_button"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
