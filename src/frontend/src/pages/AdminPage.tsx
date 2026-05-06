import { TemplateForm } from "@/components/TemplateForm";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useTemplateStore } from "@/store/useTemplateStore";
import type { AdminTemplateForm, Template } from "@/types/template";
import { useNavigate } from "@tanstack/react-router";
import {
  Edit2,
  FolderPlus,
  LogOut,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

type DialogState =
  | { mode: "closed" }
  | { mode: "add" }
  | { mode: "edit"; template: Template }
  | { mode: "confirm_delete"; id: string; title: string };

const CATEGORY_STYLES: Record<
  string,
  { bg: string; color: string; icon: string }
> = {
  trending: {
    bg: "oklch(0.65 0.28 264 / 0.22)",
    color: "oklch(0.80 0.26 264)",
    icon: "\uD83D\uDD25",
  },
  popular: {
    bg: "oklch(0.75 0.28 280 / 0.22)",
    color: "oklch(0.85 0.26 280)",
    icon: "\u2728",
  },
  new: {
    bg: "oklch(0.72 0.27 85 / 0.22)",
    color: "oklch(0.85 0.26 85)",
    icon: "\uD83C\uDD95",
  },
};

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div
      className="rounded-xl px-5 py-4 flex flex-col gap-1 flex-1 min-w-[110px]"
      style={{
        background: "oklch(0.13 0.01 265 / 0.7)",
        border: `1px solid ${accent}40`,
        boxShadow: `0 0 18px ${accent}15`,
      }}
    >
      <span
        className="text-2xl font-bold font-display"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="text-xs" style={{ color: "oklch(0.56 0.01 260)" }}>
        {label}
      </span>
    </div>
  );
}

export default function AdminPage() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const { templates, addTemplate, updateTemplate, deleteTemplate } =
    useTemplateStore();

  const [dialog, setDialog] = useState<DialogState>({ mode: "closed" });
  const [isSaving, setIsSaving] = useState(false);

  const counts = {
    total: templates.length,
    trending: templates.filter((t) => t.category === "trending").length,
    popular: templates.filter((t) => t.category === "popular").length,
    new: templates.filter((t) => t.category === "new").length,
  };

  const handleLogout = () => {
    logout();
    navigate({ to: "/admin-login" });
  };

  const handleSave = async (data: AdminTemplateForm) => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 350));
    if (dialog.mode === "add") {
      addTemplate({
        ...data,
        id: Date.now().toString(),
        tags: data.tags ?? [],
      });
    } else if (dialog.mode === "edit") {
      updateTemplate({
        ...data,
        id: dialog.template.id,
        tags: data.tags ?? [],
      });
    }
    setIsSaving(false);
    setDialog({ mode: "closed" });
  };

  const handleDelete = () => {
    if (dialog.mode !== "confirm_delete") return;
    deleteTemplate(dialog.id);
    setDialog({ mode: "closed" });
  };

  const isDialogOpen = dialog.mode === "add" || dialog.mode === "edit";
  const isConfirmOpen = dialog.mode === "confirm_delete";

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.06 0 0)" }}
      data-ocid="admin.page"
    >
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 0%, oklch(0.68 0.28 264 / 0.06) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
        style={{
          background: "oklch(0.10 0.01 265 / 0.94)",
          borderBottom: "1px solid oklch(0.22 0.01 265 / 0.7)",
          backdropFilter: "blur(16px)",
        }}
        data-ocid="admin.header"
      >
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center w-9 h-9 rounded-xl"
            style={{
              background: "oklch(0.68 0.28 264 / 0.15)",
              border: "1px solid oklch(0.68 0.28 264 / 0.3)",
            }}
          >
            <Sparkles
              className="w-5 h-5"
              style={{ color: "oklch(0.72 0.27 200)" }}
            />
          </div>
          <div>
            <h1
              className="text-lg font-bold font-display leading-none"
              style={{ color: "oklch(0.95 0.01 240)" }}
            >
              Admin Dashboard
            </h1>
            <p
              className="text-xs mt-0.5"
              style={{ color: "oklch(0.50 0.01 260)" }}
            >
              Manage AI templates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            data-ocid="admin.add_template_button"
            onClick={() => setDialog({ mode: "add" })}
            className="flex items-center gap-2 font-semibold"
            style={{
              background: "oklch(0.72 0.27 200)",
              color: "oklch(0.06 0 0)",
            }}
          >
            <FolderPlus className="w-4 h-4" />
            Add Template
          </Button>
          <Button
            type="button"
            variant="outline"
            data-ocid="admin.logout_button"
            onClick={handleLogout}
            className="flex items-center gap-2"
            style={{
              borderColor: "oklch(0.28 0.01 265)",
              color: "oklch(0.60 0.01 260)",
            }}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats row */}
        <section className="flex flex-wrap gap-3 mb-8" data-ocid="admin.stats">
          <StatCard
            label="Total Templates"
            value={counts.total}
            accent="oklch(0.72 0.27 200)"
          />
          <StatCard
            label="Trending \uD83D\uDD25"
            value={counts.trending}
            accent="oklch(0.72 0.27 264)"
          />
          <StatCard
            label="Popular \u2728"
            value={counts.popular}
            accent="oklch(0.78 0.27 280)"
          />
          <StatCard
            label="New \uD83C\uDD95"
            value={counts.new}
            accent="oklch(0.82 0.25 85)"
          />
        </section>

        {/* Template grid */}
        {templates.length === 0 ? (
          <div
            data-ocid="admin.empty_state"
            className="flex flex-col items-center justify-center py-24 rounded-2xl"
            style={{ border: "1.5px dashed oklch(0.26 0.01 265)" }}
          >
            <Zap
              className="w-12 h-12 mb-4"
              style={{ color: "oklch(0.40 0.01 260)" }}
            />
            <p
              className="text-lg font-semibold font-display"
              style={{ color: "oklch(0.58 0.01 260)" }}
            >
              No templates yet
            </p>
            <p
              className="text-sm mt-1 mb-6"
              style={{ color: "oklch(0.42 0.01 260)" }}
            >
              Create your first AI template to get started
            </p>
            <Button
              type="button"
              data-ocid="admin.empty_state.add_button"
              onClick={() => setDialog({ mode: "add" })}
              style={{
                background: "oklch(0.72 0.27 200)",
                color: "oklch(0.06 0 0)",
              }}
            >
              <FolderPlus className="w-4 h-4 mr-2" />
              Add First Template
            </Button>
          </div>
        ) : (
          <div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            data-ocid="admin.template_list"
          >
            {templates.map((template, idx) => {
              const cat =
                CATEGORY_STYLES[template.category] ?? CATEGORY_STYLES.trending;
              return (
                <div
                  key={template.id}
                  data-ocid={`admin.template_card.item.${idx + 1}`}
                  className="rounded-xl overflow-hidden group"
                  style={{
                    background: "oklch(0.12 0.01 265 / 0.7)",
                    border: "1px solid oklch(0.22 0.01 265 / 0.7)",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={template.preview_image}
                      alt={template.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=600&q=80&fit=crop";
                      }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(0.08 0 0 / 0.7) 0%, transparent 60%)",
                      }}
                    />
                    <span
                      className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold capitalize"
                      style={{
                        background: cat.bg,
                        color: cat.color,
                        border: `1px solid ${cat.color}55`,
                      }}
                    >
                      {cat.icon} {template.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <h3
                      className="font-semibold font-display text-sm mb-1 truncate"
                      style={{ color: "oklch(0.94 0.01 240)" }}
                    >
                      {template.title}
                    </h3>
                    <p
                      className="text-xs line-clamp-2 mb-4"
                      style={{ color: "oklch(0.54 0.01 260)" }}
                    >
                      {template.prompt}
                    </p>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        data-ocid={`admin.template_card.edit_button.${idx + 1}`}
                        onClick={() => setDialog({ mode: "edit", template })}
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                        style={{
                          borderColor: "oklch(0.28 0.01 265)",
                          color: "oklch(0.72 0.27 200)",
                        }}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        data-ocid={`admin.template_card.delete_button.${idx + 1}`}
                        onClick={() =>
                          setDialog({
                            mode: "confirm_delete",
                            id: template.id,
                            title: template.title,
                          })
                        }
                        className="flex-1 flex items-center justify-center gap-1.5 text-xs"
                        style={{
                          background: "oklch(0.55 0.28 25 / 0.15)",
                          color: "oklch(0.78 0.18 25)",
                          border: "1px solid oklch(0.55 0.28 25 / 0.35)",
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Add / Edit Dialog */}
      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "oklch(0.04 0 0 / 0.75)",
            backdropFilter: "blur(4px)",
          }}
          data-ocid="admin.template_form.dialog"
          onClick={(e) => {
            if (e.target === e.currentTarget) setDialog({ mode: "closed" });
          }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setDialog({ mode: "closed" });
          }}
          role="presentation"
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6"
            style={{
              background: "oklch(0.13 0.01 265 / 0.96)",
              border: "1px solid oklch(0.26 0.01 265 / 0.7)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-base font-bold font-display"
                style={{ color: "oklch(0.94 0.01 240)" }}
              >
                {dialog.mode === "add" ? "Add New Template" : "Edit Template"}
              </h2>
              <button
                type="button"
                data-ocid="admin.template_form.close_button"
                onClick={() => setDialog({ mode: "closed" })}
                className="rounded-lg p-1"
                style={{ color: "oklch(0.52 0.01 260)" }}
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <TemplateForm
              initial={
                dialog.mode === "edit"
                  ? {
                      title: dialog.template.title,
                      preview_image: dialog.template.preview_image,
                      prompt: dialog.template.prompt,
                      category: dialog.template.category,
                      tags: dialog.template.tags ?? [],
                    }
                  : undefined
              }
              onSave={handleSave}
              onCancel={() => setDialog({ mode: "closed" })}
              isSaving={isSaving}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isConfirmOpen && dialog.mode === "confirm_delete" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "oklch(0.04 0 0 / 0.75)",
            backdropFilter: "blur(4px)",
          }}
          data-ocid="admin.delete_confirm.dialog"
        >
          <div
            className="w-full max-w-sm rounded-2xl p-6"
            style={{
              background: "oklch(0.13 0.01 265 / 0.96)",
              border: "1px solid oklch(0.55 0.28 25 / 0.35)",
              boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full mx-auto mb-4"
              style={{
                background: "oklch(0.55 0.28 25 / 0.15)",
                border: "1px solid oklch(0.55 0.28 25 / 0.4)",
              }}
            >
              <Trash2
                className="w-6 h-6"
                style={{ color: "oklch(0.78 0.18 25)" }}
              />
            </div>
            <h2
              className="text-base font-bold font-display text-center mb-1"
              style={{ color: "oklch(0.94 0.01 240)" }}
            >
              Delete Template?
            </h2>
            <p
              className="text-sm text-center mb-6"
              style={{ color: "oklch(0.58 0.01 260)" }}
            >
              <span style={{ color: "oklch(0.80 0.01 240)" }}>
                “{dialog.title}”
              </span>{" "}
              will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                data-ocid="admin.delete_confirm.cancel_button"
                onClick={() => setDialog({ mode: "closed" })}
                className="flex-1"
                style={{
                  borderColor: "oklch(0.28 0.01 265)",
                  color: "oklch(0.62 0.01 260)",
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                data-ocid="admin.delete_confirm.confirm_button"
                onClick={handleDelete}
                className="flex-1 font-semibold"
                style={{
                  background: "oklch(0.55 0.28 25)",
                  color: "oklch(0.98 0.01 0)",
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
