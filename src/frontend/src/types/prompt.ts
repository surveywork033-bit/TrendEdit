export interface Prompt {
  id: string;
  title: string;
  image_url: string;
  prompt_text: string;
  category: "trending" | "popular" | "new";
  created_at?: string;
}

export type CategoryFilter = "all" | "trending" | "popular" | "new";
