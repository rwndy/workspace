import { create } from "zustand";
import type {
  WorkspaceStore,
  Product,
  Duration,
  CategoryId,
} from "@/types/workspace";
import { DURATIONS, CATEGORIES, getPresetProducts } from "@/data/products";

/**
 * Workspace Zustand store.
 *
 * Key business rules:
 * - Desks, Chairs, Monitors: single-select (adding replaces existing)
 * - Accessories: multi-select (no duplicates)
 * - `lastAction` tracks the most recent mutation for animation triggers
 */
export const useWorkspaceStore = create<WorkspaceStore>((set, get) => ({
  // ── Initial State ─────────────────────────────────
  items: [],
  duration: DURATIONS[1], // 3 months default
  activeCategory: "desks",
  showCheckout: false,
  lastAction: { type: null, itemId: null },

  // ── Mutations ─────────────────────────────────────

 addItem: (product: Product) => {
  const { items } = get();
  const category = CATEGORIES.find((c) => c.id === product.category);

  let newItems = [...items];

  if (category?.selectionMode === "single") {
    newItems = newItems.filter((i) => i.category !== product.category);
  } else if (newItems.some((i) => i.id === product.id)) {
    return; // prevent duplicate accessories
  }

  newItems.push(product);

  // Set lastAction
  set({
    items: newItems,
    lastAction: { type: "add", itemId: product.id },
  });

  // Auto reset animation after 600ms
  setTimeout(() => {
    const current = get().lastAction;
    if (current.itemId === product.id) {
      set({ lastAction: { type: null, itemId: null } });
    }
  }, 600);
},

  removeItem: (productId: string) => {
    set((state) => ({
      items: state.items.filter((i) => i.id !== productId),
      lastAction: { type: "remove", itemId: productId },
    }));
  },

  setDuration: (duration: Duration) => set({ duration }),

  setCategory: (category: CategoryId) => set({ activeCategory: category }),

  loadPreset: (presetId: string) => {
    const presetItems = getPresetProducts(presetId);
    if (presetItems.length === 0) return;
    set({
      items: presetItems,
      lastAction: { type: "preset", itemId: presetId },
    });
  },

  clearAll: () => set({ items: [], lastAction: { type: null, itemId: null } }),

  toggleCheckout: () => set((s) => ({ showCheckout: !s.showCheckout })),

  // ── Derived / Selectors ───────────────────────────

  isSelected: (productId: string) => get().items.some((i) => i.id === productId),

  getTotalMonthly: () => get().items.reduce((sum, i) => sum + i.pricePerMonth, 0),

  getDiscountedMonthly: () => {
    const total = get().getTotalMonthly();
    return Math.round(total * (1 - get().duration.discount / 100));
  },

  getItemsByCategory: (category: CategoryId) =>
    get().items.filter((i) => i.category === category),
}));

export const useWorkspaceItems = () => useWorkspaceStore((s) => s.items);
export const useWorkspaceDuration = () => useWorkspaceStore((s) => s.duration);
export const useActiveCategory = () => useWorkspaceStore((s) => s.activeCategory);
export const useLastAction = () => useWorkspaceStore((s) => s.lastAction);
export const useCheckoutOpen = () => useWorkspaceStore((s) => s.showCheckout);
