import type { Metadata } from "next";
import { Play, Quote } from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { GalleryModal } from "@/components/GalleryModal";
import { createClient } from "@supabase/supabase-js";
import { site, temoignages } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Témoignages",
  description:
    "Retours d'étudiants accompagnés par Union Vision Services vers la France, la Belgique et le Canada.",
  openGraph: {
    title: "Témoignages — UVS Voyages",
    description: "Retours d'étudiants accompagnés dans leur procédure Campus France.",
  },
};

// Fonction pour récupérer la galerie depuis Supabase
async function getGallery() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    // Mode dégradé (placeholders) si Supabase n'est pas configuré
    return site.countries.flatMap((pays) =>
      [1, 2, 3].map((n) => ({ id: `${pays}-${n}`, pays, label: `Visa ${pays} — emplacement ${n}`, image_url: '' }))
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    // Mode dégradé
    return site.countries.flatMap((pays) =>
      [1, 2, 3].map((n) => ({ id: `${pays}-${n}`, pays, label: `Visa ${pays} — emplacement ${n}`, image_url: '' }))
    );
  }

  return data;
}

export default async function TemoignagesPage() {
  const galerie = await getGallery();
  return (
    <>
      <PageHero
        eyebrow="Témoignages"
        title="Des parcours réels, racontés simplement"
        subtitle="Les captures de visa et les vidéos des étudiants seront ajoutées ici au fur et à mesure."
      />

      {/* Galerie interactive (Client Component) */}
      <Section>
        <SectionTitle eyebrow="Galerie" title="Captures de visa" />
        <GalleryModal items={galerie} />
      </Section>

      {/* Vidéos (placeholders) */}
      <Section muted>
        <SectionTitle eyebrow="Vidéos" title="Témoignages filmés" />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="card-soft flex aspect-video flex-col items-center justify-center gap-2"
            >
              <Play className="h-9 w-9 text-accent" aria-hidden="true" />
              <span className="text-xs font-semibold text-muted-foreground">
                Emplacement vidéo {n}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* Avis textuels */}
      <Section>
        <SectionTitle eyebrow="Avis" title="Ce qu'ils en disent" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {temoignages.map((t) => (
            <div key={t.name} className="card-soft p-7">
              <Quote className="h-7 w-7 text-accent" aria-hidden="true" />
              <p className="mt-4 text-sm leading-relaxed">{t.text}</p>
              <p className="mt-5 text-sm font-bold text-primary">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.country}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
