"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Smoothly animates between number values using cubic ease-out.
 * Used for the price ticker in the bottom bar.
 */
export function useAnimatedNumber(target: number, duration = 450): number {
  const [display, setDisplay] = useState(target);
  const animRef = useRef<number | null>(null);
  const startValueRef = useRef(target);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (animRef.current !== null) cancelAnimationFrame(animRef.current);

    startValueRef.current = display;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;

      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out

      const current = startValueRef.current + (target - startValueRef.current) * eased;
      setDisplay(Math.round(current));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
}
