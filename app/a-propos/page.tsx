import type { Metadata } from "next";
import { User } from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { site, valeurs, equipe } from "@/lib/config/site";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "À propos — Union Vision Services",
  description:
    "Union Vision Services, fondée par Mouhamed Ndiaye à Yeumbeul : transparence, rigueur et accompagnement des étudiants sénégalais.",
  openGraph: {
    title: "À propos — Union Vision Services",
    description: "L'équipe et les valeurs derrière UVS Voyages et Les Élites du Bac.",
  },
};

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={`${site.legalName}, au service des étudiants de Yeumbeul et d'ailleurs`}
        subtitle="Une équipe de proximité, disponible et exigeante sur la qualité des dossiers."
      />

      {/* L'équipe */}
      <Section>
        <AnimatedSection>
          <SectionTitle eyebrow="L'équipe" title="Les personnes derrière UVS" />
        </AnimatedSection>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {equipe.map((m, idx) => (
            <AnimatedSection key={m.name} delay={idx * 0.1}>
              <div className="card-soft p-8">
                {m.image ? (
                  <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-accent shadow-md">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                    <User className="h-10 w-10 text-accent" aria-hidden="true" />
                  </div>
                )}
                <h3 className="mt-5 text-xl font-extrabold text-primary">{m.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{m.role}</p>
                <p className="mt-4 text-sm text-muted-foreground">{m.text}</p>
                {!m.image && (
                  <p className="mt-3 text-xs text-muted-foreground">Photo à ajouter prochainement.</p>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>

      {/* Notre agence physique */}
      <Section>
        <AnimatedSection>
          <SectionTitle
            eyebrow="Notre agence"
            title="Un bureau physique pour vous accueillir à Yeumbeul"
            subtitle="Venez échanger directement avec notre équipe sur votre projet d'études ou la préparation du Bac."
          />
        </AnimatedSection>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <AnimatedSection delay={0.1}>
            <div className="card-soft overflow-hidden p-0 border shadow-soft">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src="/images/agence/devanture-jour.png"
                  alt="Devanture de l'Institut UVS Études et Voyages"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">En journée</span>
                  <p className="text-lg font-bold">Façade principale</p>
                  <p className="text-xs text-white/80">Yeumbeul Sud, Afia 1, arrêt Fatou Laobé</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="card-soft overflow-hidden p-0 border shadow-soft">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                <img
                  src="/images/agence/devanture-nuit.png"
                  alt="Enseigne lumineuse de l'Institut UVS"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent">En soirée</span>
                  <p className="text-lg font-bold">Enseigne lumineuse UVS</p>
                  <p className="text-xs text-white/80">Repère facile sur l'artère principale</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Valeurs */}
      <Section muted>
        <AnimatedSection>
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui guide notre travail" />
        </AnimatedSection>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {valeurs.map((v, idx) => (
            <AnimatedSection key={v.title} delay={idx * 0.08}>
              <div className="card-soft p-7">
                <h3 className="text-lg font-bold text-primary">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Section>
    </>
  );
}
