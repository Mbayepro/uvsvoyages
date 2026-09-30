import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ImageIcon, Play, Quote, X } from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { site, temoignages } from "@/config/site";

export const Route = createFileRoute("/temoignages")({
  head: () => ({
    meta: [
      { title: "Témoignages — UVS Voyages" },
      {
        name: "description",
        content:
          "Retours d'étudiants accompagnés par Union Vision Services vers la France, la Belgique et le Canada.",
      },
      { property: "og:title", content: "Témoignages — UVS Voyages" },
      {
        property: "og:description",
        content: "Retours d'étudiants accompagnés dans leur procédure Campus France.",
      },
    ],
  }),
  component: Temoignages,
});

const filtres = ["Tous", ...site.countries];
const galerie = site.countries.flatMap((pays) =>
  [1, 2, 3].map((n) => ({ id: `${pays}-${n}`, pays, label: `Visa ${pays} — emplacement ${n}` })),
);

function Temoignages() {
  const [filtre, setFiltre] = useState("Tous");
  const [zoom, setZoom] = useState<string | null>(null);
  const visibles = galerie.filter((g) => filtre === "Tous" || g.pays === filtre);

  return (
    <>
      <PageHero
        eyebrow="Témoignages"
        title="Des parcours réels, racontés simplement"
        subtitle="Les captures de visa et les vidéos des étudiants seront ajoutées ici au fur et à mesure."
      />

      <Section>
        <SectionTitle eyebrow="Galerie" title="Captures de visa" />
        <div className="mt-8 flex flex-wrap gap-2">
          {filtres.map((f) => (
            <button
              key={f}
              onClick={() => setFiltre(f)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                filtre === f
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:text-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
          {visibles.map((g) => (
            <button
              key={g.id}
              onClick={() => setZoom(g.label)}
              className="card-soft flex aspect-[3/4] flex-col items-center justify-center gap-2 p-4 text-center"
            >
              <ImageIcon className="h-8 w-8 text-accent" />
              <span className="text-xs font-semibold text-muted-foreground">{g.label}</span>
            </button>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionTitle eyebrow="Vidéos" title="Témoignages filmés" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="card-soft flex aspect-video flex-col items-center justify-center gap-2"
            >
              <Play className="h-9 w-9 text-accent" />
              <span className="text-xs font-semibold text-muted-foreground">
                Emplacement vidéo {n}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="Avis" title="Ce qu'ils en disent" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {temoignages.map((t) => (
            <div key={t.name} className="card-soft p-7">
              <Quote className="h-7 w-7 text-accent" />
              <p className="mt-4 text-sm leading-relaxed">{t.text}</p>
              <p className="mt-5 text-sm font-bold text-primary">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.country}</p>
            </div>
          ))}
        </div>
      </Section>

      {zoom && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/80 p-6"
          onClick={() => setZoom(null)}
        >
          <div className="relative flex aspect-[3/4] w-full max-w-sm flex-col items-center justify-center rounded-2xl bg-background p-6 text-center">
            <button
              aria-label="Fermer"
              onClick={() => setZoom(null)}
              className="absolute right-3 top-3 rounded-full p-2 text-muted-foreground"
            >
              <X className="h-5 w-5" />
            </button>
            <ImageIcon className="h-12 w-12 text-accent" />
            <p className="mt-3 text-sm font-semibold text-primary">{zoom}</p>
            <p className="mt-1 text-xs text-muted-foreground">Image à ajouter prochainement.</p>
          </div>
        </div>
      )}
    </>
  );
}
