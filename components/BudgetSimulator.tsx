"use client";

import { useState } from "react";
import {
  Calculator,
  Plane,
  Building2,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  RotateCcw,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/config/site";

interface CountryConfig {
  name: string;
  flag: string;
  currencySymbol: string;
  aviCaution: number; // en FCFA
  aviLabel: string;
  fraisProcedure: number; // Campus France / dossier
  fraisVisa: number;
  scolaritePublique: number;
  scolaritePrivee: number;
  billetAvion: number;
}

const COUNTRIES: Record<string, CountryConfig> = {
  France: {
    name: "France",
    flag: "🇫🇷",
    currencySymbol: "€",
    aviCaution: 5000000, // ~7 380 €
    aviLabel: "Caution bancaire (A.V.I obligatoire)",
    fraisProcedure: 75000, // Campus France Sénégal
    fraisVisa: 65000,
    scolaritePublique: 180000, // Droits d'inscription université
    scolaritePrivee: 3500000,
    billetAvion: 350000,
  },
  Belgique: {
    name: "Belgique",
    flag: "🇧🇪",
    currencySymbol: "€",
    aviCaution: 5500000, // Annexe 32 ou compte bloqué
    aviLabel: "Garant financier / Annexe 32",
    fraisProcedure: 0,
    fraisVisa: 135000,
    scolaritePublique: 550000,
    scolaritePrivee: 3000000,
    billetAvion: 400000,
  },
  Canada: {
    name: "Canada",
    flag: "🇨🇦",
    currencySymbol: "$ CAD",
    aviCaution: 10000000, // Compte bloqué ~ 20 635 $ CAD
    aviLabel: "Fonds de subsistance exigés (IRCC)",
    fraisProcedure: 0,
    fraisVisa: 110000,
    scolaritePublique: 7500000,
    scolaritePrivee: 9500000,
    billetAvion: 650000,
  },
};

const LOGEMENTS = {
  crous: { label: "Résidence étudiante / CROUS", coutMois: 200000, caution: 200000 },
  prive: { label: "Studio privé / Colocation", coutMois: 350000, caution: 350000 },
};

export function BudgetSimulator() {
  const [pays, setPays] = useState<"France" | "Belgique" | "Canada">("France");
  const [niveau, setNiveau] = useState<"Licence 1 (Post-Bac)" | "Licence 2 / 3" | "Master 1 / 2">("Licence 1 (Post-Bac)");
  const [typeEtablissement, setTypeEtablissement] = useState<"public" | "prive">("public");
  const [typeLogement, setTypeLogement] = useState<"crous" | "prive">("crous");
  const [packUvs, setPackUvs] = useState<"complet" | "dossier">("complet");

  const config = COUNTRIES[pays];
  const logement = LOGEMENTS[typeLogement];

  // Calculs
  const scolarite = typeEtablissement === "public" ? config.scolaritePublique : config.scolaritePrivee;
  const fraisUvs = packUvs === "complet" ? 250000 : 100000;
  const fraisDemarche = config.fraisProcedure + config.fraisVisa + fraisUvs;
  const budgetInstallation = config.billetAvion + logement.caution + logement.coutMois;
  const cautionFinanciere = config.aviCaution;

  const totalGlobal = fraisDemarche + scolarite + cautionFinanciere + budgetInstallation;

  const formatFcfa = (n: number) => {
    return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
  };

  const formatEuro = (n: number) => {
    const euro = Math.round(n / 655.957);
    return new Intl.NumberFormat("fr-FR").format(euro) + " €";
  };

  // Message WhatsApp pré-rempli
  const messageWhatsapp = encodeURIComponent(
    `Bonjour UVS Voyages ! J'ai utilisé votre simulateur de budget sur le site :\n\n` +
      `🎯 Destination : ${config.flag} ${pays}\n` +
      `🎓 Niveau : ${niveau}\n` +
      `🏫 Établissement : ${typeEtablissement === "public" ? "Université publique" : "École privée"}\n` +
      `🏠 Logement : ${logement.label}\n` +
      `📦 Formule UVS : ${packUvs === "complet" ? "Pack Complet (250 000 FCFA)" : "Dossier Seul (100 000 FCFA)"}\n\n` +
      `💰 Budget global estimé : ${formatFcfa(totalGlobal)} (~${formatEuro(totalGlobal)})\n\n` +
      `Je souhaite obtenir un bilan personnalisé et échanger avec un conseiller à l'agence.`
  );

  return (
    <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-strong md:p-10">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between border-b border-border/60 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent">
            <Calculator className="h-3.5 w-3.5" />
            Outil interactif gratuit
          </div>
          <h3 className="mt-2 text-2xl font-extrabold text-primary md:text-3xl">
            Simulateur de Budget Études à l&apos;Étranger
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Estimez en toute transparence le coût réel de votre projet pour partir serein(e).
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setPays("France");
            setNiveau("Licence 1 (Post-Bac)");
            setTypeEtablissement("public");
            setTypeLogement("crous");
            setPackUvs("complet");
          }}
          className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-muted-foreground hover:text-primary"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/* Colonne gauche : Options de configuration */}
        <div className="space-y-6 lg:col-span-7">
          {/* 1. Destination */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              1. Destination visée
            </label>
            <div className="mt-2.5 grid grid-cols-3 gap-3">
              {(["France", "Belgique", "Canada"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPays(p)}
                  className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all ${
                    pays === p
                      ? "border-accent bg-accent/10 font-bold text-primary shadow-xs ring-2 ring-accent"
                      : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  <span className="text-2xl">{COUNTRIES[p].flag}</span>
                  <span className="mt-1.5 text-sm font-semibold">{p}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Niveau d'études */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              2. Votre niveau d&apos;études
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {(["Licence 1 (Post-Bac)", "Licence 2 / 3", "Master 1 / 2"] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setNiveau(n)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all ${
                    niveau === n
                      ? "border-primary bg-primary text-white"
                      : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Type d'établissement & Frais de scolarité */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              3. Type d&apos;établissement
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTypeEtablissement("public")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  typeEtablissement === "public"
                    ? "border-accent bg-accent/10 font-bold text-primary ring-2 ring-accent"
                    : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <p className="text-sm font-bold text-primary">Université publique</p>
                <p className="text-xs text-muted-foreground">Droits d&apos;inscription étatiques</p>
              </button>
              <button
                type="button"
                onClick={() => setTypeEtablissement("prive")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  typeEtablissement === "prive"
                    ? "border-accent bg-accent/10 font-bold text-primary ring-2 ring-accent"
                    : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <p className="text-sm font-bold text-primary">Grande école / Privé</p>
                <p className="text-xs text-muted-foreground">Frais de scolarité annuels</p>
              </button>
            </div>
          </div>

          {/* 4. Type de logement */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              4. Logement envisagé à l&apos;arrivée
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTypeLogement("crous")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  typeLogement === "crous"
                    ? "border-accent bg-accent/10 font-bold text-primary ring-2 ring-accent"
                    : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <p className="text-sm font-bold text-primary">Résidence universitaire</p>
                <p className="text-xs text-muted-foreground">CROUS ou chambre étudiante</p>
              </button>
              <button
                type="button"
                onClick={() => setTypeLogement("prive")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  typeLogement === "prive"
                    ? "border-accent bg-accent/10 font-bold text-primary ring-2 ring-accent"
                    : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <p className="text-sm font-bold text-primary">Studio privé / Coloc</p>
                <p className="text-xs text-muted-foreground">Marché locatif classique</p>
              </button>
            </div>
          </div>

          {/* 5. Accompagnement UVS Voyages */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              5. Formule d&apos;accompagnement UVS
            </label>
            <div className="mt-2.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPackUvs("complet")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  packUvs === "complet"
                    ? "border-accent bg-accent/10 font-bold text-primary ring-2 ring-accent"
                    : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-primary">Pack Complet Sérénité</p>
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                    Recommandé
                  </span>
                </div>
                <p className="mt-1 text-xs font-semibold text-accent">250 000 FCFA</p>
                <p className="text-[11px] text-muted-foreground">Dossier + vœux + entretien + visa</p>
              </button>
              <button
                type="button"
                onClick={() => setPackUvs("dossier")}
                className={`rounded-2xl border p-3.5 text-left transition-all ${
                  packUvs === "dossier"
                    ? "border-accent bg-accent/10 font-bold text-primary ring-2 ring-accent"
                    : "border-border/70 bg-background text-muted-foreground hover:border-primary/40 hover:text-primary"
                }`}
              >
                <p className="text-sm font-bold text-primary">Dossier Seul</p>
                <p className="mt-1 text-xs font-semibold text-accent">100 000 FCFA</p>
                <p className="text-[11px] text-muted-foreground">Constitution du dossier & vœux</p>
              </button>
            </div>
          </div>
        </div>

        {/* Colonne droite : Synthèse financière dynamique */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary to-[#0f244a] p-6 text-white shadow-soft">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Estimation financière globale
            </span>
            <div className="mt-3">
              <div className="text-3xl font-black text-white md:text-4xl">
                {formatFcfa(totalGlobal)}
              </div>
              <div className="text-xs font-semibold text-accent/90">
                soit environ {formatEuro(totalGlobal)}
              </div>
            </div>

            <p className="mt-2 text-xs text-white/70 leading-relaxed">
              Ce montant englobe toutes les dépenses obligatoires pour votre départ vers {config.flag} {pays}.
            </p>

            <div className="my-5 border-t border-white/15 pt-4 space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-white/80">Frais de dossier & Visa consulaire</span>
                <span className="font-semibold text-white">
                  {formatFcfa(config.fraisProcedure + config.fraisVisa)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/80">Accompagnement UVS ({packUvs === "complet" ? "Complet" : "Dossier"})</span>
                <span className="font-semibold text-white">{formatFcfa(fraisUvs)}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/80">Scolarité annuelle estimée</span>
                <span className="font-semibold text-white">{formatFcfa(scolarite)}</span>
              </div>

              <div className="flex items-start justify-between gap-2">
                <span className="text-white/80">
                  {config.aviLabel}
                  <span className="block text-[10px] text-white/50">Restitué mensuellement sur place</span>
                </span>
                <span className="font-semibold text-white text-right shrink-0">
                  {formatFcfa(cautionFinanciere)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white/80">Installation (Vol + 1er mois logement)</span>
                <span className="font-semibold text-white">{formatFcfa(budgetInstallation)}</span>
              </div>
            </div>

            <div className="rounded-xl bg-white/10 p-3 text-[11px] text-white/80">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 shrink-0 text-accent mt-0.5" />
                <span>
                  <strong>Garantie Transparence UVS :</strong> Ces montants sont indicatifs et conformes aux exigences consulaires officielles actuelles.
                </span>
              </div>
            </div>

            <a
              href={`https://wa.me/221786996565?text=${messageWhatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Valider cette simulation sur WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
