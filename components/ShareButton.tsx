"use client";

import { Share2 } from "lucide-react";

export function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Carte Digitale — Mouhamed Ndiaye",
          text: "Contactez Mouhamed Ndiaye, fondateur de UVS Voyages et Les Élites du Bac.",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Erreur lors du partage :", error);
      }
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  return (
    <button
      onClick={handleShare}
      className="absolute top-6 right-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition"
    >
      Partager <Share2 className="h-4 w-4" />
    </button>
  );
}
