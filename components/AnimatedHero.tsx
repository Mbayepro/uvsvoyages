"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * AnimatedPageHero — scroll-triggered animation for the page hero area.
 * A Client Component that wraps the PageHero's inner content.
 */
export function AnimatedPageHero({ children }: { children: ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : 0.08,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedHeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={
        prefersReduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
              },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
