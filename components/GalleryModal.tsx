"use client";

import { useState, type ReactNode } from "react";
import { X, ImageIcon } from "lucide-react";

interface GalleryItem {
  id: string;
  pays: string;
  label: string;
  image_url?: string;
}

/**
 * GalleryModal — Client Component pour la galerie de captures de visa
 * avec zoom en modal. Identique à l'original de temoignages.tsx.
 */
export function GalleryModal({ items }: { items: GalleryItem[] }) {
  const [filtre, setFiltre] = useState("Tous");
  const [zoom, setZoom] = useState<GalleryItem | null>(null);

  const pays = [...new Set(items.map((g) => g.pays))];
  const filtres = ["Tous", ...pays];
  const visibles = items.filter((g) => filtre === "Tous" || g.pays === filtre);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {filtres.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltre(f)}
            aria-pressed={filtre === f}
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
            type="button"
            onClick={() => setZoom(g)}
            className="card-soft relative flex aspect-[3/4] flex-col items-center justify-center gap-2 overflow-hidden p-4 text-center group"
            aria-label={`Agrandir : ${g.label}`}
          >
            {g.image_url ? (
              <img src={g.image_url} alt={g.label} className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105" />
            ) : (
              <>
                <ImageIcon className="h-8 w-8 text-accent" aria-hidden="true" />
                <span className="text-xs font-semibold text-muted-foreground">{g.label}</span>
              </>
            )}
          </button>
        ))}
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.label}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/80 p-6 backdrop-blur-sm"
          onClick={() => setZoom(null)}
        >
          <div
            className="relative flex w-full max-w-lg flex-col items-center justify-center rounded-2xl bg-background p-1 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Fermer"
              onClick={() => setZoom(null)}
              className="absolute -top-12 right-0 rounded-full p-2 text-white hover:bg-white/10"
            >
              <X className="h-6 w-6" />
            </button>
            {zoom.image_url ? (
              <img src={zoom.image_url} alt={zoom.label} className="h-auto w-full rounded-xl object-contain max-h-[80vh]" />
            ) : (
              <div className="flex aspect-[3/4] w-full flex-col items-center justify-center p-6">
                <ImageIcon className="h-12 w-12 text-accent" aria-hidden="true" />
                <p className="mt-3 text-sm font-semibold text-primary">{zoom.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">Image à ajouter prochainement.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
