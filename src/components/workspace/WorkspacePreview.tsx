"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useWorkspaceStore, useWorkspaceItems, useLastAction } from "@/store/workspace-store";
import { DeskSVG, MonitorSVG, ChairSVG, AccessorySVG } from "./FurnitureSVG";

export function WorkspacePreview() {
  const items = useWorkspaceItems();
  const lastAction = useLastAction();
  const removeItem = useWorkspaceStore((s) => s.removeItem);

  const desk = items.find((i) => i.category === "desks");
  const chair = items.find((i) => i.category === "chairs");
  const monitor = items.find((i) => i.category === "monitors");
  const accessories = items.filter((i) => i.category === "accessories");
  const isEmpty = items.length === 0;

  // Calculate accessory positions spread across the desk
  const getAccessoryPositions = () => {
    const positions: { x: number; y: number }[] = [];
    const deskW = desk ? desk.visual.previewWidth : 180;
    const halfW = deskW / 2;

    accessories.forEach((acc, i) => {
      // Place items at different positions on/around the desk
      const placements = [
        { x: halfW - 20, y: -8 },   // right side of desk
        { x: -halfW + 20, y: -8 },  // left side of desk
        { x: halfW - 50, y: -6 },   // center-right
        { x: -halfW + 50, y: -6 },  // center-left
        { x: 0, y: -8 },             // center
        { x: halfW + 5, y: -8 },    // far right
      ];
      positions.push(placements[i % placements.length]);
    });

    return positions;
  };

  const accessoryPositions = getAccessoryPositions();

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-black/[0.05] bg-gradient-to-b from-cream to-sand">
      {/* Aspect ratio container */}
      <div className="relative" style={{ paddingBottom: "62%" }}>
        <svg
          viewBox="-200 -160 400 260"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background elements */}
          <defs>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F9F6F0" />
              <stop offset="100%" stopColor="#F5F0E8" />
            </linearGradient>
            <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#EDE6D8" />
              <stop offset="100%" stopColor="#E5DDD0" />
            </linearGradient>
          </defs>

          {/* Wall */}
          <rect x={-200} y={-160} width={400} height={210} fill="url(#wallGrad)" />

          {/* Floor */}
          <rect x={-200} y={50} width={400} height={60} fill="url(#floorGrad)" />
          <line x1={-200} y1={50} x2={200} y2={50} stroke="rgba(180,165,140,0.25)" strokeWidth={0.5} />

          {/* Wall decorations */}
          {/* Floating shelf */}
          <rect x={-130} y={-120} width={50} height={3} rx={1.5} fill="#C4654A" opacity={0.18} />
          {/* Small plant on shelf */}
          <circle cx={-115} cy={-125} r={4} fill="#3A7550" opacity={0.15} />
          <rect x={-117} y={-121} width={4} height={3} rx={1} fill="#C4654A" opacity={0.12} />

          {/* Window */}
          <g transform="translate(120, -110)">
            <rect x={-25} y={-20} width={50} height={50} rx={3} fill="none" stroke="rgba(180,165,140,0.25)" strokeWidth={1.5} />
            <line x1={0} y1={-20} x2={0} y2={30} stroke="rgba(180,165,140,0.2)" strokeWidth={0.8} />
            <line x1={-25} y1={5} x2={25} y2={5} stroke="rgba(180,165,140,0.2)" strokeWidth={0.8} />
            {/* Sky gradient in window */}
            <rect x={-24} y={-19} width={48} height={48} rx={2} fill="rgba(135,206,235,0.08)" />
          </g>

          {/* Wall art */}
          <rect x={-30} y={-130} width={60} height={40} rx={3} fill="none" stroke="rgba(196,101,74,0.12)" strokeWidth={1} />
          <circle cx={0} cy={-110} r={10} fill="rgba(196,101,74,0.06)" />

          <AnimatePresence mode="popLayout">
            {/* CHAIR (rendered first = behind everything) */}
            {chair && (
              <g key={chair.id} transform="translate(0, 55)">
                <ChairSVG chair={chair} onRemove={() => removeItem(chair.id)} />
              </g>
            )}

            {/* DESK */}
            {desk && (
              <g key={desk.id} transform="translate(0, 22)">
                <DeskSVG desk={desk} onRemove={() => removeItem(desk.id)} />

                {/* MONITOR on desk */}
                <AnimatePresence>
                  {monitor && (
                    <g key={monitor.id} transform="translate(0, -4)">
                      <MonitorSVG monitor={monitor} onRemove={() => removeItem(monitor.id)} />
                    </g>
                  )}
                </AnimatePresence>

                {/* ACCESSORIES on desk */}
                <AnimatePresence>
                  {accessories.map((acc, i) => {
                    const pos = accessoryPositions[i];
                    if (!pos) return null;
                    return (
                      <AccessorySVG
                        key={acc.id}
                        accessory={acc}
                        x={pos.x}
                        y={pos.y}
                        onRemove={() => removeItem(acc.id)}
                      />
                    );
                  })}
                </AnimatePresence>
              </g>
            )}

            {/* Items without a desk */}
            {!desk && items.length > 0 && (
              <g key="no-desk-items" transform="translate(0, 20)">
                {items.map((item, i) => (
                  <motion.text
                    key={item.id}
                    x={-20 + i * 28}
                    y={0}
                    fontSize="28"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    {item.emoji}
                  </motion.text>
                ))}
                <text x={0} y={30} textAnchor="middle" fill="#6B6560" fontSize="11" fontFamily="DM Sans">
                  Add a desk to see your full setup
                </text>
              </g>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {isEmpty && (
            <g transform="translate(0, -30)">
              <motion.text
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                x={0}
                y={0}
                textAnchor="middle"
                fontSize="42"
                className="animate-float"
              >
                🏝️
              </motion.text>
              <text x={0} y={40} textAnchor="middle" fill="#2C2C2C" fontSize="15" fontWeight="600" fontFamily="DM Sans">
                Your workspace awaits
              </text>
              <text x={0} y={58} textAnchor="middle" fill="#6B6560" fontSize="12" fontFamily="DM Sans">
                Pick a desk to start, or try a preset below
              </text>
            </g>
          )}
        </svg>

        {/* Item count badge */}
        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-charcoal"
            >
              <span className="text-sm">✨</span>
              {items.length} item{items.length !== 1 ? "s" : ""} in your workspace
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click to remove hint */}
        <AnimatePresence>
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1 }}
              className="absolute bottom-3 right-3 text-[10px] text-warm-gray/60 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-md"
            >
              Click items to remove
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
