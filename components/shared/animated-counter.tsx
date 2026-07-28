"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

type AnimatedCounterProps = {
  value: number;
  className?: string;
};

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // Avoid negative rootMargin — on short mobile viewports it often never fires.
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 1200,
    bounce: 0,
  });
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) {
      return;
    }

    hasAnimated.current = true;
    motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    if (hasAnimated.current) {
      motionValue.set(value);
    }
  }, [motionValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });
  }, [springValue]);

  // Fallback if IntersectionObserver never reports in-view (some mobile browsers).
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      if (!hasAnimated.current) {
        hasAnimated.current = true;
        motionValue.set(value);
        setDisplayValue(value);
      }
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [motionValue, value]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
