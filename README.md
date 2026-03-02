# 🏝️ monis.rent — Workspace Builder

An interactive visual workspace configurator where digital nomads in Bali can design their dream office setup, see it come to life in real-time, and rent everything with one click.

**Live demo:** [your-deployed-url.vercel.app](https://your-deployed-url.vercel.app)

---

## Approach & Write-Up

I approached this from the user's perspective first, not the code. The persona is a freelance developer who just landed in Bali, jetlagged, needing a workspace by next week. They don't want to scroll through a spreadsheet of products — they want to *feel* their future setup taking shape.

So instead of building a typical product catalog, I built a **visual configurator** inspired by how Tesla, IKEA Kreativ, and Nike iD let users compose products visually. The core idea: every click immediately changes what you *see*, not just what's in a cart. Picking a standing desk renders it as an SVG illustration with wood grain texture. Adding a monitor places it on top of the desk with a glowing screen. This creates emotional ownership before the user ever hits "Rent."

**Tech choices:**

- **Next.js 16 (App Router)** — Server Components handle SEO metadata and the HTML shell with zero client JS. All interactive pieces are isolated Client Components, so the initial page load is fast.
- **Zustand** over Redux or Context — lightweight, zero boilerplate, and the store encodes business rules directly (desks/chairs are single-select, accessories are multi-select). This prevents invalid states at the store level rather than scattering validation across UI components.
- **Framer Motion** — spring physics on item add/remove, `AnimatePresence` for enter/exit transitions, and an animated price counter that smoothly interpolates between values. These micro-interactions make the difference between "functional" and "delightful."
- **SVG illustrations** — hand-crafted vector furniture with textures (wood grain, mesh patterns, screen glow with code lines). Pure SVG keeps the bundle tiny while looking polished.
- **Tailwind CSS v4** — CSS-first `@theme` configuration, no JS config file. Custom "Tropical Minimal" palette with warm earth tones that feel like Bali without being kitschy.

**What I'd improve with more time:**

- **Drag and drop** — let users physically drag items from the catalog onto the workspace canvas using `@dnd-kit`, with snap-to-position physics. This would make building feel much more tactile.
- **Real product images** — replace SVG illustrations with actual product photos from monis.rent, using `next/image` with blur-up placeholders for smooth loading.
- **Shareable setups** — generate a unique URL or OG image of the configured workspace so users can share on social media. Every user becomes a marketing channel.
- **Responsive preview** — the SVG scene works on desktop but could be optimized for mobile with touch gestures and a stacked layout.
- **Backend integration** — connect to monis.rent's Booqable inventory API for real-time pricing/availability, and make "Confirm Rental" create an actual order.
- **Animation polish** — confetti on first item added, subtle sound effects on add/remove, shake animation when trying to add a duplicate.

---

## Quick Start

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

| Tool | Why |
|---|---|
| Next.js 16 | App Router, Server + Client Components, Turbopack |
| TypeScript | Strict mode, full type coverage across all files |
| Tailwind CSS v4 | CSS-first `@theme` config, custom design tokens |
| Zustand | Minimal state management with business logic baked in |
| Framer Motion | Spring animations, layout transitions, AnimatePresence |

## Features

- ✅ Select from 3 desk options (Standing, Classic, Compact)
- ✅ Select from 3 chair options (Ergonomic Pro, Office, Executive)
- ✅ Add accessories: 3 monitors + lamp, plant, keyboard, headset, webcam, laptop stand
- ✅ Live visual workspace preview updates as items change (SVG scene with animations)
- ✅ Quick-start presets (Minimalist, Pro Setup, Full Office) to reduce decision fatigue
- ✅ Rental duration selector with progressive discounts (10–30% off)
- ✅ Animated price counter in sticky bottom bar
- ✅ Checkout summary with itemized breakdown, discount calculation, and confirmation flow
- ✅ Click-to-remove items directly from the workspace preview

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Server Component — fonts, metadata, viewport
│   ├── page.tsx                # Server Component — composes client components
│   └── globals.css             # Tailwind v4 @theme + custom styles
│
├── types/workspace.ts          # Domain types (Product, Category, Duration, etc.)
├── data/products.ts            # Product catalog, categories, presets, helpers
├── store/workspace-store.ts    # Zustand store — single source of truth
├── hooks/use-animated-number.ts # Smooth requestAnimationFrame price animation
├── lib/utils.ts                # cn() class merge helper
│
└── components/workspace/
    ├── index.ts                # Barrel exports
    ├── Header.tsx              # Brand + reset button
    ├── WorkspacePreview.tsx    # SVG visual scene (the hero)
    ├── FurnitureSVG.tsx        # SVG illustrations (desk, chair, monitor, 6 accessories)
    ├── ProductCard.tsx         # Product option with hover/selected/feature states
    ├── ProductCatalog.tsx      # Category tabs + animated product list
    ├── PresetBar.tsx           # Quick-start preset bundles
    ├── DurationSelector.tsx    # Rental duration with discount badges
    ├── PriceBar.tsx            # Sticky bottom with animated total + CTA
    └── CheckoutOverlay.tsx     # 2-step checkout modal (summary → confirmed)
```

## Architecture Highlights

**Server/Client boundary** — `layout.tsx` and `page.tsx` are Server Components handling metadata, fonts (via `next/font`), and the static shell without shipping any JavaScript. All interactive components under `components/workspace/` are Client Components marked with `"use client"`.

**Store with business rules** — the Zustand store encodes category-specific selection logic: desks, chairs, and monitors are single-select (adding a new one auto-replaces the existing), while accessories are multi-select with duplicate prevention. A `lastAction` field tracks the most recent mutation so Framer Motion can trigger the right entry animation.

**SVG composition** — the workspace scene is built from individual furniture components (`DeskSVG`, `MonitorSVG`, `ChairSVG`, `AccessorySVG`) that are spatially composed — monitors sit on the desk surface, accessories spread across it, chairs render behind. `AnimatePresence` handles smooth mount/unmount transitions with spring physics.
