"use client";

import Link from "next/link";
import Image from "next/image";
import { GraduationCap, Plane, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/config/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function HomeCards() {
  const uvsVoyagesPrice = "60 000 FCFA";
  const elitesBacPrice = "10 000 FCFA";
  const prefersReduced = useReducedMotion();

  const messageUvs = encodeURIComponent("Bonjour, j'aimerais avoir plus d'informations sur l'accompagnement UVS Voyages.");
  const messageElites = encodeURIComponent("Bonjour, j'aimerais avoir plus d'informations sur les cours de renforcement Les Élites du Bac.");

  const cardVariants = prefersReduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      className="grid gap-8 md:grid-cols-2"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: prefersReduced ? 0 : 0.12 } },
      }}
    >
      {/* Carte UVS Voyages */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={prefersReduced ? undefined : { y: -5 }}
        whileTap={prefersReduced ? undefined : { scale: 0.985 }}
        className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all hover:shadow-strong"
      >
        <div className="relative h-48 w-full overflow-hidden sm:h-56">
          <Image
            src="/uvs-voyages.jpeg"
            alt="UVS Voyages - Études à l'étranger"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-full bg-accent p-3 text-accent-foreground shadow-md">
            <Plane className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-primary">UVS Voyages</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Procédure Campus France de bout en bout : dossier, choix des formations, lettres de
            motivation, entretien, demande de visa et préparation au départ.
          </p>
          <ul className="mt-4 flex-1 space-y-2 text-sm font-medium text-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              France · Belgique · Canada
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Suivi personnalisé et rigoureux
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Assistance visa et départ
            </li>
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">À partir de</p>
              <p className="text-lg font-extrabold text-primary">{uvsVoyagesPrice}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <motion.a
                href={`${site.whatsapp}?text=${messageUvs}`}
                target="_blank"
                rel="noreferrer"
                whileHover={prefersReduced ? undefined : { scale: 1.1 }}
                whileTap={prefersReduced ? undefined : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:font-bold sm:text-sm"
                title="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">WhatsApp</span>
              </motion.a>
              <Link
                href="/uvs-voyages"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
              >
                Découvrir
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Carte Les Élites du Bac */}
      <motion.div
        variants={cardVariants}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={prefersReduced ? undefined : { y: -5 }}
        whileTap={prefersReduced ? undefined : { scale: 0.985 }}
        className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition-all hover:shadow-strong"
      >
        <div className="relative h-48 w-full overflow-hidden sm:h-56">
          <Image
            src="/uvs-elites.jpeg"
            alt="Les Élites du Bac"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-full bg-accent p-3 text-accent-foreground shadow-md">
            <GraduationCap className="h-6 w-6" aria-hidden="true" />
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold text-primary">Les Élites du Bac</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Cours de renforcement pour les élèves de Terminale, en présentiel à Yeumbeul et en
            ligne : mathématiques, français, philosophie et plus.
          </p>
          <ul className="mt-4 flex-1 space-y-2 text-sm font-medium text-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Cours de vacances
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Cours en ligne
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Fascicules de révision
            </li>
          </ul>
          <div className="mt-6 flex items-center justify-between border-t border-border pt-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">À partir de</p>
              <p className="text-lg font-extrabold text-primary">{elitesBacPrice}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <motion.a
                href={`${site.whatsapp}?text=${messageElites}`}
                target="_blank"
                rel="noreferrer"
                whileHover={prefersReduced ? undefined : { scale: 1.1 }}
                whileTap={prefersReduced ? undefined : { scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-white sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:font-bold sm:text-sm"
                title="WhatsApp"
              >
                <WhatsAppIcon className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">WhatsApp</span>
              </motion.a>
              <Link
                href="/elites-du-bac"
                className="inline-flex h-10 items-center justify-center rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20"
              >
                Découvrir
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
