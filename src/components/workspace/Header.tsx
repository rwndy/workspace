"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore, useWorkspaceItems } from "@/store/workspace-store";

export function Header() {
  const items = useWorkspaceItems();
  const clearAll = useWorkspaceStore((s) => s.clearAll);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-warm-white/85 border-b border-black/[0.04]">
      <div className="max-w-[1240px] mx-auto px-5 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-terracotta to-terracotta-light flex items-center justify-center text-white font-extrabold text-lg leading-none">
            m
          </div>
          <div>
            <div className="text-[15px] font-extrabold leading-tight tracking-tight text-charcoal">
              monis.rent
            </div>
            <div className="text-[11px] text-warm-gray leading-tight">
              Workspace Builder
            </div>
          </div>
        </div>

        {/* Actions */}
        <AnimatePresence>
          {items.length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              onClick={clearAll}
              className="px-3.5 py-1.5 rounded-lg border border-black/[0.08] bg-transparent text-warm-gray text-xs font-medium hover:bg-black/[0.02] hover:border-black/[0.12] transition-all active:scale-95"
            >
              Start over
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
