export type CategoryId = "desks" | "chairs" | "monitors" | "accessories";

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  description: string;
  /** single = one item allowed (desks, chairs, monitors), multiple = stack (accessories) */
  selectionMode: "single" | "multiple";
}

export interface ProductVisual {
  illustration: string;
  previewWidth: number;
  previewHeight: number;
  color: string;
  accent: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: CategoryId;
  pricePerMonth: number;
  emoji: string;
  popular?: boolean;
  visual: ProductVisual;
  features?: string[];
}

export interface Duration {
  months: number;
  label: string;
  discount: number;
  tag?: string;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  emoji: string;
  itemIds: string[];
}

export interface WorkspaceState {
  items: Product[];
  duration: Duration;
  activeCategory: CategoryId;
  showCheckout: boolean;
  lastAction: {
    type: "add" | "remove" | "preset" | null;
    itemId: string | null;
  };
}

export interface WorkspaceActions {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setDuration: (duration: Duration) => void;
  setCategory: (category: CategoryId) => void;
  loadPreset: (presetId: string) => void;
  clearAll: () => void;
  toggleCheckout: () => void;
  isSelected: (productId: string) => boolean;
  getTotalMonthly: () => number;
  getDiscountedMonthly: () => number;
  getItemsByCategory: (category: CategoryId) => Product[];
}

export type WorkspaceStore = WorkspaceState & WorkspaceActions;
