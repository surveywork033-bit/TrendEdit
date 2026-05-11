import type { backendInterface } from "../backend";

const sampleTemplates = [
  {
    id: BigInt(1),
    title: "Cyberpunk City at Night",
    tags: ["cyberpunk", "city", "neon", "night"],
    preview_image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    category: "Trending",
    prompt:
      "A sprawling cyberpunk cityscape at night, neon signs reflecting on wet streets, towering skyscrapers, dramatic blue and purple lighting, ultra-detailed, 8K, cinematic composition",
  },
  {
    id: BigInt(2),
    title: "Ethereal Forest Spirit",
    tags: ["fantasy", "forest", "spirit", "ethereal"],
    preview_image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80",
    category: "Popular",
    prompt:
      "A mystical forest spirit surrounded by glowing particles, ancient trees with luminescent moss, soft ethereal light, fantasy art, highly detailed digital painting",
  },
  {
    id: BigInt(3),
    title: "Deep Space Nebula",
    tags: ["space", "nebula", "cosmos", "stars"],
    preview_image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&q=80",
    category: "New",
    prompt:
      "A breathtaking deep space nebula with vibrant purple and blue gas clouds, thousands of stars, a distant galaxy in the background, NASA photography style, photorealistic",
  },
  {
    id: BigInt(4),
    title: "Samurai in the Rain",
    tags: ["samurai", "japan", "rain", "warrior"],
    preview_image:
      "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=600&q=80",
    category: "Trending",
    prompt:
      "A lone samurai standing in heavy rain at dusk, cherry blossom petals falling, traditional Japanese village background, cinematic lighting, hyper-realistic, dramatic shadows",
  },
  {
    id: BigInt(5),
    title: "AI Robot Portrait",
    tags: ["robot", "ai", "portrait", "futuristic"],
    preview_image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    category: "Popular",
    prompt:
      "A hyper-realistic portrait of an AI robot with glowing blue eyes, intricate metallic textures, soft studio lighting, shallow depth of field, 4K render, Unreal Engine 5",
  },
  {
    id: BigInt(6),
    title: "Underwater Ancient City",
    tags: ["underwater", "ancient", "city", "ruins"],
    preview_image:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80",
    category: "New",
    prompt:
      "An ancient city submerged underwater, sunlight filtering through the ocean surface, colorful coral growing on stone pillars, schools of tropical fish, photorealistic, ultra-detailed",
  },
];

let templates = [...sampleTemplates];
let nextId = BigInt(7);

export const mockBackend: backendInterface = {
  getTemplates: async () => templates,

  getTemplate: async (id: bigint) =>
    templates.find((t) => t.id === id) ?? null,

  addTemplate: async (
    title: string,
    preview_image: string,
    prompt: string,
    category: string,
    tags: Array<string>
  ) => {
    const newTemplate = {
      id: nextId++,
      title,
      preview_image,
      prompt,
      category,
      tags,
    };
    templates.push(newTemplate);
    return newTemplate;
  },

  updateTemplate: async (
    id: bigint,
    title: string,
    preview_image: string,
    prompt: string,
    category: string,
    tags: Array<string>
  ) => {
    const idx = templates.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    templates[idx] = { id, title, preview_image, prompt, category, tags };
    return templates[idx];
  },

  deleteTemplate: async (id: bigint) => {
    const before = templates.length;
    templates = templates.filter((t) => t.id !== id);
    return templates.length < before;
  },
};
