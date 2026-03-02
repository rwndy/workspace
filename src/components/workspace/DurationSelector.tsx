"use client";
import { motion } from "framer-motion";
import { useWorkspaceStore, useWorkspaceDuration } from "@/store/workspace-store";
import { DURATIONS } from "@/data/products";

export function DurationSelector() {
  const duration = useWorkspaceDuration();
  const setDuration = useWorkspaceStore((s) => s.setDuration);

  return (
    <div>
      <div className="flex items-center gap-1.5 text-[13px] font-semibold text-warm-gray mb-2.5">
        <span className="text-sm">📅</span> Rental Duration
      </div>

      <div className="flex gap-1.5">
        {DURATIONS.map((d) => {
          const isActive = d.months === duration.months;

          return (
            <motion.button
              key={d.months}
              onClick={() => setDuration(d)}
              whileTap={{ scale: 0.96 }}
              className={`
                relative flex-1 py-2.5 px-2 rounded-[10px] transition-all duration-200 overflow-hidden
                ${isActive
                  ? "bg-gradient-to-br from-terracotta to-terracotta-light text-white border-[1.5px] border-terracotta shadow-md"
                  : "bg-warm-white text-charcoal border-[1.5px] border-black/[0.04] hover:border-light-gray"
                }
              `}
            >
              <div className="text-[13px] font-bold">{d.label}</div>

              {d.discount > 0 && (
                <div
                  className={`
                    text-[10px] font-semibold mt-1 inline-block px-1.5 py-0.5 rounded
                    ${isActive
                      ? "bg-white/20 text-white"
                      : "bg-forest/[0.08] text-forest"
                    }
                  `}
                >
                  Save {d.discount}%
                </div>
              )}

              {d.tag && isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-0.5 -right-0.5 text-[8px] font-bold bg-white text-terracotta px-1.5 py-0.5 rounded-bl-md rounded-tr-[9px]"
                >
                  {d.tag}
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
