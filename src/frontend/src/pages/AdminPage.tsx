import { usePromptStore } from "@/store/usePromptStore";
import type { Prompt } from "@/types/prompt";
import { useRouter } from "@tanstack/react-router";
import { Edit2, Loader2, LogOut, Plus, Save, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type PromptForm = {
  title: string;
  image_url: string;
  prompt_text: string;
  category: Prompt["category"];
};

const emptyForm: PromptForm = {
  title: "",
  image_url: "",
  prompt_text: "",
  category: "trending",
};

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?w=200&q=60";

function AdminImagePreview({ url }: { url: string }) {
  const [src, setSrc] = useState(url);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setSrc(url || FALLBACK_IMG);
    setErrored(false);
  }, [url]);

  if (!url) return null;

  return (
    <div
      className="mt-2 w-full rounded-xl overflow-hidden relative"
      style={{
        background: "oklch(0.08 0.01 265 / 0.5)",
        border: "1px solid oklch(0.22 0.01 265 / 0.3)",
      }}
    >
      <img
        src={src}
        alt="Preview"
        loading="lazy"
        onError={() => {
          if (!errored) {
            setErrored(true);
            setSrc(FALLBACK_IMG);
          }
        }}
        className="w-full h-auto max-h-48 object-contain block"
      />
      {errored && (
        <p
          className="text-center text-xs py-2"
          style={{ color: "oklch(0.70 0.22 25)" }}
        >
          ⚠️ Image failed to load — URL may be invalid
        </p>
      )}
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { prompts, addPrompt, updatePrompt, deletePrompt, fetchPrompts } =
    usePromptStore();

  // Auth guard
  useEffect(() => {
    if (!localStorage.getItem("promptvault_admin")) {
      router.navigate({ to: "/admin-login" });
    } else {
      fetchPrompts();
    }
  }, [router, fetchPrompts]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PromptForm>(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("promptvault_admin");
    router.navigate({ to: "/" });
  };

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (p: Prompt) => {
    setEditingId(p.id);
    setForm({
      title: p.title,
      image_url: p.image_url,
      prompt_text: p.prompt_text,
      category: p.category,
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await updatePrompt(editingId, form);
        toast.success("Prompt updated successfully!");
      } else {
        await addPrompt(form);
        toast.success("Prompt added successfully!");
      }
      closeForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(true);
    try {
      await deletePrompt(id);
      toast.success("Prompt deleted.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      toast.error(msg);
    } finally {
      setIsDeleting(false);
      setConfirmDelete(null);
    }
  };

  return (
    <div
      className="min-h-screen pb-8"
      style={{ background: "oklch(0.06 0 0)" }}
      data-ocid="admin.page"
    >
      {/* Header */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between px-4 py-4 border-b"
        style={{
          background: "oklch(0.09 0.01 265 / 0.95)",
          backdropFilter: "blur(20px)",
          borderColor: "oklch(0.22 0.01 265 / 0.4)",
        }}
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-base font-bold gradient-text-purple">
            Admin Dashboard
          </span>
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "oklch(0.72 0.26 264 / 0.2)",
              color: "oklch(0.82 0.24 264)",
              border: "1px solid oklch(0.72 0.26 264 / 0.35)",
            }}
          >
            {prompts.length} prompts
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={openAdd}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-display font-semibold text-xs"
            style={{
              background: "oklch(0.72 0.26 264)",
              color: "oklch(0.06 0 0)",
              boxShadow: "0 0 16px oklch(0.72 0.26 264 / 0.4)",
            }}
            data-ocid="admin.primary_button"
          >
            <Plus size={14} />
            Add Prompt
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="btn-icon-neon"
            aria-label="Logout"
            data-ocid="admin.secondary_button"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* Prompt list */}
      <div className="px-4 pt-4 space-y-3" data-ocid="admin.list">
        {prompts.map((p, i) => (
          <div
            key={p.id}
            className="flex gap-3 items-start rounded-xl p-3"
            style={{
              background: "oklch(0.1 0.01 265 / 0.5)",
              border: "1px solid oklch(0.2 0.01 265 / 0.3)",
            }}
            data-ocid={`admin.item.${i + 1}`}
          >
            {/* Thumbnail */}
            <img
              src={p.image_url}
              alt={p.title}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&q=60";
              }}
            />

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-display text-sm font-semibold text-foreground truncate">
                {p.title}
              </p>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                style={{
                  background:
                    p.category === "trending"
                      ? "oklch(0.72 0.26 264 / 0.2)"
                      : p.category === "popular"
                        ? "oklch(0.75 0.28 280 / 0.2)"
                        : "oklch(0.55 0.2 142 / 0.2)",
                  color:
                    p.category === "trending"
                      ? "oklch(0.82 0.24 264)"
                      : p.category === "popular"
                        ? "oklch(0.85 0.26 280)"
                        : "oklch(0.78 0.2 142)",
                }}
              >
                {p.category}
              </span>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 font-body">
                {p.prompt_text}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1.5 shrink-0">
              <button
                type="button"
                className="btn-icon-neon w-8 h-8"
                onClick={() => openEdit(p)}
                aria-label="Edit"
                data-ocid={`admin.edit_button.${i + 1}`}
              >
                <Edit2 size={12} />
              </button>
              <button
                type="button"
                className="btn-icon-neon w-8 h-8"
                onClick={() => setConfirmDelete(p.id)}
                aria-label="Delete"
                style={{ color: "oklch(0.70 0.22 25)" }}
                data-ocid={`admin.delete_button.${i + 1}`}
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Form Modal */}
      {showForm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
          data-ocid="admin.dialog"
        >
          <div
            className="w-full max-w-lg rounded-2xl p-6 space-y-4"
            style={{
              background: "oklch(0.1 0.01 265 / 0.98)",
              border: "1px solid oklch(0.28 0.02 265 / 0.4)",
              boxShadow: "0 0 50px oklch(0.75 0.28 280 / 0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-foreground">
                {editingId ? "Edit Prompt" : "Add New Prompt"}
              </h2>
              <button
                type="button"
                className="btn-icon-neon w-8 h-8"
                onClick={closeForm}
                aria-label="Close"
                data-ocid="admin.close_button"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label
                  htmlFor="f-title"
                  className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Title
                </label>
                <input
                  id="f-title"
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  className="input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                  placeholder="Cinematic Dragon at Dawn"
                  required
                  data-ocid="admin.title_input"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="f-image"
                  className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Image URL
                </label>
                <input
                  id="f-image"
                  type="url"
                  value={form.image_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image_url: e.target.value }))
                  }
                  className="input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40"
                  placeholder="https://i.ibb.co/... or https://i.postimg.cc/..."
                  data-ocid="admin.image_input"
                />
                <AdminImagePreview url={form.image_url} />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="f-prompt"
                  className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Full Prompt
                </label>
                <textarea
                  id="f-prompt"
                  value={form.prompt_text}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, prompt_text: e.target.value }))
                  }
                  rows={4}
                  className="input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/40 resize-none"
                  placeholder="Detailed AI image generation prompt..."
                  required
                  data-ocid="admin.prompt_textarea"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="f-category"
                  className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Category
                </label>
                <select
                  id="f-category"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      category: e.target.value as Prompt["category"],
                    }))
                  }
                  className="input-glass w-full rounded-xl px-4 py-2.5 text-sm text-foreground"
                  data-ocid="admin.category_select"
                >
                  <option value="trending">🔥 Trending</option>
                  <option value="popular">✨ Popular</option>
                  <option value="new">🆕 New</option>
                </select>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-display font-semibold text-sm"
                  style={{
                    background: "oklch(0.72 0.26 264)",
                    color: "oklch(0.06 0 0)",
                    boxShadow: "0 0 20px oklch(0.72 0.26 264 / 0.45)",
                  }}
                  data-ocid="admin.save_button"
                >
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {isSaving
                    ? "Saving…"
                    : editingId
                      ? "Save Changes"
                      : "Add Prompt"}
                </button>
                <button
                  type="button"
                  className="btn-neon px-4 rounded-xl"
                  onClick={closeForm}
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {confirmDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            className="w-full max-w-xs rounded-2xl p-6 text-center space-y-4"
            style={{
              background: "oklch(0.1 0.01 265 / 0.98)",
              border: "1px solid oklch(0.55 0.22 25 / 0.4)",
              boxShadow: "0 0 40px oklch(0.55 0.22 25 / 0.2)",
            }}
          >
            <div className="text-3xl">🗑️</div>
            <p className="font-display font-semibold text-sm text-foreground">
              Delete this prompt?
            </p>
            <p className="text-xs text-muted-foreground">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 py-2.5 rounded-xl font-display font-semibold text-xs"
                style={{
                  background: "oklch(0.55 0.22 25 / 0.25)",
                  color: "oklch(0.78 0.22 25)",
                  border: "1px solid oklch(0.55 0.22 25 / 0.4)",
                }}
                onClick={() => handleDelete(confirmDelete)}
                disabled={isDeleting}
                data-ocid="admin.confirm_button"
              >
                {isDeleting ? (
                  <Loader2 size={12} className="animate-spin mx-auto" />
                ) : (
                  "Delete"
                )}
              </button>
              <button
                type="button"
                className="flex-1 btn-neon py-2.5 rounded-xl text-xs"
                onClick={() => setConfirmDelete(null)}
                data-ocid="admin.cancel_button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
