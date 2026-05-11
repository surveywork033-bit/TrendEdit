import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, U as User } from "./index-CuhmJBMl.js";
import { u as usePromptStore, X } from "./usePromptStore-DNjD1d6F.js";
import { H as Heart } from "./heart-rwtlwDEq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
function formatRelativeTime(timestamp) {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins > 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
  return new Date(timestamp).toLocaleDateString();
}
function ProfilePage() {
  const [activeTab, setActiveTab] = reactExports.useState("history");
  const { prompts, favorites, copyHistory, toggleFavorite } = usePromptStore();
  const favoritePrompts = prompts.filter((p) => favorites.includes(p.id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background pb-24", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "sticky top-0 z-10",
        style: {
          background: "oklch(0.07 0.01 265 / 0.9)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "relative flex h-14 w-14 items-center justify-center rounded-2xl flex-shrink-0",
                style: {
                  background: "oklch(0.18 0.04 265 / 0.8)",
                  border: "1.5px solid oklch(0.75 0.28 280 / 0.5)",
                  boxShadow: "0 0 20px oklch(0.75 0.28 280 / 0.25)"
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  User,
                  {
                    size: 28,
                    className: "text-primary",
                    style: {
                      filter: "drop-shadow(0 0 8px oklch(0.75 0.28 280 / 0.6))"
                    }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-display font-bold text-foreground tracking-tight", children: "My Profile" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm", style: { color: "oklch(0.56 0.01 260)" }, children: [
                favorites.length,
                " favorite",
                favorites.length !== 1 ? "s" : "",
                " ",
                "· ",
                copyHistory.length,
                " copied"
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex border-b",
              style: { borderColor: "oklch(0.18 0.01 265 / 0.5)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "profile.history_tab",
                    onClick: () => setActiveTab("history"),
                    className: `flex-1 py-3 text-sm font-semibold tracking-wide transition-smooth ${activeTab === "history" ? "tab-active" : "tab-inactive"}`,
                    children: "📋 History"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "profile.favorites_tab",
                    onClick: () => setActiveTab("favorites"),
                    className: `flex-1 py-3 text-sm font-semibold tracking-wide transition-smooth ${activeTab === "favorites" ? "tab-active" : "tab-inactive"}`,
                    children: "❤️ Favorites"
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-4", children: [
      activeTab === "history" && /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryTab, { history: copyHistory }),
      activeTab === "favorites" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        FavoritesTab,
        {
          prompts: favoritePrompts,
          onUnfavorite: toggleFavorite
        }
      )
    ] })
  ] });
}
function HistoryTab({ history }) {
  if (history.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "profile.history_empty_state",
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl",
              style: {
                background: "oklch(0.12 0.01 265 / 0.5)",
                border: "1px solid oklch(0.28 0.02 265 / 0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 28, style: { color: "oklch(0.56 0.01 260)" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No copied prompts yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.46 0.01 260)" }, children: "Start browsing and copy a prompt!" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "profile.history_list", className: "flex flex-col gap-2", children: history.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `profile.history_item.${i + 1}`,
      className: "glass-card flex items-center gap-3 px-3 py-3",
      style: {
        animation: "scale-pop 0.25s ease forwards",
        animationDelay: `${i * 0.04}s`,
        opacity: 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: entry.image_url || "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=60",
            alt: entry.title,
            className: "h-full w-full object-cover",
            loading: "lazy",
            onError: (e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=60";
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: entry.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs mt-0.5 line-clamp-1 font-body",
              style: { color: "oklch(0.46 0.01 260)" },
              children: entry.prompt_text
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-[10px] mt-0.5",
              style: { color: "oklch(0.40 0.01 260)" },
              children: formatRelativeTime(entry.timestamp)
            }
          )
        ] })
      ]
    },
    `${entry.id}-${entry.timestamp}`
  )) });
}
function FavoritesTab({
  prompts,
  onUnfavorite
}) {
  if (prompts.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "profile.favorites_empty_state",
        className: "flex flex-col items-center justify-center py-20 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl",
              style: {
                background: "oklch(0.12 0.01 265 / 0.5)",
                border: "1px solid oklch(0.28 0.02 265 / 0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { size: 28, style: { color: "oklch(0.56 0.01 260)" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No favorites yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", style: { color: "oklch(0.46 0.01 260)" }, children: "Tap the heart on any prompt to save it here!" })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "profile.favorites_list", className: "flex flex-col gap-2", children: prompts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `profile.favorites_item.${i + 1}`,
      className: "glass-card flex items-center gap-3 px-3 py-3",
      style: {
        animation: "scale-pop 0.25s ease forwards",
        animationDelay: `${i * 0.04}s`,
        opacity: 0
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: p.image_url,
            alt: p.title,
            className: "h-full w-full object-cover",
            onError: (e) => {
              e.currentTarget.src = "/assets/images/placeholder.svg";
            }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-foreground", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "inline-block mt-0.5 text-xs px-2 py-0.5 rounded-full",
              style: {
                background: "oklch(0.75 0.28 280 / 0.15)",
                color: "oklch(0.85 0.26 280)",
                border: "1px solid oklch(0.75 0.28 280 / 0.35)"
              },
              children: p.category
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": `profile.unfavorite_button.${i + 1}`,
            "aria-label": `Remove ${p.title} from favorites`,
            onClick: () => onUnfavorite(p.id),
            className: "flex-shrink-0 transition-smooth",
            style: {
              width: "2rem",
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "0.5rem",
              background: "oklch(0.55 0.28 25 / 0.15)",
              border: "1px solid oklch(0.55 0.28 25 / 0.4)",
              color: "oklch(0.72 0.25 25)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
          }
        )
      ]
    },
    p.id
  )) });
}
export {
  ProfilePage as default
};
