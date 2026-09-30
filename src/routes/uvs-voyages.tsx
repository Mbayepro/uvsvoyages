import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { SimpleForm, Field, SelectField } from "@/components/SimpleForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  piecesParProfil,
  site,
  visaDocuments,
  voyagesFaq,
  voyagesServices,
  voyagesSteps,
  voyagesTarifs,
} from "@/config/site";

export const Route = createFileRoute("/uvs-voyages")({
  head: () => ({
    meta: [
      { title: "UVS Voyages — Accompagnement Campus France" },
      {
        name: "description",
        content:
          "Procédure Campus France pas à pas : services, étapes, tarifs, pièces à fournir et dossier de visa pour la France, la Belgique et le Canada.",
      },
      { property: "og:title", content: "UVS Voyages — Accompagnement Campus France" },
      {
        property: "og:description",
        content: "Étapes, tarifs et pièces à fournir pour votre procédure Campus France.",
      },
    ],
  }),
  component: UvsVoyages,
});

function UvsVoyages() {
  return (
    <>
      <PageHero
        eyebrow="Campus France"
        title="Votre procédure d'études à l'étranger, encadrée du début à la fin"
        subtitle={`France, Belgique, Canada. Un dossier complet et cohérent est la meilleure façon de mettre toutes les chances de votre côté.`}
      />

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

      <Section>
        <SectionTitle
          eyebrow="Tarifs"
          title="Des montants annoncés clairement"
          subtitle="Les frais officiels (Campus France, rendez-vous, visa) sont versés aux institutions concernées."
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {voyagesTarifs.map((t) => (
            <div key={t.label} className="card-soft flex flex-wrap items-center justify-between gap-2 p-6">
              <span className="text-sm font-semibold text-foreground">{t.label}</span>
              <span className="whitespace-nowrap text-lg font-extrabold text-primary">
                {t.price}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionTitle eyebrow="Dossier" title="Pièces à fournir selon votre profil" />
        <Tabs defaultValue="terminale" className="mt-10">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
            {piecesParProfil.map((p) => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {p.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {piecesParProfil.map((p) => (
            <TabsContent key={p.id} value={p.id} className="mt-6">
              <ul className="card-soft grid gap-3 p-7 sm:grid-cols-2">
                {p.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </Section>

      <Section>
        <SectionTitle eyebrow="Visa" title="Les documents de la demande de visa" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {visaDocuments.map((g) => (
            <div key={g.id} className="card-soft p-7">
              <h3 className="text-lg font-bold text-primary">{g.label}</h3>
              <ul className="mt-4 space-y-3">
                {g.items.map((i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{i}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle eyebrow="FAQ" title="Questions fréquentes" />
            <Accordion type="single" collapsible className="mt-8">
              {voyagesFaq.map((f, i) => (
                <AccordionItem key={f.q} value={`q${i}`}>
                  <AccordionTrigger className="text-left text-sm font-bold text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <SectionTitle title="Démarrer ma procédure" subtitle={`Ou écrivez-nous au ${site.phoneDisplay}.`} />
            <div className="mt-8">
              <SimpleForm
                submitLabel="Préparer ma demande"
                subject="Demande d'accompagnement UVS Voyages"
              >
                <Field label="Nom complet" name="nom" placeholder="Votre nom" />
                <Field label="Téléphone" name="telephone" type="tel" placeholder="77 000 00 00" />
                <SelectField label="Pays visé" name="pays" options={[...site.countries]} />
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
