import type { Metadata } from "next";
import { User, ShieldCheck, FileText, Building2, CheckCircle2 } from "lucide-react";
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

      {/* Statut légal & Transparence */}
      <Section muted id="conformite">
        <AnimatedSection>
          <SectionTitle
            eyebrow="Transparence & Statut Légal"
            title="Une structure reconnue et formellement enregistrée"
            subtitle="Chez Union Vision Services, nous accordons une importance primordiale à la légalité et à la traçabilité. Chaque étudiant et parent bénéficie de garanties claires et de reçus officiels."
          />
        </AnimatedSection>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <AnimatedSection delay={0.1}>
            <div className="card-soft h-full p-6 border-l-4 border-l-accent flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Numéro Fiscal & Statistique</span>
                    <h3 className="text-lg font-extrabold text-primary">N.I.N.E.A</h3>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-background p-3 font-mono text-sm font-bold text-primary shadow-xs">
                  {site.ninea}
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Attribué par l&apos;Agence Nationale de la Statistique et de la Démographie (ANSD) de la République du Sénégal.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> Immatriculation officielle
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="card-soft h-full p-6 border-l-4 border-l-accent flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <FileText className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Registre du Commerce</span>
                    <h3 className="text-lg font-extrabold text-primary">R.C.C.M</h3>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-background p-3 font-mono text-sm font-bold text-primary shadow-xs">
                  {site.rccm}
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Enregistré au Greffe du Tribunal de Commerce Hors Classe de Dakar.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> Registre actif et conforme
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="card-soft h-full p-6 border-l-4 border-l-accent flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Building2 className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Établissement & Siège</span>
                    <h3 className="text-lg font-extrabold text-primary">Agence Physique</h3>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-background p-3 text-xs font-semibold text-primary shadow-xs">
                  {site.address}
                </div>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Dénomination : <strong>{site.legalName} (U.V.S)</strong>. Accueil sur place et délivrance systématique de reçus officiels pour chaque versement.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> Reçus officiels délivrés
              </div>
            </div>
          </AnimatedSection>
        </div>
      </Section>

      {/* Valeurs */}
      <Section>
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
