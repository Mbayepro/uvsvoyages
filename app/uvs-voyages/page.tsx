import type { Metadata } from "next";
import {
  Check,
  Clock,
  CreditCard,
  Banknote,
  AlertCircle,
  ShieldCheck,
  FileText,
  Plane,
  Phone,
} from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { SimpleForm, Field, SelectField } from "@/components/SimpleForm";
import { Accordion } from "@/components/Accordion";
import { ProfileTabs } from "@/components/ProfileTabs";
import { ServicesCarousel } from "@/components/ServicesCarousel";
import { AnimatedSection } from "@/components/AnimatedSection";
import {
  piecesParProfil,
  site,
  visaDocuments,
  voyagesFaq,
  voyagesServices,
  voyagesSteps,
  voyagesTarifs,
} from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Accompagnement Campus France",
  description:
    "Procédure Campus France pas à pas : services, étapes, tarifs, pièces à fournir et dossier de visa pour la France, la Belgique et le Canada.",
  openGraph: {
    title: "UVS Voyages — Accompagnement Campus France",
    description: "Étapes, tarifs et pièces à fournir pour votre procédure Campus France.",
  },
};

const stepIcons = [Clock, FileText, FileText, Phone, CreditCard, Plane];

const visaIcons: Record<string, React.ElementType> = {
  obligatoires: ShieldCheck,
  recommandes: AlertCircle,
  facultatifs: FileText,
};

export default function UvsVoyagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Campus France"
        title="Votre procédure d'études à l'étranger, encadrée du début à la fin"
        subtitle="France, Belgique, Canada. Un dossier complet et cohérent est la meilleure façon de mettre toutes les chances de votre côté."
      />

      {/* Services */}
      <Section>
        <AnimatedSection>
          <SectionTitle
            eyebrow="Nos services"
            title="Ce que nous prenons en charge"
            subtitle="De l'ouverture du dossier Campus France jusqu'à votre envolée : chaque étape est suivie par notre équipe."
          />
        </AnimatedSection>
        <ServicesCarousel services={voyagesServices} />
      </Section>

      {/* Étapes — Timeline 2 colonnes sur desktop */}
      <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <SectionTitle
              inverse
              eyebrow="Étapes"
              title="Le déroulé de la procédure"
              subtitle="6 étapes claires, un accompagnement de bout en bout."
            />
          </AnimatedSection>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {voyagesSteps.map((s, i) => {
              const Icon = stepIcons[i] ?? FileText;
              return (
                <li key={s.step} className="group relative flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-white/10 hover:shadow-lg">
                  {/* Numéro + icône */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/90 text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="text-4xl font-black leading-none text-white/10 transition-all duration-300 group-hover:text-accent/30 select-none">
                      {s.step}
                    </span>
                  </div>
                  {/* Texte */}
                  <div>
                    <h3 className="font-extrabold text-white">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
                  </div>
                  {/* Barre accent */}
                  <div className="mt-auto h-0.5 w-8 rounded-full bg-accent/50 transition-all duration-300 group-hover:w-full group-hover:bg-accent" />
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Tarifs */}
      <Section>
        <AnimatedSection>
          <SectionTitle
            eyebrow="Tarifs"
            title="Des montants annoncés clairement"
            subtitle="Les frais officiels (Campus France, rendez-vous, visa) sont versés directement aux institutions concernées."
          />
        </AnimatedSection>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {voyagesTarifs.map((t, i) => {
            const isPrimary = i === 0;
            return (
              <div
                key={t.label}
                className={`group relative overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-strong ${
                  isPrimary
                    ? "bg-primary text-white shadow-md"
                    : "border border-border bg-white shadow-soft hover:border-primary/20"
                }`}
              >
                {/* Déco cercle fond */}
                <div className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full transition-transform duration-500 group-hover:scale-150 ${isPrimary ? "bg-white/5" : "bg-primary/5"}`} />
                {/* Icône */}
                <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${isPrimary ? "bg-accent text-white" : "bg-primary/10 text-primary"}`}>
                  <Banknote className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className={`text-sm font-semibold ${isPrimary ? "text-white/80" : "text-muted-foreground"}`}>
                  {t.label}
                </p>
                <p className={`mt-2 text-3xl font-black tracking-tight ${isPrimary ? "text-white" : "text-primary"}`}>
                  {t.price}
                </p>
                {isPrimary && (
                  <p className="mt-2 text-xs text-white/60">Accompagnement complet inclus</p>
                )}
              </div>
            );
          })}
        </div>
        {/* Note de transparence */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-accent/20 bg-accent/5 p-5">
          <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Paiement :</strong> Les frais d'accompagnement sont réglés par{" "}
            <strong className="text-foreground">Wave ou Orange Money</strong>. Les frais officiels (Campus France, visa) sont payés directement aux institutions concernées.
          </p>
        </div>
      </Section>

      {/* Pièces par profil */}
      <Section muted>
        <AnimatedSection>
          <SectionTitle eyebrow="Dossier" title="Pièces à fournir selon votre profil" />
        </AnimatedSection>
        <div className="mt-10">
          <ProfileTabs tabs={piecesParProfil} />
        </div>
      </Section>

      {/* Documents visa */}
      <Section>
        <AnimatedSection>
          <SectionTitle eyebrow="Visa" title="Les documents de la demande de visa" />
        </AnimatedSection>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {visaDocuments.map((g, idx) => {
            const Icon = visaIcons[g.id] ?? FileText;

            /* Headers entièrement statiques — Tailwind les detects correctement */
            const headerClass =
              idx === 0
                ? "bg-primary text-white"
                : idx === 1
                ? "bg-[#1a3f8f] text-white"
                : "bg-[#2a5298] text-white";

            const badgeClass =
              idx === 0 ? "bg-accent text-white" : "bg-white/20 text-white";

            const checkClass =
              idx === 0 ? "text-accent" : idx === 1 ? "text-[#1a3f8f]" : "text-[#2a5298]";

            return (
              <div
                key={g.id}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-strong"
              >
                {/* Header coloré */}
                <div className={`flex items-center gap-3 px-6 py-5 ${headerClass}`}>
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <h3 className="font-extrabold">{g.label}</h3>
                  <span className={`ml-auto rounded-full px-2.5 py-0.5 text-xs font-bold ${badgeClass}`}>
                    {g.items.length}
                  </span>
                </div>
                {/* Liste */}
                <ul className="divide-y divide-border/50">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 px-6 py-3.5 transition-colors hover:bg-muted/50">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${checkClass}`} aria-hidden="true" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* FAQ + Formulaire */}
      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <AnimatedSection>
              <SectionTitle eyebrow="FAQ" title="Questions fréquentes" />
            </AnimatedSection>
            <div className="mt-8">
              <Accordion items={voyagesFaq} />
            </div>
          </div>

          <div>
            <SectionTitle
              title="Démarrer ma procédure"
              subtitle={`Ou écrivez-nous directement au ${site.phoneDisplay}.`}
            />
            <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-8">
              <SimpleForm
                submitLabel="Préparer ma demande →"
                subject="Demande d'accompagnement UVS Voyages"
              >
                <Field label="Nom complet" name="nom" placeholder="Votre nom" />
                <Field label="Téléphone" name="telephone" type="tel" placeholder="77 000 00 00" />
                <SelectField label="Pays visé" name="pays" options={site.countries} />
                <SelectField
                  label="Niveau actuel"
                  name="niveau"
                  options={["Terminale", "Bachelier", "Licence 1", "Licence 2", "Licence 3", "Master"]}
                />
              </SimpleForm>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
