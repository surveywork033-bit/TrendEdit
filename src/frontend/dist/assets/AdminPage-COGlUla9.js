import { c as createLucideIcon, b as useRouter, r as reactExports, j as jsxRuntimeExports, u as ue } from "./index-CuhmJBMl.js";
import { u as usePromptStore, X } from "./usePromptStore-DNjD1d6F.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
const emptyForm = {
  title: "",
  image_url: "",
  prompt_text: "",
  category: "trending"
};
const FALLBACK_IMG = "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=60";
function AdminImagePreview({ url }) {
  const [src, setSrc] = reactExports.useState(url);
  const [errored, setErrored] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setSrc(url || FALLBACK_IMG);
    setErrored(false);
  }, [url]);
  if (!url) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "mt-2 w-full rounded-xl overflow-hidden relative",
      style: {
        background: "oklch(0.08 0.01 265 / 0.5)",
        border: "1px solid oklch(0.22 0.01 265 / 0.3)"
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src,
            alt: "Preview",
            loading: "lazy",
            onError: () => {
              if (!errored) {
                setErrored(true);
                setSrc(FALLBACK_IMG);
              }
            },
            className: "w-full h-auto max-h-48 object-contain block"
          }
        ),
        errored && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-center text-xs py-2",
            style: { color: "oklch(0.70 0.22 25)" },
            children: "⚠️ Image failed to load — URL may be invalid"
          }
        )
      ]
    }
  );
}
function AdminPage() {
  const router = useRouter();
  const { prompts, addPrompt, updatePrompt, deletePrompt, fetchPrompts } = usePromptStore();
  reactExports.useEffect(() => {
    if (!localStorage.getItem("promptvault_admin")) {
      router.navigate({ to: "/admin-login" });
    } else {
      fetchPrompts();
    }
  }, [router, fetchPrompts]);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [editingId, setEditingId] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = reactExports.useState(null);
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const handleLogout = () => {
    localStorage.removeItem("promptvault_admin");
    router.navigate({ to: "/" });
  };
  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };
  const openEdit = (p) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      image_url: p.image_url,
      prompt_text: p.prompt_text,
      category: p.category
    });
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };
  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await updatePrompt(editingId, form);
        ue.success("Prompt updated successfully!");
      } else {
        await addPrompt(form);
        ue.success("Prompt added successfully!");
      }
      closeForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      ue.error(msg);
    } finally {
      setIsSaving(false);
    }
  };
  const handleDelete = async (id) => {
    setIsDeleting(true);
    try {
      await deletePrompt(id);
      ue.success("Prompt deleted.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      ue.error(msg);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen pb-8",
      style: { background: "oklch(0.06 0 0)" },
      "data-ocid": "admin.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "sticky top-0 z-30 flex items-center justify-between px-4 py-4 border-b",
            style: {
              background: "oklch(0.09 0.01 265 / 0.95)",
              backdropFilter: "blur(20px)",
              borderColor: "oklch(0.22 0.01 265 / 0.4)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base font-bold gradient-text-purple", children: "Admin Dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: "text-[10px] font-bold px-2 py-0.5 rounded-full",
                    style: {
                      background: "oklch(0.72 0.26 264 / 0.2)",
                      color: "oklch(0.82 0.24 264)",
                      border: "1px solid oklch(0.72 0.26 264 / 0.35)"
                    },
                    children: [
                      prompts.length,
                      " prompts"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: openAdd,
                    className: "flex items-center gap-1.5 px-3 py-2 rounded-xl font-display font-semibold text-xs",
                    style: {
                      background: "oklch(0.72 0.26 264)",
                      color: "oklch(0.06 0 0)",
                      boxShadow: "0 0 16px oklch(0.72 0.26 264 / 0.4)"
                    },
                    "data-ocid": "admin.primary_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
                      "Add Prompt"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleLogout,
                    className: "btn-icon-neon",
                    "aria-label": "Logout",
                    "data-ocid": "admin.secondary_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 14 })
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-4 space-y-3", "data-ocid": "admin.list", children: prompts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-3 items-start rounded-xl p-3",
            style: {
              background: "oklch(0.1 0.01 265 / 0.5)",
              border: "1px solid oklch(0.2 0.01 265 / 0.3)"
            },
            "data-ocid": `admin.item.${i + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: p.image_url,
                  alt: p.title,
                  className: "w-16 h-16 rounded-lg object-cover shrink-0",
                  onError: (e) => {
                    e.target.src = "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&q=60";
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-sm font-semibold text-foreground truncate", children: p.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full",
                    style: {
                      background: p.category === "trending" ? "oklch(0.72 0.26 264 / 0.2)" : p.category === "popular" ? "oklch(0.75 0.28 280 / 0.2)" : "oklch(0.55 0.2 142 / 0.2)",
                      color: p.category === "trending" ? "oklch(0.82 0.24 264)" : p.category === "popular" ? "oklch(0.85 0.26 280)" : "oklch(0.78 0.2 142)"
                    },
                    children: p.category
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2 font-body", children: p.prompt_text })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-icon-neon w-8 h-8",
                    onClick: () => openEdit(p),
                    "aria-label": "Edit",
                    "data-ocid": `admin.edit_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { size: 12 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "btn-icon-neon w-8 h-8",
                    onClick: () => setConfirmDelete(p.id),
                    "aria-label": "Delete",
                    style: { color: "oklch(0.70 0.22 25)" },
                    "data-ocid": `admin.delete_button.${i + 1}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 })
                  }
                )
              ] })
            ]
          },
          p.id
        )) }),
        showForm && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            style: { background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" },
            "data-ocid": "admin.dialog",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-full max-w-lg rounded-2xl p-6 space-y-4",
                style: {
                  background: "oklch(0.1 0.01 265 / 0.98)",
                  border: "1px solid oklch(0.28 0.02 265 / 0.4)",
                  boxShadow: "0 0 50px oklch(0.75 0.28 280 / 0.2)",
                  maxHeight: "90vh",
                  overflowY: "auto"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-bold text-foreground", children: editingId ? "Edit Prompt" : "Add New Prompt" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "btn-icon-neon w-8 h-8",
                        onClick: closeForm,
                        "aria-label": "Close",
                        "data-ocid": "admin.close_button",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "f-title",
                          className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                          children: "Title"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "f-title",
                          type: "text",
                          value: form.title,
                          onChange: (e) => setForm((f) => ({ ...f, title: e.target.value })),
                          className: "input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40",
                          placeholder: "Cinematic Dragon at Dawn",
                          required: true,
                          "data-ocid": "admin.title_input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "f-image",
                          className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                          children: "Image URL"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "f-image",
                          type: "url",
                          value: form.image_url,
                          onChange: (e) => setForm((f) => ({ ...f, image_url: e.target.value })),
                          className: "input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40",
                          placeholder: "https://i.ibb.co/... or https://i.postimg.cc/...",
                          "data-ocid": "admin.image_input"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(AdminImagePreview, { url: form.image_url })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "f-prompt",
                          className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                          children: "Full Prompt"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "textarea",
                        {
                          id: "f-prompt",
                          value: form.prompt_text,
                          onChange: (e) => setForm((f) => ({ ...f, prompt_text: e.target.value })),
                          rows: 4,
                          className: "input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none",
                          placeholder: "Detailed AI image generation prompt...",
                          required: true,
                          "data-ocid": "admin.prompt_textarea"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "f-category",
                          className: "block text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                          children: "Category"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "f-category",
                          value: form.category,
                          onChange: (e) => setForm((f) => ({
                            ...f,
                            category: e.target.value
                          })),
                          className: "input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground",
                          "data-ocid": "admin.category_select",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "trending", children: "🔥 Trending" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "popular", children: "✨ Popular" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "new", children: "🆕 New" })
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "submit",
                          className: "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-display font-semibold text-sm",
                          style: {
                            background: "oklch(0.72 0.26 264)",
                            color: "oklch(0.06 0 0)",
                            boxShadow: "0 0 20px oklch(0.72 0.26 264 / 0.45)"
                          },
                          "data-ocid": "admin.save_button",
                          children: [
                            isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 14, className: "animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { size: 14 }),
                            isSaving ? "Saving…" : editingId ? "Save Changes" : "Add Prompt"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "btn-neon px-4 rounded-xl",
                          onClick: closeForm,
                          "data-ocid": "admin.cancel_button",
                          children: "Cancel"
                        }
                      )
                    ] })
                  ] })
                ]
              }
            )
          }
        ),
        confirmDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "fixed inset-0 z-50 flex items-center justify-center p-4",
            style: {
              background: "rgba(0,0,0,0.85)",
              backdropFilter: "blur(8px)"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "w-full max-w-xs rounded-2xl p-6 text-center space-y-4",
                style: {
                  background: "oklch(0.1 0.01 265 / 0.98)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                  boxShadow: "0 0 40px oklch(0.55 0.22 25 / 0.2)"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl", children: "🗑️" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground", children: "Delete this prompt?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "This action cannot be undone." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "flex-1 py-2.5 rounded-xl font-display font-semibold text-xs",
                        style: {
                          background: "oklch(0.55 0.22 25 / 0.25)",
                          color: "oklch(0.78 0.22 25)",
                          border: "1px solid oklch(0.55 0.22 25 / 0.4)"
                        },
                        onClick: () => handleDelete(confirmDelete),
                        disabled: isDeleting,
                        "data-ocid": "admin.confirm_button",
                        children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 12, className: "animate-spin mx-auto" }) : "Delete"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "flex-1 btn-neon py-2.5 rounded-xl text-xs",
                        onClick: () => setConfirmDelete(null),
                        "data-ocid": "admin.cancel_button",
                        children: "Cancel"
                      }
                    )
                  ] })
                ]
              }
            )
          }
        )
      ]
    }
  );
}
export {
  AdminPage as default
};
