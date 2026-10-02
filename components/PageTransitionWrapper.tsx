"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * PageTransitionWrapper — provides a smooth fade-in on page load.
 * Used in the root layout to animate page content entrance.
 */
export function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
