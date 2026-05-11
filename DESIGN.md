# Design Brief: TrendEdit AI — Prompt Gallery

## Purpose & Context
Dark modern AI prompt gallery inspired by Midjourney and Pinterest. Users browse masonry grid of cinematic AI images with copy-to-clipboard prompts. Tabs filter by trending/popular/new. Bottom mobile navigation (Home, Profile). No AI processing — purely gallery curation with favorites & history tracking via localStorage.

## Tone
Luxury tech minimalism. Sophisticated, efficient, precise. Glassmorphism with neon cyan/purple accents. Premium Spotify-inspired design language. Image-dominant cards emphasize visual discovery.

## Visual Direction
Deep black background (OKLCH 0.04 0 0) with glassmorphic cards, backdrop blur, and elevated depth layering. Vibrant neon cyan and purple accent colors on buttons, active states, and glowing badges. High contrast white text. Image-dominant cards with semi-transparent title overlay and category badge.

## Color Palette

| Token | Dark Mode | Purpose |
|-------|-----------|----------|
| Primary | `oklch(0.75 0.28 280)` | Neon violet CTAs, active states, glows |
| Accent | `oklch(0.78 0.27 264)` | Neon cyan highlights, emphasis |
| Secondary | `oklch(0.65 0.25 264)` | Muted cyan accents |
| Background | `oklch(0.04 0 0)` | Deep black gallery background |
| Card | `oklch(0.10 0.01 265)` | Glassmorphic cards with blur |
| Border | `oklch(0.16 0.01 265)` | Subtle dividers and card edges |
| Foreground | `oklch(0.96 0.01 240)` | High contrast white text |
| Muted | `oklch(0.22 0.01 260)` | Inactive text, metadata |
| Destructive | `oklch(0.65 0.26 25)` | Delete/unfavorite actions |

## Typography
- **Display**: Space Grotesk (headlines, tabs, badges, CTA labels, prompt titles)
- **Body**: DM Sans (descriptions, metadata, prompts in modal, category labels)
- **Mono**: System monospace (technical timestamps, code snippets if present)

## Component Patterns
- `.glass-card`: Image-dominant card base with 16px blur, hover elevation + neon glow, rounded edges
- `.badge-trending`, `.badge-popular`, `.badge-new`: Category badges with neon glow + float animation, inset shadows
- `.tab-active` / `.tab-inactive`: Filter tabs with cyan neon accent glow on active state
- `.input-glass`: Glassmorphic search input with neon focus ring, vibrant violet accent
- `.btn-neon`: Neon violet button with glow effect, hover elevation animation
- `.btn-icon-neon`: Icon buttons (copy, favorite, close) with neon color, hover glow
- `.glow-neon`, `.glow-cyan`, `.glow-accent`: Reusable glow utilities for interactive elements

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|----------|
| Header | `bg-background` | `border-b border-border/20` | Search bar full-width + filter tabs below |
| Search Bar | `.input-glass` | `1px border-border/25` | Glassmorphic with cyan neon focus glow |
| Tab Filter | `text-muted-foreground` hover, active: `text-accent glow-accent` | `border-b-3` | Cyan neon underline + glow on active |
| Masonry Grid | `bg-background` gap-6 | None | Pinterest-style 1-2-3-4 col responsive layout |
| Prompt Card | `.glass-card image + overlay` | `border-border/20` | Image fills card, title overlay bottom, hover: -6px + neon glow |
| Card Buttons | `btn-neon` / `btn-icon-neon` | `border-border/50` | Copy + favorite icons, smooth hover animations |
| Prompt Modal | `bg-card/95 backdrop-blur-lg` | `border border-border/40` | Dark overlay with large image, full prompt, copy button |
| Bottom Nav | `bg-card/80 backdrop-blur-md fixed` | `border-t border-border/20` | 2 icons (Home, Profile), mobile-style fixed bottom |

## Motion & Animation
- `.float`: 3s infinite vertical drift for badges (0.5s ease-in-out)
- `.scale-pop`: 0.4s entrance for cards (scale 0.95→1, fade-in)
- `.transition-smooth`: 0.3s cubic-bezier for all state changes
- Card hover: -6px translateY + neon glow effect + shadow elevation
- Button hover: -2px translateY + glow intensity increase
- Favorite heart: scale-pop on toggle, color fade to red
- Copy button: pulse glow on success, "Copied!" toast feedback

## Spacing & Rhythm
- Header padding: 1.5rem vertical, 2rem horizontal, max-width: 1400px
- Search bar: full-width inside header, 1rem padding
- Filter tabs: 1rem horizontal gap, 0.75rem vertical padding
- Masonry grid: 1.5rem gap, responsive columns (1 sm, 2 md, 3 lg, 4 xl)
- Prompt card: 0.75rem border-radius, 1rem padding for overlay text
- Badge: 0.5rem py, 1rem px, 9999px radius (pill shape)
- Modal margin: 2rem safe area, centered on viewport
- Bottom nav: 2.5rem height, 1rem horizontal padding, icon size 1.5rem

## Signature Detail
Masonry gallery layout with image-dominant cards creates discovery-focused experience. Neon cyan/purple glow effects on interactive elements (buttons, active tabs, card hover) establish premium tech aesthetic. Glassmorphism with backdrop blur and layered opacity creates depth without visual heaviness. Smooth entrance animations and tactile hover feedback make gallery feel responsive and alive.

## Anti-patterns Avoided
- No rainbow palettes (2 accents max: neon cyan, neon violet)
- No bouncy animations (smooth cubic-bezier only, max -6px translate)
- No generic shadows (custom elevated shadows for cards + neon glows)
- No full-page gradients (layered elevation through opacity + blur)
- No arbitrary Tailwind colors (all OKLCH tokens)
- No blank card states (always show placeholder or fallback image)
- No visible API loading states (smooth skeleton or subtle pulse)
