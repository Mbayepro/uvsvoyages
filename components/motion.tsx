"use client";

import {
  type ReactNode,
  type ComponentPropsWithoutRef,
  useRef,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  motion,
  useInView,
  useReducedMotion as useFramerReducedMotion,
  animate,
  type Variant,
} from "framer-motion";

/* ─────────────────────────────────────────────────
 * FadeIn — scroll-triggered fade + slide wrapper
 * ───────────────────────────────────────────────── */

type FadeDirection = "up" | "down" | "left" | "right" | "none";

const offsets: Record<FadeDirection, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

interface FadeInProps {
  children: ReactNode;
  /** Direction of the slide, default "up" */
  direction?: FadeDirection;
  /** Duration in seconds (0.3–0.6) */
  duration?: number;
  /** Delay in seconds */
  delay?: number;
  /** Root margin for trigger */
  viewportMargin?: string;
  /** CSS class forwarded to the wrapper div */
  className?: string;
  /** HTML tag: default "div" */
  as?: "div" | "section" | "li" | "article";
}

export function FadeIn({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  viewportMargin = "-60px",
  className,
  as = "div",
}: FadeInProps) {
  const prefersReduced = useFramerReducedMotion();
  const offset = offsets[direction];

  const hidden: Variant = prefersReduced
    ? { opacity: 1 }
    : { opacity: 0, x: offset.x, y: offset.y };

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration, delay, ease: [0.25, 0.1, 0.25, 1] },
  };

  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: viewportMargin }}
      className={className}
    >
      {children}
    </Component>
  );
}

/* ─────────────────────────────────────────────────
 * StaggerChildren — staggers FadeIn on children
 * ───────────────────────────────────────────────── */

interface StaggerProps {
  children: ReactNode;
  /** Stagger delay between children (seconds) */
  stagger?: number;
  className?: string;
}

export function StaggerChildren({
  children,
  stagger = 0.08,
  className,
}: StaggerProps) {
  const prefersReduced = useFramerReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: prefersReduced ? 0 : stagger },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** A child item inside StaggerChildren */
export function StaggerItem({
  children,
  className,
  direction = "up",
  duration = 0.4,
}: {
  children: ReactNode;
  className?: string;
  direction?: FadeDirection;
  duration?: number;
}) {
  const prefersReduced = useFramerReducedMotion();
  const offset = offsets[direction];

  return (
    <motion.div
      variants={
        prefersReduced
          ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
          : {
              hidden: { opacity: 0, x: offset.x, y: offset.y },
              visible: {
                opacity: 1,
                x: 0,
                y: 0,
                transition: {
                  duration,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────
 * AnimatedCounter — counts up once on scroll
 * ───────────────────────────────────────────────── */

interface AnimatedCounterProps {
  /** Target number */
  to: number;
  from?: number;
  /** Duration in seconds */
  duration?: number;
  /** Suffix appended after the number */
  suffix?: string;
  /** Prefix before the number */
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  to,
  from = 0,
  duration = 1.5,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const prefersReduced = useFramerReducedMotion();

  useEffect(() => {
    if (!inView || !nodeRef.current) return;

    if (prefersReduced) {
      nodeRef.current.textContent = prefix + to.toFixed(0) + suffix;
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent =
            prefix + value.toFixed(0) + suffix;
        }
      },
    });

    return () => controls.stop();
  }, [from, to, duration, inView, suffix, prefix, prefersReduced]);

  return (
    <span ref={nodeRef} className={className}>
      {prefix}
      {from}
      {suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────────
 * MotionButton — subtle hover/tap scale
 * ───────────────────────────────────────────────── */

type MotionAnchorProps = ComponentPropsWithoutRef<typeof motion.a>;
type MotionBtnProps = ComponentPropsWithoutRef<typeof motion.button>;

export function MotionLink({
  children,
  className,
  ...rest
}: MotionAnchorProps) {
  const prefersReduced = useFramerReducedMotion();

  return (
    <motion.a
      whileHover={prefersReduced ? undefined : { scale: 1.05 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

export function MotionButton({
  children,
  className,
  ...rest
}: MotionBtnProps) {
  const prefersReduced = useFramerReducedMotion();

  return (
    <motion.button
      whileHover={prefersReduced ? undefined : { scale: 1.05 }}
      whileTap={prefersReduced ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────────
 * PageTransition — wraps page content for fade-in
 * ───────────────────────────────────────────────── */

export function PageTransition({ children }: { children: ReactNode }) {
  const prefersReduced = useFramerReducedMotion();

  return (
    <motion.div
      initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
