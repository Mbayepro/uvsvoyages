import { createFileRoute } from "@tanstack/react-router";
import { User } from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { site, valeurs } from "@/config/site";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Union Vision Services" },
      {
        name: "description",
        content:
          "Union Vision Services, fondée par Mouhamed Ndiaye à Yeumbeul : transparence, rigueur et accompagnement des étudiants sénégalais.",
      },
      { property: "og:title", content: "À propos — Union Vision Services" },
      {
        property: "og:description",
        content: "L'équipe et les valeurs derrière UVS Voyages et Les Élites du Bac.",
      },
    ],
  }),
  component: APropos,
});

const equipe = [
  {
    name: site.founder,
    role: "Fondateur",
    text: "Fondateur d'Union Vision Services, il accompagne depuis plusieurs années les élèves et étudiants de Yeumbeul dans leurs projets d'études, au Sénégal comme à l'étranger.",
  },
  {
    name: "Babacar",
    role: "Expert des procédures Campus France",
    text: "Il suit les dossiers Campus France au quotidien : constitution des pièces, choix des formations, préparation à l'entretien et demande de visa.",
  },
];

function APropos() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title={`${site.legalName}, au service des étudiants de Yeumbeul et d'ailleurs`}
        subtitle="Une équipe de proximité, disponible et exigeante sur la qualité des dossiers."
      />

      <Section>
        <SectionTitle eyebrow="L'équipe" title="Les personnes derrière UVS" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {equipe.map((m) => (
            <div key={m.name} className="card-soft p-8">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <User className="h-9 w-9 text-accent" />
              </div>
              <h3 className="mt-5 text-xl font-extrabold text-primary">{m.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent">{m.role}</p>
              <p className="mt-4 text-sm text-muted-foreground">{m.text}</p>
              <p className="mt-3 text-xs text-muted-foreground">Photo à ajouter prochainement.</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionTitle eyebrow="Nos valeurs" title="Ce qui guide notre travail" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {valeurs.map((v) => (
            <div key={v.title} className="card-soft p-7">
              <h3 className="text-lg font-bold text-primary">{v.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
