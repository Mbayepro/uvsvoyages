import type { Metadata } from "next";
import { Check, BookOpen } from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { SimpleForm, Field, SelectField } from "@/components/SimpleForm";
import { elitesFormules, elitesMatieres, fascicules } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Les Élites du Bac — Cours de renforcement Terminale",
  description:
    "Cours de vacances à Yeumbeul et cours en ligne pour les élèves de Terminale : maths, français, philosophie, histoire-géo, anglais, économie.",
  openGraph: {
    title: "Les Élites du Bac — Renforcement Terminale",
    description: "Cours de vacances et cours en ligne pour préparer sérieusement le Baccalauréat.",
  },
};

export default function ElitesDuBacPage() {
  return (
    <>
      <PageHero
        eyebrow="Les Élites du Bac"
        title="Préparer son Baccalauréat avec méthode"
        subtitle="Cours de renforcement pour les élèves de Terminale, en présentiel à Yeumbeul et en ligne partout ailleurs."
      />

      {/* Formules */}
      <Section>
        <SectionTitle eyebrow="Formules" title="Deux façons de suivre les cours" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {elitesFormules.map((f) => (
            <div key={f.title} className="card-soft p-8">
              <h3 className="text-2xl font-extrabold text-primary">{f.title}</h3>
              <p className="mt-4 text-3xl font-extrabold text-accent">{f.price}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{f.priceNote}</p>
              <ul className="mt-6 space-y-3">
                {f.details.map((d) => (
                  <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Matières */}
      <Section muted>
        <SectionTitle eyebrow="Programme" title="Les matières couvertes" />
        <div className="mt-10 flex flex-wrap gap-3">
          {elitesMatieres.map((m) => (
            <span
              key={m}
              className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold text-primary"
            >
              {m}
            </span>
          ))}
        </div>
      </Section>

      {/* Fascicules */}
      <Section>
        <SectionTitle
          eyebrow="Supports"
          title="Fascicules PDF et version papier"
          subtitle="Version papier sur commande, livraison partout au Sénégal. Paiement par Wave ou Orange Money."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {fascicules.map((f) => (
            <div key={f.title} className="card-soft p-7">
              <BookOpen className="h-8 w-8 text-accent" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-bold text-primary">{f.title}</h3>
              <p className="mt-1 text-xl font-extrabold text-primary">{f.price}</p>
              <p className="mt-2 text-xs text-muted-foreground">PDF · papier sur commande</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Formulaire d'inscription */}
      <Section muted>
        <div className="mx-auto max-w-xl">
          <SectionTitle center title="Formulaire d'inscription" />
          <div className="mt-8">
            <SimpleForm
              submitLabel="Préparer mon inscription"
              subject="Inscription aux Élites du Bac"
            >
              <Field label="Nom complet" name="nom" placeholder="Votre nom" />
              <Field label="Téléphone" name="telephone" type="tel" placeholder="77 000 00 00" />
              <SelectField
                label="Classe"
                name="classe"
                options={["Terminale S1", "Terminale S2", "Terminale L1", "Terminale L2", "Terminale G", "Autre"]}
              />
              <SelectField label="Matière principale" name="matiere" options={elitesMatieres} />
            </SimpleForm>
          </div>
        </div>
      </Section>
    </>
  );
}
