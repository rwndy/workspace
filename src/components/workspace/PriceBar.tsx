"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore, useWorkspaceItems, useWorkspaceDuration } from "@/store/workspace-store";
import { useAnimatedNumber } from "@/hooks/use-animated-number";

export function PriceBar() {
  const items = useWorkspaceItems();
  const duration = useWorkspaceDuration();
  const toggleCheckout = useWorkspaceStore((s) => s.toggleCheckout);
  const getTotalMonthly = useWorkspaceStore((s) => s.getTotalMonthly);
  const getDiscountedMonthly = useWorkspaceStore((s) => s.getDiscountedMonthly);

  const totalMonthly = getTotalMonthly();
  const discountedMonthly = getDiscountedMonthly();
  const animatedTotal = useAnimatedNumber(discountedMonthly);
  const hasItems = items.length > 0;
  const hasDiscount = duration.discount > 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-warm-white/92 backdrop-blur-2xl border-t border-black/[0.06]">
      <div className="max-w-[1240px] mx-auto px-5 py-3.5 flex items-center justify-between gap-4 flex-wrap">
        {/* Price info */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <AnimatePresence mode="wait">
            {hasItems ? (
              <motion.div
                key="price"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex items-baseline gap-2 flex-wrap"
              >
                <span className="font-mono text-[32px] font-extrabold text-charcoal leading-none tracking-tighter">
                  ${animatedTotal}
                </span>
                <span className="text-sm text-warm-gray">/month</span>

                {hasDiscount && (
                  <>
                    <span className="text-sm text-warm-gray/50 line-through">
                      ${totalMonthly}
                    </span>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-xs font-bold text-forest bg-forest/[0.08] px-2 py-0.5 rounded-md"
                    >
                      −{duration.discount}%
                    </motion.span>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.span
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm text-warm-gray"
              >
                Add items to start building your workspace
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => hasItems && toggleCheckout()}
          disabled={!hasItems}
          whileHover={hasItems ? { y: -2, scale: 1.02 } : {}}
          whileTap={hasItems ? { scale: 0.98 } : {}}
          className={`
            px-8 py-3.5 rounded-xl text-base font-bold whitespace-nowrap transition-all duration-300
            ${hasItems
              ? "bg-gradient-to-br from-terracotta to-terracotta-light text-white shadow-lg shadow-terracotta/25 hover:shadow-xl hover:shadow-terracotta/30 cursor-pointer"
              : "bg-light-gray text-warm-gray cursor-default"
            }
            ${items.length >= 3 ? "animate-pulse-soft" : ""}
          `}
        >
          {!hasItems
            ? "Rent This Setup"
            : `Rent ${items.length} Item${items.length !== 1 ? "s" : ""} →`}
        </motion.button>
      </div>
    </div>
  );
}
