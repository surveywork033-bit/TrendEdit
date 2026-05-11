import { c as createLucideIcon, j as jsxRuntimeExports, r as reactExports, u as ue, a as reactDomExports, R as React } from "./index-CuhmJBMl.js";
import { u as usePromptStore, X } from "./usePromptStore-DNjD1d6F.js";
import { H as Heart } from "./heart-rwtlwDEq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ]
];
const Clipboard = createLucideIcon("clipboard", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
const TABS = [
  { label: "All", value: "all" },
  { label: "Trending 🔥", value: "trending" },
  { label: "Popular ✨", value: "popular" },
  { label: "New 🆕", value: "new" }
];
function FilterTabs() {
  const activeFilter = usePromptStore((s) => s.activeFilter);
  const setFilter = usePromptStore((s) => s.setFilter);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex gap-2 overflow-x-auto pb-0.5",
      "data-ocid": "home.filter.tab",
      role: "tablist",
      "aria-label": "Filter prompts",
      style: { scrollbarWidth: "none" },
      children: TABS.map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          role: "tab",
          "aria-selected": activeFilter === tab.value,
          onClick: () => setFilter(tab.value),
          className: `shrink-0 px-4 py-1.5 text-sm font-body font-medium rounded-full transition-smooth border ${activeFilter === tab.value ? "border-cyan-400/60 text-cyan-300 tab-active" : "border-border/40 text-muted-foreground tab-inactive hover:border-border/70"}`,
          style: activeFilter === tab.value ? {
            background: "oklch(0.72 0.26 264 / 0.15)",
            boxShadow: "0 0 16px oklch(0.72 0.26 264 / 0.3)"
          } : { background: "oklch(0.12 0.01 265 / 0.4)" },
          "data-ocid": `filter.${tab.value}.tab`,
          children: tab.label
        },
        tab.value
      ))
    }
  );
}
const FALLBACK_IMAGE$1 = "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&q=80";
function PromptModal({ prompt, onClose }) {
  const [copied, setCopied] = reactExports.useState(false);
  const [imgSrc, setImgSrc] = reactExports.useState(prompt.image_url || FALLBACK_IMAGE$1);
  const [imgLoaded, setImgLoaded] = reactExports.useState(false);
  const [imgErrored, setImgErrored] = reactExports.useState(false);
  const closeRef = reactExports.useRef(null);
  const { favorites, toggleFavorite, addToCopyHistory } = usePromptStore();
  const isFav = favorites.includes(prompt.id);
  reactExports.useEffect(() => {
    var _a;
    (_a = closeRef.current) == null ? void 0 : _a.focus();
  }, []);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);
  reactExports.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);
  const handleImgError = reactExports.useCallback(() => {
    if (!imgErrored) {
      setImgErrored(true);
      setImgSrc(FALLBACK_IMAGE$1);
    }
  }, [imgErrored]);
  const handleCopy = reactExports.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt_text);
    } catch {
    }
    addToCopyHistory(prompt);
    setCopied(true);
    ue.success("Copied to clipboard!", {
      duration: 2500,
      style: {
        background: "oklch(0.12 0.015 265)",
        border: "1px solid oklch(0.55 0.2 142 / 0.5)",
        color: "oklch(0.88 0.18 142)"
      }
    });
    setTimeout(() => setCopied(false), 2e3);
  }, [prompt, addToCopyHistory]);
  const handleBackdropClick = reactExports.useCallback(
    (e) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4",
        style: {
          background: "rgba(0,0,0,0.82)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)"
        },
        onClick: handleBackdropClick,
        onKeyDown: (e) => e.key === "Escape" && onClose(),
        role: "presentation",
        "data-ocid": "prompt.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            open: true,
            "aria-label": `Prompt: ${prompt.title}`,
            className: "relative w-full mx-4 rounded-2xl overflow-hidden m-0 border-0 p-0 bg-transparent max-w-none",
            style: {
              maxWidth: "480px",
              maxHeight: "90dvh",
              overflowY: "auto",
              background: "oklch(0.1 0.01 265 / 0.98)",
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
              border: "1px solid oklch(0.28 0.02 265 / 0.35)",
              boxShadow: "0 0 60px oklch(0.75 0.28 280 / 0.22), 0 30px 80px rgba(0,0,0,0.85)",
              animation: "scale-pop 0.32s cubic-bezier(0.34,1.56,0.64,1) both"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  ref: closeRef,
                  type: "button",
                  className: "absolute top-3 right-3 z-20 btn-icon-neon",
                  onClick: onClose,
                  "aria-label": "Close",
                  "data-ocid": "prompt.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "relative w-full bg-black/30",
                  style: { minHeight: "200px" },
                  children: [
                    !imgLoaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: "absolute inset-0 animate-pulse",
                        style: { background: "oklch(0.14 0.01 265 / 0.8)" },
                        "aria-hidden": true
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: imgSrc,
                        alt: prompt.title,
                        onError: handleImgError,
                        onLoad: () => setImgLoaded(true),
                        loading: "eager",
                        className: `w-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`,
                        style: { maxHeight: "320px", display: "block" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pt-4 pb-6 space-y-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground leading-snug pr-8", children: prompt.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "rounded-xl p-3 max-h-44 overflow-y-auto",
                    style: {
                      background: "oklch(0.14 0.01 265 / 0.5)",
                      border: "1px solid oklch(0.25 0.02 265 / 0.3)"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed font-body select-all", children: prompt.prompt_text })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      className: "flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-display font-semibold text-sm transition-smooth",
                      style: {
                        background: copied ? "oklch(0.55 0.2 142 / 0.3)" : "oklch(0.72 0.26 264)",
                        color: copied ? "oklch(0.85 0.2 142)" : "oklch(0.06 0 0)",
                        boxShadow: copied ? "0 0 20px oklch(0.55 0.2 142 / 0.4)" : "0 0 28px oklch(0.72 0.26 264 / 0.55)"
                      },
                      onClick: handleCopy,
                      "data-ocid": "prompt.confirm_button",
                      "aria-label": "Copy prompt to clipboard",
                      children: [
                        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Clipboard, { size: 16 }),
                        copied ? "Copied!" : "Copy Prompt"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-smooth",
                      style: {
                        background: isFav ? "oklch(0.55 0.28 25 / 0.25)" : "oklch(0.14 0.01 265 / 0.5)",
                        border: isFav ? "1.5px solid oklch(0.65 0.28 25 / 0.7)" : "1px solid oklch(0.28 0.02 265 / 0.3)",
                        boxShadow: isFav ? "0 0 16px oklch(0.65 0.28 25 / 0.3)" : "none"
                      },
                      onClick: () => toggleFavorite(prompt.id),
                      "aria-label": isFav ? "Remove from favorites" : "Add to favorites",
                      "data-ocid": "prompt.favorite_button",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Heart,
                        {
                          size: 18,
                          className: isFav ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
                        }
                      )
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    ),
    document.body
  );
}
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=800&q=80";
const PromptCard = reactExports.memo(function PromptCard2({
  prompt,
  index
}) {
  const [imgSrc, setImgSrc] = reactExports.useState(prompt.image_url || FALLBACK_IMAGE);
  const [loaded, setLoaded] = reactExports.useState(false);
  const [errored, setErrored] = reactExports.useState(false);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const handleError = reactExports.useCallback(() => {
    if (!errored) {
      setErrored(true);
      setImgSrc(FALLBACK_IMAGE);
    }
  }, [errored]);
  const handleOpen = reactExports.useCallback(() => setModalOpen(true), []);
  const handleClose = reactExports.useCallback(() => setModalOpen(false), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        className: "relative overflow-hidden cursor-pointer mb-3 break-inside-avoid w-full block rounded-xl",
        style: {
          animation: "scale-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
          animationDelay: `${Math.min(index * 0.05, 0.5)}s`
        },
        onClick: handleOpen,
        "data-ocid": `prompt.item.${index + 1}`,
        "aria-label": `Open prompt: ${prompt.title}`,
        children: [
          !loaded && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute inset-0 animate-pulse rounded-xl",
              style: {
                background: "oklch(0.14 0.01 265 / 0.8)",
                minHeight: "160px"
              },
              "aria-hidden": true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imgSrc,
              alt: prompt.title,
              loading: "lazy",
              decoding: "async",
              onError: handleError,
              onLoad: () => setLoaded(true),
              className: `w-full h-auto block rounded-xl transition-all duration-300 ${loaded ? "opacity-100" : "opacity-0"} hover:brightness-110 hover:scale-[1.02] transition-transform`
            }
          )
        ]
      }
    ),
    modalOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(PromptModal, { prompt, onClose: handleClose })
  ] });
});
function SearchBar() {
  const searchQuery = usePromptStore((s) => s.searchQuery);
  const setSearch = usePromptStore((s) => s.setSearch);
  const inputRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center w-full",
      "data-ocid": "home.search_input",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Search,
          {
            size: 15,
            className: "absolute left-3.5 text-muted-foreground pointer-events-none"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "search",
            value: searchQuery,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search prompts, styles, tags…",
            className: "input-glass w-full rounded-xl pl-9 pr-9 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 font-body",
            "aria-label": "Search prompts"
          }
        ),
        searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "absolute right-3 text-muted-foreground hover:text-foreground transition-colors",
            onClick: () => {
              var _a;
              setSearch("");
              (_a = inputRef.current) == null ? void 0 : _a.focus();
            },
            "aria-label": "Clear search",
            "data-ocid": "search.clear_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 15 })
          }
        )
      ]
    }
  );
}
const isIterable = (obj) => Symbol.iterator in obj;
const hasIterableEntries = (value) => (
  // HACK: avoid checking entries type
  "entries" in value
);
const compareEntries = (valueA, valueB) => {
  const mapA = valueA instanceof Map ? valueA : new Map(valueA.entries());
  const mapB = valueB instanceof Map ? valueB : new Map(valueB.entries());
  if (mapA.size !== mapB.size) {
    return false;
  }
  for (const [key, value] of mapA) {
    if (!mapB.has(key) || !Object.is(value, mapB.get(key))) {
      return false;
    }
  }
  return true;
};
const compareIterables = (valueA, valueB) => {
  const iteratorA = valueA[Symbol.iterator]();
  const iteratorB = valueB[Symbol.iterator]();
  let nextA = iteratorA.next();
  let nextB = iteratorB.next();
  while (!nextA.done && !nextB.done) {
    if (!Object.is(nextA.value, nextB.value)) {
      return false;
    }
    nextA = iteratorA.next();
    nextB = iteratorB.next();
  }
  return !!nextA.done && !!nextB.done;
};
function shallow(valueA, valueB) {
  if (Object.is(valueA, valueB)) {
    return true;
  }
  if (typeof valueA !== "object" || valueA === null || typeof valueB !== "object" || valueB === null) {
    return false;
  }
  if (Object.getPrototypeOf(valueA) !== Object.getPrototypeOf(valueB)) {
    return false;
  }
  if (isIterable(valueA) && isIterable(valueB)) {
    if (hasIterableEntries(valueA) && hasIterableEntries(valueB)) {
      return compareEntries(valueA, valueB);
    }
    return compareIterables(valueA, valueB);
  }
  return compareEntries(
    { entries: () => Object.entries(valueA) },
    { entries: () => Object.entries(valueB) }
  );
}
function useShallow(selector) {
  const prev = React.useRef(void 0);
  return (state) => {
    const next = selector(state);
    return shallow(prev.current, next) ? prev.current : prev.current = next;
  };
}
function HomePage() {
  const { prompts, isLoading, activeFilter, searchQuery, fetchPrompts } = usePromptStore(
    useShallow((s) => ({
      prompts: s.prompts,
      isLoading: s.isLoading,
      activeFilter: s.activeFilter,
      searchQuery: s.searchQuery,
      fetchPrompts: s.fetchPrompts
    }))
  );
  reactExports.useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);
  const filteredPrompts = reactExports.useMemo(() => {
    let result = prompts;
    if (activeFilter !== "all") {
      result = result.filter((p) => p.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.prompt_text.toLowerCase().includes(q)
      );
    }
    return result;
  }, [prompts, activeFilter, searchQuery]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "home.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/30 px-4 pt-4 pb-3 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold gradient-text-purple tracking-tight", children: "PromptVault" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-body opacity-70", children: "AI Prompt Gallery" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SearchBar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FilterTabs, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "px-3 pt-4 pb-24", "data-ocid": "home.list", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "home.loading_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-full border-2 border-t-transparent animate-spin mb-4",
              style: {
                borderColor: "oklch(0.72 0.26 264 / 0.6)",
                borderTopColor: "transparent"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading prompts…" })
        ]
      }
    ) : filteredPrompts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 text-center",
        "data-ocid": "home.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-5xl mb-4", children: "✨" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-lg font-semibold text-foreground mb-1", children: "No prompts yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add your first prompt from the Admin panel" })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "columns-2 gap-3 sm:columns-2 md:columns-3 lg:columns-4", children: filteredPrompts.map((prompt, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(PromptCard, { prompt, index }, prompt.id)) }) })
  ] });
}
export {
  HomePage as default
};
