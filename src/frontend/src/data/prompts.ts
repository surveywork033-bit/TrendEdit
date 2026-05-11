import type { Prompt } from "@/types/prompt";

// All prompts are now loaded dynamically from Supabase.
// This file intentionally exports an empty array as the fallback.
export const prompts: Prompt[] = [];
export const defaultPrompts: Prompt[] = [];
