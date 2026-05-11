import { supabase } from "@/lib/supabase";
import type { CategoryFilter, Prompt } from "@/types/prompt";
import { create } from "zustand";

interface CopyHistoryEntry {
  id: string;
  title: string;
  image_url: string;
  prompt_text: string;
  timestamp: number;
}

interface PromptStore {
  prompts: Prompt[];
  isLoading: boolean;
  activeFilter: CategoryFilter;
  searchQuery: string;
  favorites: string[];
  copyHistory: CopyHistoryEntry[];
  fetchPrompts: () => Promise<void>;
  setFilter: (filter: CategoryFilter) => void;
  setSearch: (query: string) => void;
  toggleFavorite: (id: string) => void;
  addToCopyHistory: (prompt: Prompt) => void;
  addPrompt: (data: Omit<Prompt, "id" | "created_at">) => Promise<void>;
  updatePrompt: (
    id: string,
    updates: Partial<Omit<Prompt, "id" | "created_at">>,
  ) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) return JSON.parse(stored) as T;
  } catch {
    // ignore
  }
  return fallback;
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export const usePromptStore = create<PromptStore>((set, get) => ({
  prompts: [],
  isLoading: false,
  activeFilter: "all",
  searchQuery: "",
  favorites: loadFromStorage<string[]>("promptvault_favorites", []),
  copyHistory: loadFromStorage<CopyHistoryEntry[]>("promptvault_history", []),

  fetchPrompts: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from("prompts")
        .select("id, title, image_url, prompt_text, category, created_at")
        .order("created_at", { ascending: false });
      if (error) {
        console.error(
          "[PromptVault] fetchPrompts error:",
          error.message,
          error.code,
        );
        set({ prompts: [] });
      } else {
        set({ prompts: (data ?? []) as Prompt[] });
      }
    } catch (err) {
      console.error("[PromptVault] fetchPrompts unexpected error:", err);
      set({ prompts: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  setFilter: (activeFilter) => set({ activeFilter }),
  setSearch: (searchQuery) => set({ searchQuery }),

  toggleFavorite: (id) => {
    const favorites = get().favorites.includes(id)
      ? get().favorites.filter((f) => f !== id)
      : [...get().favorites, id];
    saveToStorage("promptvault_favorites", favorites);
    set({ favorites });
  },

  addToCopyHistory: (prompt) => {
    const entry: CopyHistoryEntry = {
      id: prompt.id,
      title: prompt.title,
      image_url: prompt.image_url,
      prompt_text: prompt.prompt_text,
      timestamp: Date.now(),
    };
    const existing = get().copyHistory.filter((e) => e.id !== prompt.id);
    const copyHistory = [entry, ...existing].slice(0, 50);
    saveToStorage("promptvault_history", copyHistory);
    set({ copyHistory });
  },

  addPrompt: async (data) => {
    const { title, image_url, prompt_text, category } = data;
    const { error } = await supabase.from("prompts").insert([
      {
        title,
        image_url,
        prompt_text,
        category,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error(
        "[PromptVault] addPrompt error:",
        error.message,
        error.code,
        error.details,
      );
      // RLS hint: if error.code === '42501' or message includes 'row-level security', check Supabase RLS policies
      throw new Error(
        error.code === "42501" || error.message?.includes("row-level security")
          ? "Permission denied. Check Supabase RLS policies — enable INSERT for anon role on the prompts table."
          : `Failed to save prompt: ${error.message}. Check Supabase RLS policies if this persists.`,
      );
    }
    await get().fetchPrompts();
  },

  updatePrompt: async (id, updates) => {
    const { title, image_url, prompt_text, category } = updates;
    const { error } = await supabase
      .from("prompts")
      .update({ title, image_url, prompt_text, category })
      .eq("id", id);
    if (error) {
      console.error(
        "[PromptVault] updatePrompt error:",
        error.message,
        error.code,
      );
      throw new Error(
        `Failed to update prompt: ${error.message}. Check Supabase RLS policies if this persists.`,
      );
    }
    await get().fetchPrompts();
  },

  deletePrompt: async (id) => {
    const { error } = await supabase.from("prompts").delete().eq("id", id);
    if (error) {
      console.error(
        "[PromptVault] deletePrompt error:",
        error.message,
        error.code,
      );
      throw new Error(
        `Failed to delete prompt: ${error.message}. Check Supabase RLS policies if this persists.`,
      );
    }
    await get().fetchPrompts();
  },
}));
