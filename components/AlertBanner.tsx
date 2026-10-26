"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, X, Calendar } from "lucide-react";
import { site } from "@/lib/config/site";

export function AlertBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur l'a déjà fermée durant cette session
    const dismissed = sessionStorage.getItem("uvs_campaign_banner_dismissed");
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("uvs_campaign_banner_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="relative isolate flex items-center justify-between gap-x-4 bg-gradient-to-r from-primary via-[#112d5e] to-primary px-4 py-2.5 text-xs text-white shadow-xs">
      <div className="mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-2.5 py-0.5 font-bold text-accent">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
          </span>
          Campagne en cours
        </span>

        <p className="font-medium text-white/95">
          <strong>Campus France & Élites du Bac 2026 :</strong> Les inscriptions et bilans d&apos;orientation sont ouverts à l&apos;agence de Yeumbeul.
        </p>

        <a
          href={site.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-bold text-accent underline-offset-4 hover:underline"
        >
          Prendre RDV sur WhatsApp <ArrowRight className="h-3 w-3" />
        </a>
      </div>

      <button
        type="button"
        onClick={handleDismiss}
        className="rounded-md p-1 text-white/60 hover:text-white focus:outline-hidden"
        aria-label="Fermer le bandeau"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
