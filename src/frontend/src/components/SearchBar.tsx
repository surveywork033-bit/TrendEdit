import { Search, X } from "lucide-react";
import { motion } from "motion/react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search templates by name, style, or tags…",
}: SearchBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full"
    >
      <div
        className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
        style={{
          background: "oklch(0.14 0.015 265 / 0.6)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "oklch(0.35 0.04 265 / 0.35)",
          boxShadow:
            "0 0 0 1px oklch(0.72 0.27 200 / 0.08), 0 4px 24px oklch(0.07 0.01 261 / 0.5)",
        }}
      >
        <Search
          className="w-5 h-5 flex-shrink-0"
          style={{ color: "oklch(0.72 0.27 200)" }}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-sm font-body placeholder:text-sm"
          style={{
            color: "oklch(0.92 0.02 240)",
          }}
          data-ocid="search.input"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="flex-shrink-0 p-0.5 rounded-full transition-smooth hover:opacity-70"
            style={{ color: "oklch(0.60 0.01 260)" }}
            aria-label="Clear search"
            data-ocid="search.clear_button"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
