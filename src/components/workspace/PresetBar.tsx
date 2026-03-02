"use client";
import { motion } from "framer-motion";
import { useWorkspaceStore, useWorkspaceItems } from "@/store/workspace-store";
import { PRESETS, getPresetTotal, getPresetProducts } from "@/data/products";

export function PresetBar() {
  const loadPreset = useWorkspaceStore((s) => s.loadPreset);
  const items = useWorkspaceItems();
  const selectedIds = items.map((i) => i.id);

  // Detect which preset is currently active
  const activePresetId = PRESETS.find((p) => {
    const presetProducts = getPresetProducts(p.id);
    return (
      presetProducts.length === items.length &&
      presetProducts.every((pp) => selectedIds.includes(pp.id))
    );
  })?.id;

  return (
    <div>
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-warm-gray mb-2.5">
        <span className="text-sm">⚡</span> Quick Start Presets
      </div>

      <div className="flex gap-2.5">
        {PRESETS.map((preset, i) => {
          const isActive = activePresetId === preset.id;
          const total = getPresetTotal(preset.id);

          return (
            <motion.button
              key={preset.id}
              onClick={() => loadPreset(preset.id)}
              whileHover={{ y: -3, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 300, damping: 25 }}
              className={`
                flex-1 min-w-0 p-3.5 rounded-xl text-center transition-all duration-200
                ${isActive
                  ? "bg-terracotta/[0.06] border-[1.5px] border-terracotta/40"
                  : "bg-warm-white border-[1.5px] border-black/[0.04] hover:border-light-gray hover:shadow-sm"
                }
              `}
            >
              <div className="text-2xl mb-1">{preset.emoji}</div>
              <div className="text-sm font-bold text-charcoal">{preset.name}</div>
              <div className="text-[11px] text-warm-gray mt-0.5">{preset.description}</div>
              <div className="font-mono text-[13px] font-semibold text-terracotta mt-1.5">
                ${total}/mo
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
