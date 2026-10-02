"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, animate, useReducedMotion } from "framer-motion";
import { site } from "@/lib/config/site";
import { GraduationCap, MapPin, BookOpen, Calendar } from "lucide-react";

function Counter({ from = 0, to, duration = 1.5, suffix = "" }: { from?: number, to: number, duration?: number, suffix?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!inView || !nodeRef.current) return;

    if (prefersReduced) {
      nodeRef.current.textContent = to.toFixed(0) + suffix;
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(value) {
        if (nodeRef.current) {
          nodeRef.current.textContent = value.toFixed(0) + suffix;
        }
      },
    });
    return () => controls.stop();
  }, [from, to, duration, inView, suffix, prefersReduced]);

  return <span ref={nodeRef}>{from}{suffix}</span>;
}

export function HomeStats() {
  const prefersReduced = useReducedMotion();

  const cardVariants = prefersReduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, scale: 0.92 },
        visible: { opacity: 1, scale: 1 },
      };

  return (
    <motion.div
      className="mt-12 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.1 } },
      }}
    >
      {/* Stat 1 */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md"
      >
        <GraduationCap className="mb-3 h-8 w-8 text-accent" />
        <p className="text-3xl font-extrabold text-white md:text-4xl">
          {site.successRate}
        </p>
        <p className="mt-2 text-xs font-medium text-white/80 md:text-sm">
          Réussite au Bac (C.R.E.M 2026)
        </p>
        {site.students && (
          <span className="mt-1 text-[10px] text-white/60">sur {site.students} élèves</span>
        )}
      </motion.div>

      {/* Stat 2 */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md"
      >
        <MapPin className="mb-3 h-8 w-8 text-accent" />
        <p className="text-3xl font-extrabold text-white md:text-4xl">
          <Counter to={site.countries.length} />
        </p>
        <p className="mt-2 text-xs font-medium text-white/80 md:text-sm">
          pays desservis
        </p>
      </motion.div>

      {/* Stat 3 */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md"
      >
        <BookOpen className="mb-3 h-8 w-8 text-accent" />
        <p className="text-3xl font-extrabold text-white md:text-4xl">
          <Counter to={6} />
        </p>
        <p className="mt-2 text-xs font-medium text-white/80 md:text-sm">
          matières de renforcement
        </p>
      </motion.div>

      {/* Stat 4 */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-col items-center rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md"
      >
        <Calendar className="mb-3 h-8 w-8 text-accent" />
        <p className="text-3xl font-extrabold text-white md:text-4xl">
          {site.since ?? "2021"}
        </p>
        <p className="mt-2 text-xs font-medium text-white/80 md:text-sm">
          Depuis — Les Élites du Bac
        </p>
      </motion.div>
    </motion.div>
  );
}
