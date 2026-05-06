import { useTemplateStore } from "@/store/useTemplateStore";
import type { Template } from "@/types/template";

/** Returns templates directly from the local store — no backend calls. */
export function useGetTemplates(): { data: Template[]; isLoading: boolean } {
  const templates = useTemplateStore((s) => s.templates);
  return { data: templates, isLoading: false };
}
