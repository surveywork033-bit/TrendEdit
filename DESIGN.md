# Design Brief: TrendEdit AI

## Purpose & Context
Dark modern AI template platform. Users browse, search, and filter templates across trending, popular, and new categories. Upload modal flow applies templates to images with AI processing. Admin dashboard for template CRUD.

## Tone
Luxury tech minimalism. Sophisticated, efficient, precise. Glassmorphism with vibrant accent colors. Premium Spotify-inspired design language.

## Visual Direction
Deep black background with glassmorphic cards, backdrop blur, and elevated depth layering. Vibrant purple/violet accent badges. Cyan primary for CTAs. High contrast white text. No gradients—pure OKLCH precision.

## Color Palette

| Token | Dark Mode | Purpose |
|-------|-----------|-------|
| Primary | `oklch(0.68 0.28 264)` | Cyan CTAs, active states, highlights |
| Accent | `oklch(0.75 0.28 280)` | Violet badges, emphasis |
| Secondary | `oklch(0.55 0.24 280)` | Muted purple accents |
| Background | `oklch(0.06 0 0)` | Deep black |
| Card | `oklch(0.12 0.01 265)` | Glassmorphic cards with blur |
| Border | `oklch(0.2 0.01 265)` | Subtle dividers for depth |
| Foreground | `oklch(0.94 0.01 240)` | High contrast text |
| Muted | `oklch(0.24 0.01 260)` | Inactive text, placeholders |
| Destructive | `oklch(0.65 0.25 25)` | Delete/danger actions |

## Typography
- **Display**: Space Grotesk (headlines, tabs, badges, CTA labels)
- **Body**: DM Sans (descriptions, metadata, body copy)
- **Mono**: JetBrains Mono (codes, timestamps, technical labels)

## Component Patterns
- `.glass-card`: Glassmorphic base with 16px blur, hover elevation + scale
- `.badge-trending`, `.badge-popular`, `.badge-new`: Category badges with glow + float animation
- `.tab-active` / `.tab-inactive`: Filter tabs with violet accent glow
- `.input-glass`: Glassmorphic search input with focus glow
- `.gradient-text-purple`: Cyan-to-violet gradient text for hero titles

## Structural Zones

| Zone | Background | Border | Treatment |
|------|-----------|--------|------------|
| Header/Hero | `bg-background` | `border-b border-border/30` | Search + filter nav |
| Search Bar | `.input-glass` | 1px `border-border/30` | Glassmorphic with focus glow |
| Tab Filter | `text-muted-foreground` hover, active: `text-accent glow` | `border-b-2` | Violet underline + glow on active |
| Card Grid | `bg-background` | None | 1.5rem gap, responsive |
| Template Card | `.glass-card` | `border-border/25` | Hover: translateY(-4px), elevated shadow |
| Admin Modal | `bg-card/95 backdrop-blur-lg` | `border border-border/50` | Glassmorphic overlay |

## Motion & Animation
- `.float`: 3s infinite badge animation (vertical drift)
- `.scale-pop`: 0.4s entrance for cards (scale 0.95→1)
- `.transition-smooth`: 0.3s cubic-bezier for all state changes
- Card hover: -4px translateY + 0.6 opacity shadow
- Input focus: glow + border color shift

## Spacing & Rhythm
- Header padding: 1.5rem vertical, 2rem horizontal
- Card grid: 1.5rem gap, responsive (1 sm, 2 md, 3 lg, 4 xl)
- Badge: 0.375rem py, 0.875rem px
- Radius: 0.625rem (lg), 0.375rem (sm), full (badge/rounded buttons)

## Signature Detail
Vibrant category badges with layered glow effects and glassmorphic cards with backdrop blur create visual hierarchy and premium feel. Cyan primary + violet secondary accents ground functionality. Smooth hover animations (scale + elevation) provide tactile feedback without playfulness.

## Anti-patterns Avoided
- No rainbow palettes (3 accents max: cyan, violet, amber)
- No bouncy animations (smooth cubic-bezier only)
- No generic shadows (custom elevated shadows for cards)
- No full-page gradients (layered elevation through opacity + blur)
- No arbitrary Tailwind colors (all OKLCH tokens)
