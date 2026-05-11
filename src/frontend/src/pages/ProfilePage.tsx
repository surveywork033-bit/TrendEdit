import { usePromptStore } from "@/store/usePromptStore";
import type { Prompt } from "@/types/prompt";
import { Clock, Heart, User, X } from "lucide-react";
import { useState } from "react";

type Tab = "history" | "favorites";

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(timestamp).toLocaleDateString();
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("history");
  const { prompts, favorites, copyHistory, toggleFavorite } = usePromptStore();

  const favoritePrompts = prompts.filter((p) => favorites.includes(p.id));

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div
        className="sticky top-0 z-10"
        style={{
          background: "oklch(0.07 0.01 265 / 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <div
              className="relative flex h-14 w-14 items-center justify-center rounded-2xl flex-shrink-0"
              style={{
                background: "oklch(0.18 0.04 265 / 0.8)",
                border: "1.5px solid oklch(0.75 0.28 280 / 0.5)",
                boxShadow: "0 0 20px oklch(0.75 0.28 280 / 0.25)",
              }}
            >
              <User
                size={28}
                className="text-primary"
                style={{
                  filter: "drop-shadow(0 0 8px oklch(0.75 0.28 280 / 0.6))",
                }}
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-display font-bold text-foreground tracking-tight">
                My Profile
              </h1>
              <p className="text-sm" style={{ color: "oklch(0.56 0.01 260)" }}>
                {favorites.length} favorite{favorites.length !== 1 ? "s" : ""}{" "}
                &middot; {copyHistory.length} copied
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex border-b"
          style={{ borderColor: "oklch(0.18 0.01 265 / 0.5)" }}
        >
          <button
            type="button"
            data-ocid="profile.history_tab"
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-smooth ${
              activeTab === "history" ? "tab-active" : "tab-inactive"
            }`}
          >
            &#128203; History
          </button>
          <button
            type="button"
            data-ocid="profile.favorites_tab"
            onClick={() => setActiveTab("favorites")}
            className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-smooth ${
              activeTab === "favorites" ? "tab-active" : "tab-inactive"
            }`}
          >
            &#10084;&#65039; Favorites
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-4">
        {activeTab === "history" && <HistoryTab history={copyHistory} />}
        {activeTab === "favorites" && (
          <FavoritesTab
            prompts={favoritePrompts}
            onUnfavorite={toggleFavorite}
          />
        )}
      </div>
    </div>
  );
}

/* History Tab */

interface HistoryEntry {
  id: string;
  title: string;
  image_url: string;
  prompt_text: string;
  timestamp: number;
}

function HistoryTab({ history }: { history: HistoryEntry[] }) {
  if (history.length === 0) {
    return (
      <div
        data-ocid="profile.history_empty_state"
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: "oklch(0.12 0.01 265 / 0.5)",
            border: "1px solid oklch(0.28 0.02 265 / 0.3)",
          }}
        >
          <Clock size={28} style={{ color: "oklch(0.56 0.01 260)" }} />
        </div>
        <p className="font-display font-semibold text-foreground mb-1">
          No copied prompts yet
        </p>
        <p className="text-sm" style={{ color: "oklch(0.46 0.01 260)" }}>
          Start browsing and copy a prompt!
        </p>
      </div>
    );
  }

  return (
    <div data-ocid="profile.history_list" className="flex flex-col gap-2">
      {history.map((entry, i) => (
        <div
          key={`${entry.id}-${entry.timestamp}`}
          data-ocid={`profile.history_item.${i + 1}`}
          className="glass-card flex items-center gap-3 px-3 py-3"
          style={{
            animation: "scale-pop 0.25s ease forwards",
            animationDelay: `${i * 0.04}s`,
            opacity: 0,
          }}
        >
          {/* Thumbnail */}
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
            <img
              src={
                entry.image_url ||
                "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=60"
              }
              alt={entry.title}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=60";
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {entry.title}
            </p>
            <p
              className="text-xs mt-0.5 line-clamp-1 font-body"
              style={{ color: "oklch(0.46 0.01 260)" }}
            >
              {entry.prompt_text}
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: "oklch(0.40 0.01 260)" }}
            >
              {formatRelativeTime(entry.timestamp)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* Favorites Tab */

function FavoritesTab({
  prompts,
  onUnfavorite,
}: {
  prompts: Prompt[];
  onUnfavorite: (id: string) => void;
}) {
  if (prompts.length === 0) {
    return (
      <div
        data-ocid="profile.favorites_empty_state"
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{
            background: "oklch(0.12 0.01 265 / 0.5)",
            border: "1px solid oklch(0.28 0.02 265 / 0.3)",
          }}
        >
          <Heart size={28} style={{ color: "oklch(0.56 0.01 260)" }} />
        </div>
        <p className="font-display font-semibold text-foreground mb-1">
          No favorites yet
        </p>
        <p className="text-sm" style={{ color: "oklch(0.46 0.01 260)" }}>
          Tap the heart on any prompt to save it here!
        </p>
      </div>
    );
  }

  return (
    <div data-ocid="profile.favorites_list" className="flex flex-col gap-2">
      {prompts.map((p, i) => (
        <div
          key={p.id}
          data-ocid={`profile.favorites_item.${i + 1}`}
          className="glass-card flex items-center gap-3 px-3 py-3"
          style={{
            animation: "scale-pop 0.25s ease forwards",
            animationDelay: `${i * 0.04}s`,
            opacity: 0,
          }}
        >
          {/* Thumbnail */}
          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl">
            <img
              src={p.image_url}
              alt={p.title}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "/assets/images/placeholder.svg";
              }}
            />
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">
              {p.title}
            </p>
            <span
              className="inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full"
              style={{
                background: "oklch(0.75 0.28 280 / 0.15)",
                color: "oklch(0.85 0.26 280)",
                border: "1px solid oklch(0.75 0.28 280 / 0.35)",
              }}
            >
              {p.category}
            </span>
          </div>

          {/* Remove button */}
          <button
            type="button"
            data-ocid={`profile.unfavorite_button.${i + 1}`}
            aria-label={`Remove ${p.title} from favorites`}
            onClick={() => onUnfavorite(p.id)}
            className="flex-shrink-0 transition-smooth"
            style={{
              width: "2rem",
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.5rem",
              background: "oklch(0.55 0.28 25 / 0.15)",
              border: "1px solid oklch(0.55 0.28 25 / 0.4)",
              color: "oklch(0.72 0.25 25)",
            }}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
