import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Plane, ArrowRight, Quote, ShieldCheck, Calculator } from "lucide-react";
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
  let testimonialsList: any[] = [];
  try {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("created_at", { ascending: false });
    if (data && data.length > 0) {
      testimonialsList = data;
    }
  } catch (e) {
    // silence
  }

  // Si pas de témoignages en BDD, on fournit des témoignages concrets de nos bacheliers et admis Campus France
  if (testimonialsList.length === 0) {
    testimonialsList = [
      {
        id: "1",
        name: "Abdoulaye Diallo",
        country: "France",
        badge: "Campus France",
        text: "J'ai obtenu mon visa pour l'Université de Lille en Licence Informatique grâce au suivi minutieux de Mouhamed et de l'équipe UVS à Yeumbeul. Aucune surprise sur les frais et une vraie préparation pour l'entretien consulaire.",
      },
      {
        id: "2",
        name: "Fatou Bintou Seck",
        country: "Belgique",
        badge: "Campus France",
        text: "Procédure d'admission et visa étudiant pour Bruxelles validés sans encombre ! L'équipe est toujours disponible sur place à l'agence et répond à toutes les questions de la famille.",
      },
      {
        id: "3",
        name: "Mamadou Lamine Fall",
        country: "Sénégal",
        badge: "Les Élites du Bac",
        text: "Inscrit aux cours de renforcement en Terminale S2 aux Élites du Bac à Yeumbeul : mention Bien obtenue au Bac ! Les profs sont rigoureux et les fiches d'exercices font toute la différence.",
      },
      {
        id: "4",
        name: "Aïssatou Sow",
        country: "Canada",
        badge: "Permis d'études",
        text: "Accompagnement rigoureux pour ma demande de permis d'études pour le Québec. Dossier financier et lettre explicative impeccables, visa accordé du premier coup !",
      },
    ];
  }

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

      {/* Bandeau Réassurance & Légalité */}
      <div className="border-b border-border/50 bg-muted/40 py-3.5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 text-xs">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>Structure déclarée & reconnue par l&apos;État du Sénégal</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
            <span className="font-mono font-medium text-foreground">{site.ninea}</span>
            <span className="hidden sm:inline text-muted-foreground/40">·</span>
            <span className="font-mono font-medium text-foreground">{site.rccm}</span>
            <span className="hidden md:inline text-muted-foreground/40">·</span>
            <Link
              href="/a-propos#conformite"
              className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
            >
              En savoir plus <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

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

      {/* Simulateur de budget — Teaser */}
      <Section muted>
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-card via-background to-accent/5 p-8 md:p-12 shadow-soft">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
                  <Calculator className="h-3.5 w-3.5" />
                  Nouveau & Gratuit
                </span>
                <h2 className="mt-3 text-2xl font-black text-primary md:text-3xl">
                  Combien coûte réellement un départ à l&apos;étranger ?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Frais d&apos;agence, caution bancaire (AVI), frais de visa, scolarité, billet d&apos;avion et logement : estimez votre budget global en toute transparence pour la France, la Belgique ou le Canada.
                </p>
              </div>
              <Link
                href="/uvs-voyages#simulateur"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-accent-foreground shadow-strong transition-transform hover:scale-105 active:scale-95"
              >
                Calculer mon budget <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </Section>

      {/* Témoignages */}
      <HomeTestimonials testimonials={testimonialsList} />

      {/* CTA final */}
      <Section>
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
