"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore, useActiveCategory, useWorkspaceItems } from "@/store/workspace-store";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";
import type { CategoryId } from "@/types/workspace";

export function ProductCatalog() {
  const activeCategory = useActiveCategory();
  const setCategory = useWorkspaceStore((s) => s.setCategory);
  const items = useWorkspaceItems();

  const currentCategory = CATEGORIES.find((c) => c.id === activeCategory);
  const products = PRODUCTS[activeCategory] || [];

  return (
    <div className="flex flex-col gap-4">
      {/* Category Tabs */}
      <div className="flex gap-1 bg-warm-white p-1 rounded-xl border border-black/[0.04]">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const countInCategory = items.filter((i) => i.category === cat.id).length;

          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id as CategoryId)}
              className={`
                relative flex-1 py-2.5 px-2 rounded-[10px] text-[13px] font-medium transition-all duration-200
                ${isActive
                  ? "bg-white text-charcoal font-bold shadow-sm"
                  : "bg-transparent text-warm-gray hover:bg-black/[0.02]"
                }
              `}
            >
              <span className="block text-[15px] mb-0.5">{cat.icon}</span>
              {cat.label}

              {/* Count badge */}
              {countInCategory > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-1 right-1 w-4 h-4 rounded-full bg-terracotta text-white text-[10px] font-bold flex items-center justify-center"
                >
                  {countInCategory}
                </motion.span>
              )}
            </button>
          );
        })}
      </div>

      {/* Product List */}
      <div className="bg-warm-white rounded-2xl p-2 border border-black/[0.04] max-h-[480px] overflow-y-auto custom-scrollbar">
        {/* Category description */}
        <div className="px-3 pt-1.5 pb-1 text-[11px] text-warm-gray font-medium">
          {currentCategory?.description}
        </div>

        {/* Products */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-1"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-3 p-3.5 bg-white/60 rounded-xl border border-black/[0.03]">
        <span className="text-3xl">🌴</span>
        <div>
          <div className="text-[13px] font-semibold text-charcoal leading-snug">
            127 nomads using monis this month
          </div>
          <div className="text-[11px] text-warm-gray leading-snug mt-0.5">
            Free delivery anywhere in Bali · Cancel anytime
          </div>
        </div>
      </div>
    </div>
  );
}
