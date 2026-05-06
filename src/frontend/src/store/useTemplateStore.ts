import type { FilterTab, Template } from "@/types/template";
import { create } from "zustand";

const STORAGE_KEY = "trendedit_templates";
const SCHEMA_VERSION = "v2"; // bump when Template shape changes
const VERSION_KEY = "trendedit_schema_version";

const DEFAULT_TEMPLATES: Template[] = [
  {
    id: "1",
    title: "Ethereal Glow",
    preview_image: "https://picsum.photos/seed/portrait/400/300",
    prompt:
      "Transform this portrait with ethereal glow effects, soft luminescent light, dreamlike bokeh, and celestial atmosphere",
    category: "trending",
    tags: ["portrait", "glow", "dreamy", "ai", "soft"],
  },
  {
    id: "2",
    title: "Cyberpunk Dream",
    preview_image: "https://picsum.photos/seed/neon/400/300",
    prompt:
      "Apply cyberpunk aesthetic with neon city lights, electric blue and magenta tones, rain reflections, futuristic urban atmosphere",
    category: "trending",
    tags: ["neon", "cyberpunk", "futuristic", "urban", "night"],
  },
  {
    id: "3",
    title: "Golden Hour",
    preview_image: "https://picsum.photos/seed/sunset/400/300",
    prompt:
      "Transform with luxurious golden hour lighting, warm amber hues, cinematic bokeh, regal and opulent atmosphere",
    category: "popular",
    tags: ["golden", "sunset", "warm", "cinematic", "bokeh"],
  },
  {
    id: "4",
    title: "Vintage Film",
    preview_image: "https://picsum.photos/seed/vintage/400/300",
    prompt:
      "Apply muted, dusty tones with soft film grain, analog photography feel, faded nostalgia, cool silver and grey palette",
    category: "new",
    tags: ["vintage", "film", "retro", "grain", "analog"],
  },
  {
    id: "5",
    title: "Urban Minimal",
    preview_image: "https://picsum.photos/seed/urban/400/300",
    prompt:
      "Minimalist urban composition with clean lines, architectural forms, monochromatic depth, and geometric elegance",
    category: "popular",
    tags: ["minimal", "urban", "architecture", "clean", "monochrome"],
  },
  {
    id: "6",
    title: "Cinematic Edit",
    preview_image: "https://picsum.photos/seed/cinematic/400/300",
    prompt:
      "Hollywood cinematic grade with teal and orange contrast, dramatic shadows, wide-aspect letterbox crop, film-like atmosphere",
    category: "trending",
    tags: ["cinematic", "film", "teal", "dramatic", "hollywood"],
  },
  {
    id: "7",
    title: "Nature Refresh",
    preview_image: "https://picsum.photos/seed/nature/400/300",
    prompt:
      "Enhance with vibrant nature tones, lush greens, fresh air feel, soft natural light, organic and serene atmosphere",
    category: "new",
    tags: ["nature", "green", "fresh", "outdoor", "serene"],
  },
  {
    id: "8",
    title: "Clean Minimal",
    preview_image: "https://picsum.photos/seed/minimal/400/300",
    prompt:
      "Ultra-clean minimalist treatment with bright whites, subtle shadows, Scandinavian-inspired simplicity and airy feel",
    category: "new",
    tags: ["minimal", "clean", "white", "scandinavian", "airy"],
  },
];

function loadTemplates(): Template[] {
  try {
    // Bust cache when schema version changes
    const storedVersion = localStorage.getItem(VERSION_KEY);
    if (storedVersion !== SCHEMA_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, SCHEMA_VERSION);
      return DEFAULT_TEMPLATES;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Template[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return DEFAULT_TEMPLATES;
}

function saveTemplates(templates: Template[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  } catch {
    // ignore
  }
}

interface TemplateStore {
  templates: Template[];
  activeFilter: FilterTab;
  searchQuery: string;
  selectedTemplate: Template | null;
  isUploadModalOpen: boolean;
  setActiveFilter: (filter: FilterTab) => void;
  setSearchQuery: (query: string) => void;
  openUploadModal: (template: Template) => void;
  closeUploadModal: () => void;
  addTemplate: (template: Template) => void;
  updateTemplate: (template: Template) => void;
  deleteTemplate: (id: string) => void;
  filteredTemplates: () => Template[];
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: loadTemplates(),
  activeFilter: "all",
  searchQuery: "",
  selectedTemplate: null,
  isUploadModalOpen: false,

  setActiveFilter: (activeFilter) => set({ activeFilter }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),

  openUploadModal: (template) =>
    set({ selectedTemplate: template, isUploadModalOpen: true }),

  closeUploadModal: () =>
    set({ isUploadModalOpen: false, selectedTemplate: null }),

  addTemplate: (template) => {
    const templates = [...get().templates, template];
    saveTemplates(templates);
    set({ templates });
  },

  updateTemplate: (template) => {
    const templates = get().templates.map((t) =>
      t.id === template.id ? template : t,
    );
    saveTemplates(templates);
    set({ templates });
  },

  deleteTemplate: (id) => {
    const templates = get().templates.filter((t) => t.id !== id);
    saveTemplates(templates);
    set({ templates });
  },

  filteredTemplates: () => {
    const { templates, activeFilter, searchQuery } = get();
    const q = searchQuery.toLowerCase().trim();
    return templates.filter((t) => {
      const matchesFilter =
        activeFilter === "all" || t.category === activeFilter;
      if (!matchesFilter) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        (t.tags ?? []).some((tag) => tag.toLowerCase().includes(q))
      );
    });
  },
}));
