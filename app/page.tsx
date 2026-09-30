import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Plane, ArrowRight, Quote } from "lucide-react";
import { Section, SectionTitle } from "@/components/Section";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site, temoignages } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Campus France & Élites du Bac | Yeumbeul",
  description:
    "Union Vision Services accompagne les étudiants sénégalais vers la France, la Belgique et le Canada, et prépare les élèves de Terminale au Baccalauréat.",
  openGraph: {
    title: "UVS Voyages — Voyager · Étudier · Réussir",
    description:
      "Accompagnement Campus France et cours de renforcement pour la Terminale à Yeumbeul, Sénégal.",
  },
};

/**
 * Page d'accueil — Server Component.
 * Aucune interactivité directe sur cette page, les composants fils
 * interactifs (SimpleForm) sont Client Components.
 */
export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <p className="reveal text-xs font-bold uppercase tracking-[0.25em] text-accent">
            {site.slogan}
          </p>
          <h1 className="reveal mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
            Partir étudier à l&apos;étranger, ou réussir son Bac. Avec un vrai accompagnement.
          </h1>
          <p className="reveal mt-6 max-w-2xl text-base opacity-85 md:text-lg">
            {site.legalName} accompagne les étudiants de Yeumbeul et de tout le Sénégal dans leur
            procédure Campus France, et prépare les élèves de Terminale aux épreuves du
            Baccalauréat.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/uvs-voyages"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-strong transition-transform hover:scale-105"
            >
              Étudier à l&apos;étranger <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/elites-du-bac"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-bold transition-colors hover:bg-primary-foreground/10"
            >
              Réussir son Bac
            </Link>
          </div>
        </div>
      </section>

      {/* Deux pôles */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card-soft p-8">
            <Plane className="h-10 w-10 text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-extrabold text-primary">UVS Voyages</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Procédure Campus France de bout en bout : dossier, choix des formations, lettres de
              motivation, entretien, demande de visa et préparation au départ. France, Belgique et
              Canada.
            </p>
            <Link
              href="/uvs-voyages"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Découvrir la procédure <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="card-soft p-8">
            <GraduationCap className="h-10 w-10 text-accent" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-extrabold text-primary">Les Élites du Bac</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Cours de renforcement pour les élèves de Terminale, en présentiel à Yeumbeul et en
              ligne : mathématiques, français, philosophie, histoire-géographie, anglais et
              économie.
            </p>
            <Link
              href="/elites-du-bac"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              Voir les formules <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Section>

      {/* Chiffres */}
      <Section muted>
        <SectionTitle
          center
          eyebrow="En chiffres"
          title="Un accompagnement sérieux, des résultats concrets"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="card-soft p-8 text-center">
            <p className="text-4xl font-extrabold text-primary">{site.successRate}</p>
            <p className="mt-2 text-sm text-muted-foreground">de réussite constatée</p>
          </div>
          <div className="card-soft p-8 text-center">
            <p className="text-4xl font-extrabold text-primary">3</p>
            <p className="mt-2 text-sm text-muted-foreground">
              pays desservis : {site.countries.join(", ")}
            </p>
          </div>
          <div className="card-soft p-8 text-center">
            <p className="text-4xl font-extrabold text-primary">6</p>
            <p className="mt-2 text-sm text-muted-foreground">matières de renforcement</p>
          </div>
        </div>
      </Section>

      {/* Témoignages (3 aperçus) */}
      <Section>
        <SectionTitle eyebrow="Témoignages" title="Ils nous ont fait confiance" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {temoignages.slice(0, 3).map((t) => (
            <div key={t.name} className="card-soft p-7">
              <Quote className="h-7 w-7 text-accent" aria-hidden="true" />
              <p className="mt-4 text-sm leading-relaxed text-foreground">{t.text}</p>
              <p className="mt-5 text-sm font-bold text-primary">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.country}</p>
            </div>
          ))}
        </div>
        <Link
          href="/temoignages"
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          Voir tous les témoignages <ArrowRight className="h-4 w-4" />
        </Link>
      </Section>

      {/* CTA final */}
      <Section muted>
        <div className="rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-16">
          <h2 className="text-3xl font-extrabold md:text-4xl">Parlons de votre projet</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm opacity-85 md:text-base">
            Un échange gratuit pour faire le point sur votre dossier ou sur la préparation de votre
            Baccalauréat.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
            >
              <WhatsAppIcon className="h-4 w-4" /> Écrire sur WhatsApp
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-bold"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
