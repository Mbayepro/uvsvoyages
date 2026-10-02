import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Plane, ArrowRight, Quote } from "lucide-react";
import { Section, SectionTitle } from "@/components/Section";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/config/site";
import { HomeCards } from "@/components/HomeCards";
import { HomeStats } from "@/components/HomeStats";
import { HomeTestimonials } from "@/components/HomeTestimonials";
import { AnimatedSection } from "@/components/AnimatedSection";
import { supabase } from "@/lib/supabase";

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
export default async function HomePage() {
  const { data: testimonials } = await supabase
    .from("temoignages")
    .select("*")
    .eq("publie", true);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 py-20 md:py-28">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">
              {site.slogan}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Partir étudier à l&apos;étranger, ou réussir son Bac. Avec un vrai accompagnement.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.16}>
            <p className="mt-6 max-w-2xl text-base opacity-85 md:text-lg">
              {site.legalName} accompagne les étudiants de Yeumbeul et de tout le Sénégal dans leur
              procédure Campus France, et prépare les élèves de Terminale aux épreuves du
              Baccalauréat.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.24}>
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
          </AnimatedSection>
        </div>
      </section>

      {/* Deux pôles */}
      <Section>
        <HomeCards />
      </Section>

      {/* Chiffres */}
      <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <SectionTitle
              center
              inverse
              eyebrow="En chiffres"
              title="Un accompagnement sérieux, des résultats concrets"
            />
          </AnimatedSection>
          <HomeStats />
        </div>
      </section>

      {/* Témoignages */}
      <HomeTestimonials testimonials={testimonials || []} />

      {/* CTA final */}
      <Section muted>
        <AnimatedSection>
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
        </AnimatedSection>
      </Section>
    </>
  );
}
