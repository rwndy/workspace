"use client";
import { motion } from "framer-motion";
import type { Product } from "@/types/workspace";

interface DeskSVGProps {
  desk: Product;
  onRemove: () => void;
}

/** Renders an SVG desk with wood grain texture and shadow */
export function DeskSVG({ desk, onRemove }: DeskSVGProps) {
  const { color, accent } = desk.visual;
  const w = desk.visual.previewWidth;

  return (
    <motion.g
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onClick={onRemove}
      className="cursor-pointer"
      style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.12))" }}
    >
      {/* Desk surface */}
      <rect
        x={-w / 2}
        y={0}
        width={w}
        height={14}
        rx={5}
        fill={color}
      />
      {/* Wood grain lines */}
      <line x1={-w / 2 + 20} y1={4} x2={w / 2 - 20} y2={4} stroke="rgba(255,255,255,0.12)" strokeWidth={0.8} />
      <line x1={-w / 2 + 30} y1={8} x2={w / 2 - 30} y2={8} stroke="rgba(255,255,255,0.08)" strokeWidth={0.6} />
      <line x1={-w / 2 + 15} y1={11} x2={w / 2 - 15} y2={11} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />

      {/* Top edge highlight */}
      <rect
        x={-w / 2}
        y={0}
        width={w}
        height={2.5}
        rx={5}
        fill="rgba(255,255,255,0.15)"
      />

      {/* Left leg */}
      <rect x={-w / 2 + 14} y={14} width={5} height={42} rx={2} fill={accent} />
      <rect x={-w / 2 + 14} y={14} width={5} height={4} rx={1} fill="rgba(0,0,0,0.08)" />

      {/* Right leg */}
      <rect x={w / 2 - 19} y={14} width={5} height={42} rx={2} fill={accent} />
      <rect x={w / 2 - 19} y={14} width={5} height={4} rx={1} fill="rgba(0,0,0,0.08)" />

      {/* Cross bar (for standing desks) */}
      {desk.id.includes("standing") && (
        <rect x={-w / 2 + 19} y={38} width={w - 38} height={3} rx={1.5} fill={accent} opacity={0.7} />
      )}
    </motion.g>
  );
}

interface MonitorSVGProps {
  monitor: Product;
  onRemove: () => void;
}

/** Renders an SVG monitor with screen glow effect */
export function MonitorSVG({ monitor, onRemove }: MonitorSVGProps) {
  const isDual = monitor.id === "monitor-dual";
  const screenW = isDual ? 56 : 72;
  const gap = isDual ? 6 : 0;

  const renderScreen = (offsetX: number) => (
    <g transform={`translate(${offsetX}, 0)`}>
      {/* Bezel */}
      <rect x={-screenW / 2} y={-50} width={screenW} height={42} rx={3} fill="#1a1a1a" />
      {/* Screen */}
      <rect x={-screenW / 2 + 2} y={-48} width={screenW - 4} height={36} rx={2} fill="#0f1923" />
      {/* Screen glow */}
      <rect x={-screenW / 2 + 2} y={-48} width={screenW - 4} height={36} rx={2} fill="url(#screenGlow)" opacity={0.6} />
      {/* Code lines on screen */}
      <rect x={-screenW / 2 + 7} y={-43} width={22} height={1.5} rx={0.75} fill="#4ade80" opacity={0.5} />
      <rect x={-screenW / 2 + 7} y={-39} width={30} height={1.5} rx={0.75} fill="#60a5fa" opacity={0.4} />
      <rect x={-screenW / 2 + 12} y={-35} width={18} height={1.5} rx={0.75} fill="#c084fc" opacity={0.35} />
      <rect x={-screenW / 2 + 12} y={-31} width={24} height={1.5} rx={0.75} fill="#60a5fa" opacity={0.3} />
      <rect x={-screenW / 2 + 7} y={-27} width={16} height={1.5} rx={0.75} fill="#f472b6" opacity={0.3} />
      <rect x={-screenW / 2 + 7} y={-23} width={28} height={1.5} rx={0.75} fill="#4ade80" opacity={0.25} />
      {/* Stand neck */}
      <rect x={-3} y={-8} width={6} height={8} rx={1} fill="#2a2a2a" />
      {/* Stand base */}
      <ellipse cx={0} cy={1} rx={14} ry={3} fill="#222" />
    </g>
  );

  return (
    <motion.g
      initial={{ opacity: 0, y: -15, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 350, damping: 20, delay: 0.05 }}
      onClick={onRemove}
      className="cursor-pointer"
    >
      <defs>
        <linearGradient id="screenGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0a1628" />
        </linearGradient>
      </defs>
      {isDual ? (
        <>
          {renderScreen(-(screenW / 2 + gap / 2))}
          {renderScreen(screenW / 2 + gap / 2)}
        </>
      ) : (
        renderScreen(0)
      )}
    </motion.g>
  );
}

interface ChairSVGProps {
  chair: Product;
  onRemove: () => void;
}

/** Renders an SVG office chair */
export function ChairSVG({ chair, onRemove }: ChairSVGProps) {
  const isPremium = chair.id === "chair-premium";
  const isErgo = chair.id === "chair-ergo";
  const seatColor = isPremium ? "#1a1a1a" : isErgo ? "#2c2c2c" : "#444";

  return (
    <motion.g
      initial={{ opacity: 0, y: 25, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onClick={onRemove}
      className="cursor-pointer"
    >
      {/* Chair back */}
      <rect x={-22} y={-35} width={44} height={35} rx={6} fill={seatColor} />
      {isPremium && (
        <rect x={-22} y={-35} width={44} height={8} rx={6} fill="rgba(255,255,255,0.06)" />
      )}
      {isErgo && (
        <>
          {/* Mesh pattern */}
          <line x1={-16} y1={-28} x2={16} y2={-28} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
          <line x1={-16} y1={-20} x2={16} y2={-20} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
          <line x1={-16} y1={-12} x2={16} y2={-12} stroke="rgba(255,255,255,0.06)" strokeWidth={0.5} />
        </>
      )}
      {/* Headrest for premium */}
      {isPremium && (
        <rect x={-14} y={-46} width={28} height={10} rx={5} fill={seatColor} />
      )}
      {/* Seat */}
      <rect x={-24} y={0} width={48} height={8} rx={4} fill={seatColor} />
      <rect x={-24} y={0} width={48} height={3} rx={4} fill="rgba(255,255,255,0.05)" />
      {/* Armrests */}
      {(isPremium || isErgo) && (
        <>
          <rect x={-28} y={-8} width={4} height={14} rx={2} fill={seatColor} opacity={0.8} />
          <rect x={24} y={-8} width={4} height={14} rx={2} fill={seatColor} opacity={0.8} />
        </>
      )}
      {/* Cylinder */}
      <rect x={-3} y={8} width={6} height={14} rx={2} fill="#333" />
      {/* Base star */}
      <ellipse cx={0} cy={24} rx={22} ry={4} fill="#2a2a2a" />
      {/* Wheels */}
      {[-18, -9, 0, 9, 18].map((x) => (
        <circle key={x} cx={x} cy={27} r={2.5} fill="#222" />
      ))}
    </motion.g>
  );
}

interface AccessorySVGProps {
  accessory: Product;
  x: number;
  y: number;
  onRemove: () => void;
}

/** Renders small SVG accessory items */
export function AccessorySVG({ accessory, x, y, onRemove }: AccessorySVGProps) {
  const renderAccessory = () => {
    switch (accessory.id) {
      case "acc-lamp":
        return (
          <g>
            {/* Glow */}
            <circle cx={0} cy={-22} r={12} fill="#D4A853" opacity={0.08} />
            {/* Shade */}
            <path d="M-7,-28 L7,-28 L5,-16 L-5,-16 Z" fill="#D4A853" opacity={0.9} />
            {/* Arm */}
            <line x1={0} y1={-16} x2={0} y2={-2} stroke="#999" strokeWidth={1.5} />
            {/* Base */}
            <ellipse cx={0} cy={0} rx={7} ry={2.5} fill="#888" />
          </g>
        );
      case "acc-plant":
        return (
          <g>
            {/* Leaves */}
            <ellipse cx={-4} cy={-18} rx={6} ry={9} fill="#3A7550" transform="rotate(-15, -4, -18)" />
            <ellipse cx={5} cy={-16} rx={5} ry={8} fill="#2D5A3D" transform="rotate(12, 5, -16)" />
            <ellipse cx={0} cy={-20} rx={4} ry={7} fill="#4a8a62" transform="rotate(3, 0, -20)" />
            {/* Pot */}
            <path d="M-7,-6 L7,-6 L5,4 L-5,4 Z" fill="#C4654A" opacity={0.8} />
            <rect x={-7} y={-7} width={14} height={3} rx={1} fill="#C4654A" />
          </g>
        );
      case "acc-keyboard":
        return (
          <g>
            {/* Keyboard body */}
            <rect x={-24} y={-4} width={48} height={14} rx={3} fill="#ddd" />
            <rect x={-24} y={-4} width={48} height={3} rx={3} fill="rgba(255,255,255,0.4)" />
            {/* Key rows */}
            {[0, 4, 8].map((row) => (
              <g key={row}>
                {Array.from({ length: 10 }, (_, i) => (
                  <rect
                    key={i}
                    x={-21 + i * 4.4}
                    y={row}
                    width={3.5}
                    height={2.5}
                    rx={0.5}
                    fill="rgba(0,0,0,0.08)"
                  />
                ))}
              </g>
            ))}
            {/* Mouse */}
            <ellipse cx={35} cy={3} rx={6} ry={8} fill="#ddd" />
            <line x1={35} y1={-3} x2={35} y2={1} stroke="rgba(0,0,0,0.1)" strokeWidth={0.5} />
          </g>
        );
      case "acc-headset":
        return (
          <g>
            <path d="M-8,0 Q-10,-16 0,-18 Q10,-16 8,0" fill="none" stroke="#2C2C2C" strokeWidth={3} strokeLinecap="round" />
            <rect x={-11} y={-3} width={6} height={10} rx={3} fill="#2C2C2C" />
            <rect x={5} y={-3} width={6} height={10} rx={3} fill="#2C2C2C" />
            <rect x={-12} y={-1} width={8} height={6} rx={3} fill="#444" />
            <rect x={4} y={-1} width={8} height={6} rx={3} fill="#444" />
          </g>
        );
      case "acc-webcam":
        return (
          <g>
            <rect x={-8} y={-6} width={16} height={10} rx={3} fill="#333" />
            <circle cx={0} cy={-1} r={4} fill="#222" />
            <circle cx={0} cy={-1} r={2.5} fill="#0a1628" />
            <circle cx={0} cy={-1} r={1} fill="#1e3a5f" opacity={0.6} />
            <rect x={-3} y={4} width={6} height={3} rx={1} fill="#444" />
          </g>
        );
      case "acc-stand":
        return (
          <g>
            {/* Stand surface (angled) */}
            <path d="M-16,-8 L16,-8 L14,0 L-14,0 Z" fill="#bbb" />
            <path d="M-16,-8 L16,-8 L16,-6 L-16,-6 Z" fill="rgba(255,255,255,0.3)" />
            {/* Support */}
            <rect x={-4} y={0} width={8} height={6} rx={1} fill="#999" />
          </g>
        );
      default:
        return <circle cx={0} cy={0} r={8} fill="#ccc" />;
    }
  };

  return (
    <motion.g
      transform={`translate(${x}, ${y})`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 18, delay: 0.08 }}
      onClick={onRemove}
      className="cursor-pointer"
    >
      {renderAccessory()}
    </motion.g>
  );
}
