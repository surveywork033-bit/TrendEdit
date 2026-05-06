import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { AdminTemplateForm } from "@/types/template";
import { useEffect, useState } from "react";

const EMPTY_FORM: AdminTemplateForm = {
  title: "",
  preview_image: "",
  prompt: "",
  category: "trending",
  tags: [],
};

interface TemplateFormProps {
  initial?: AdminTemplateForm;
  onSave: (data: AdminTemplateForm) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export function TemplateForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: TemplateFormProps) {
  const [form, setForm] = useState<AdminTemplateForm>(initial ?? EMPTY_FORM);

  useEffect(() => {
    setForm(initial ?? EMPTY_FORM);
  }, [initial]);

  const setField = (field: keyof AdminTemplateForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label
          htmlFor="tf-title"
          className="text-sm font-medium text-foreground"
        >
          Title
        </Label>
        <Input
          id="tf-title"
          data-ocid="template_form.title"
          value={form.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="e.g. Cinematic Portrait"
          required
          style={{
            background: "oklch(0.18 0.01 265)",
            borderColor: "oklch(0.28 0.01 265)",
          }}
          className="text-foreground placeholder:text-muted-foreground"
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="tf-image"
          className="text-sm font-medium text-foreground"
        >
          Preview Image URL
        </Label>
        <Input
          id="tf-image"
          data-ocid="template_form.preview_image"
          value={form.preview_image}
          onChange={(e) => setField("preview_image", e.target.value)}
          placeholder="https://images.unsplash.com/..."
          required
          style={{
            background: "oklch(0.18 0.01 265)",
            borderColor: "oklch(0.28 0.01 265)",
          }}
          className="text-foreground placeholder:text-muted-foreground"
        />
        {form.preview_image && (
          <img
            src={form.preview_image}
            alt="Preview"
            className="w-full h-28 object-cover rounded-lg mt-2"
            style={{ border: "1px solid oklch(0.28 0.01 265)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor="tf-prompt"
          className="text-sm font-medium text-foreground"
        >
          Prompt
        </Label>
        <Textarea
          id="tf-prompt"
          data-ocid="template_form.prompt"
          value={form.prompt}
          onChange={(e) => setField("prompt", e.target.value)}
          placeholder="Describe the AI transformation..."
          rows={3}
          required
          style={{
            background: "oklch(0.18 0.01 265)",
            borderColor: "oklch(0.28 0.01 265)",
          }}
          className="text-foreground placeholder:text-muted-foreground resize-none"
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-sm font-medium text-foreground">Category</Label>
        <Select
          value={form.category}
          onValueChange={(v) => setField("category", v)}
        >
          <SelectTrigger
            data-ocid="template_form.category"
            style={{
              background: "oklch(0.18 0.01 265)",
              borderColor: "oklch(0.28 0.01 265)",
            }}
            className="text-foreground"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            style={{
              background: "oklch(0.22 0.01 265)",
              borderColor: "oklch(0.28 0.01 265)",
            }}
          >
            <SelectItem value="trending">🔥 Trending</SelectItem>
            <SelectItem value="popular">✨ Popular</SelectItem>
            <SelectItem value="new">🆕 New</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 pt-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          data-ocid="template_form.cancel_button"
          style={{
            borderColor: "oklch(0.28 0.01 265)",
            color: "oklch(0.62 0.01 260)",
          }}
          className="hover:bg-muted"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSaving}
          data-ocid="template_form.save_button"
          style={{
            background: "oklch(0.72 0.27 200)",
            color: "oklch(0.06 0 0)",
          }}
          className="font-semibold min-w-[90px]"
        >
          {isSaving ? "Saving…" : "Save Template"}
        </Button>
      </div>
    </form>
  );
}
