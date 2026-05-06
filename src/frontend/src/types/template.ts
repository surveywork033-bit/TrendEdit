export interface Template {
  id: string;
  title: string;
  preview_image: string;
  prompt: string;
  category: "trending" | "popular" | "new";
  tags: string[];
}

export type FilterTab = "all" | "trending" | "popular" | "new";

export interface AdminTemplateForm {
  title: string;
  preview_image: string;
  prompt: string;
  category: "trending" | "popular" | "new";
  tags: string[];
}
