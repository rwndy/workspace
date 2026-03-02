import type { Category, Product, Duration, Preset, CategoryId } from "@/types/workspace";

// ── Categories ──────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  {
    id: "desks",
    label: "Desks",
    icon: "◫",
    description: "Choose a desk — the foundation of your setup",
    selectionMode: "single",
  },
  {
    id: "chairs",
    label: "Chairs",
    icon: "◇",
    description: "Pick a chair that keeps you comfortable all day",
    selectionMode: "single",
  },
  {
    id: "monitors",
    label: "Monitors",
    icon: "▣",
    description: "Select your screen setup for max productivity",
    selectionMode: "single",
  },
  {
    id: "accessories",
    label: "Extras",
    icon: "✦",
    description: "Add the finishing touches to your workspace",
    selectionMode: "multiple",
  },
];

// ── Products ────────────────────────────────────────────────

export const PRODUCTS: Record<CategoryId, Product[]> = {
  desks: [
    {
      id: "desk-standing",
      name: "Standing Desk",
      description: "Height-adjustable, bamboo top, 160cm",
      pricePerMonth: 45,
      emoji: "🪵",
      category: "desks",
      popular: true,
      features: ["Height adjustable", "Bamboo surface", "Cable management"],
      visual: { illustration: "standing-desk", previewWidth: 220, previewHeight: 90, color: "#D4A76A", accent: "#C49A5C" },
    },
    {
      id: "desk-classic",
      name: "Classic Desk",
      description: "Solid wood, 140cm wide, timeless design",
      pricePerMonth: 30,
      emoji: "🏠",
      category: "desks",
      features: ["Solid wood", "140cm width", "Drawer included"],
      visual: { illustration: "classic-desk", previewWidth: 190, previewHeight: 85, color: "#B8956A", accent: "#A68555" },
    },
    {
      id: "desk-compact",
      name: "Compact Desk",
      description: "Perfect for small spaces, 100cm",
      pricePerMonth: 22,
      emoji: "📐",
      category: "desks",
      features: ["Space-saving", "Lightweight", "Easy setup"],
      visual: { illustration: "compact-desk", previewWidth: 160, previewHeight: 75, color: "#E8D5B7", accent: "#D4C4A5" },
    },
  ],
  chairs: [
    {
      id: "chair-ergo",
      name: "Ergonomic Pro",
      description: "Full lumbar support, breathable mesh",
      pricePerMonth: 35,
      emoji: "💺",
      category: "chairs",
      popular: true,
      features: ["Lumbar support", "Mesh back", "Adjustable arms"],
      visual: { illustration: "ergo-chair", previewWidth: 65, previewHeight: 80, color: "#2C2C2C", accent: "#444444" },
    },
    {
      id: "chair-basic",
      name: "Office Chair",
      description: "Comfortable & adjustable, fabric seat",
      pricePerMonth: 18,
      emoji: "🪑",
      category: "chairs",
      features: ["Height adjustable", "Padded seat", "Swivel base"],
      visual: { illustration: "basic-chair", previewWidth: 58, previewHeight: 72, color: "#555555", accent: "#666666" },
    },
    {
      id: "chair-premium",
      name: "Executive Chair",
      description: "Premium leather, Herman Miller inspired",
      pricePerMonth: 55,
      emoji: "👑",
      category: "chairs",
      features: ["Premium leather", "Headrest", "Tilt mechanism"],
      visual: { illustration: "premium-chair", previewWidth: 70, previewHeight: 85, color: "#1A1A1A", accent: "#333333" },
    },
  ],
  monitors: [
    {
      id: "monitor-27",
      name: '27" 4K Monitor',
      description: "Ultra-sharp IPS, USB-C hub built-in",
      pricePerMonth: 40,
      emoji: "🖥️",
      category: "monitors",
      popular: true,
      features: ["4K UHD", "USB-C", "Color accurate"],
      visual: { illustration: "monitor-27", previewWidth: 85, previewHeight: 60, color: "#1A1A1A", accent: "#333333" },
    },
    {
      id: "monitor-24",
      name: '24" FHD Monitor',
      description: "Full HD, low latency, great for coding",
      pricePerMonth: 25,
      emoji: "💻",
      category: "monitors",
      features: ["Full HD", "75Hz", "HDMI + DP"],
      visual: { illustration: "monitor-24", previewWidth: 72, previewHeight: 52, color: "#222222", accent: "#3A3A3A" },
    },
    {
      id: "monitor-dual",
      name: "Dual Monitor Set",
      description: '2× 24" FHD screens + dual arm mount',
      pricePerMonth: 45,
      emoji: "🖥️",
      category: "monitors",
      features: ['2× 24" FHD', "Dual arm mount", "Daisy chain"],
      visual: { illustration: "monitor-dual", previewWidth: 150, previewHeight: 55, color: "#1A1A1A", accent: "#333333" },
    },
  ],
  accessories: [
    {
      id: "acc-lamp",
      name: "Desk Lamp",
      description: "Warm LED, color temperature control",
      pricePerMonth: 8,
      emoji: "💡",
      category: "accessories",
      visual: { illustration: "lamp", previewWidth: 30, previewHeight: 45, color: "#D4A853", accent: "#C49840" },
    },
    {
      id: "acc-plant",
      name: "Desk Plant",
      description: "Low-maintenance tropical greenery",
      pricePerMonth: 5,
      emoji: "🌿",
      category: "accessories",
      visual: { illustration: "plant", previewWidth: 35, previewHeight: 42, color: "#3A7550", accent: "#2D5A3D" },
    },
    {
      id: "acc-keyboard",
      name: "Keyboard + Mouse",
      description: "Wireless Logitech MX combo",
      pricePerMonth: 12,
      emoji: "⌨️",
      category: "accessories",
      features: ["Bluetooth", "Multi-device", "Rechargeable"],
      visual: { illustration: "keyboard", previewWidth: 60, previewHeight: 20, color: "#888888", accent: "#999999" },
    },
    {
      id: "acc-headset",
      name: "Noise-Cancel Headset",
      description: "Sony/Bose level ANC with mic",
      pricePerMonth: 15,
      emoji: "🎧",
      category: "accessories",
      visual: { illustration: "headset", previewWidth: 35, previewHeight: 35, color: "#2C2C2C", accent: "#444444" },
    },
    {
      id: "acc-webcam",
      name: "4K Webcam",
      description: "Logitech Brio, auto-focus, HDR",
      pricePerMonth: 12,
      emoji: "📷",
      category: "accessories",
      visual: { illustration: "webcam", previewWidth: 25, previewHeight: 20, color: "#333333", accent: "#555555" },
    },
    {
      id: "acc-stand",
      name: "Laptop Stand",
      description: "Aluminum, adjustable angle",
      pricePerMonth: 8,
      emoji: "📱",
      category: "accessories",
      visual: { illustration: "laptop-stand", previewWidth: 40, previewHeight: 30, color: "#AAAAAA", accent: "#BBBBBB" },
    },
  ],
};

// ── Durations ───────────────────────────────────────────────

export const DURATIONS: Duration[] = [
  { months: 1, label: "1 month", discount: 0 },
  { months: 3, label: "3 months", discount: 10, tag: "Popular" },
  { months: 6, label: "6 months", discount: 20, tag: "Best value" },
  { months: 12, label: "12 months", discount: 30 },
];

// ── Presets ──────────────────────────────────────────────────

export const PRESETS: Preset[] = [
  {
    id: "minimal",
    name: "Minimalist",
    description: "Just the essentials",
    emoji: "🧘",
    itemIds: ["desk-compact", "chair-basic", "monitor-24"],
  },
  {
    id: "pro",
    name: "Pro Setup",
    description: "Everything a dev needs",
    emoji: "⚡",
    itemIds: ["desk-standing", "chair-ergo", "monitor-27", "acc-keyboard", "acc-lamp"],
  },
  {
    id: "full",
    name: "Full Office",
    description: "The complete package",
    emoji: "🏢",
    itemIds: ["desk-standing", "chair-premium", "monitor-dual", "acc-keyboard", "acc-lamp", "acc-plant", "acc-headset", "acc-webcam"],
  },
];

// ── Helpers ─────────────────────────────────────────────────

export function getAllProducts(): Product[] {
  return Object.values(PRODUCTS).flat();
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find((p) => p.id === id);
}

export function getPresetProducts(presetId: string): Product[] {
  const preset = PRESETS.find((p) => p.id === presetId);
  if (!preset) return [];
  return preset.itemIds.map(getProductById).filter((p): p is Product => p !== undefined);
}

export function getPresetTotal(presetId: string): number {
  return getPresetProducts(presetId).reduce((sum, p) => sum + p.pricePerMonth, 0);
}
