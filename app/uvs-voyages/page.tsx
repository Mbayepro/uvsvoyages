import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { SimpleForm, Field, SelectField } from "@/components/SimpleForm";
import { Accordion } from "@/components/Accordion";
import { ProfileTabs } from "@/components/ProfileTabs";
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
        <SectionTitle eyebrow="Nos services" title="Ce que nous prenons en charge" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {voyagesServices.map((s) => (
            <div key={s.title} className="card-soft p-7">
              <h3 className="text-lg font-bold text-primary">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Étapes */}
      <Section muted>
        <SectionTitle eyebrow="Étapes" title="Le déroulé de la procédure" />
        <ol className="mt-10 space-y-5 border-l-2 border-accent/40 pl-6">
          {voyagesSteps.map((s) => (
            <li key={s.step} className="relative">
              <span className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-extrabold text-accent-foreground">
                {s.step}
              </span>
              <div className="card-soft p-5">
                <h3 className="font-bold text-primary">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Tarifs */}
      <Section>
        <SectionTitle
          eyebrow="Tarifs"
          title="Des montants annoncés clairement"
          subtitle="Les frais officiels (Campus France, rendez-vous, visa) sont versés aux institutions concernées."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {voyagesTarifs.map((t) => (
            <div
              key={t.label}
              className="card-soft flex flex-wrap items-center justify-between gap-2 p-6"
            >
              <span className="text-sm font-semibold text-foreground">{t.label}</span>
              <span className="whitespace-nowrap text-lg font-extrabold text-primary">
                {t.price}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Pièces par profil — onglets interactifs (Client Component) */}
      <Section muted>
        <SectionTitle eyebrow="Dossier" title="Pièces à fournir selon votre profil" />
        <div className="mt-10">
          <ProfileTabs tabs={piecesParProfil} />
        </div>
      </Section>

      {/* Documents visa */}
      <Section>
        <SectionTitle eyebrow="Visa" title="Les documents de la demande de visa" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {visaDocuments.map((g) => (
            <div key={g.id} className="card-soft p-7">
              <h3 className="text-lg font-bold text-primary">{g.label}</h3>
              <ul className="mt-4 space-y-3">
                {g.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ + Formulaire */}
      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="FAQ" title="Questions fréquentes" />
            <div className="mt-8">
              <Accordion items={voyagesFaq} />
            </div>
          </div>
          <div>
            <SectionTitle
              title="Démarrer ma procédure"
              subtitle={`Ou écrivez-nous au ${site.phoneDisplay}.`}
            />
            <div className="mt-8">
              <SimpleForm
                submitLabel="Préparer ma demande"
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
