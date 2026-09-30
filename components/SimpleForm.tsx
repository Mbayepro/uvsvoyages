"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/config/site";

import { saveSubmission } from "@/app/actions";

/**
 * SimpleForm — Client Component.
 * Les données du formulaire sont enregistrées en arrière-plan dans Supabase,
 * puis pré-remplies dans un lien WhatsApp pour l'utilisateur.
 */
export function SimpleForm({
  children,
  submitLabel,
  subject,
}: {
  children: ReactNode;
  submitLabel: string;
  subject: string;
}) {
  const [messageUrl, setMessageUrl] = useState<string | null>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    
    // Pour WhatsApp (texte formaté)
    const detailsArray = Array.from(form.entries())
      .filter(([, value]) => typeof value === "string" && (value as string).trim());
    const detailsString = detailsArray.map(([key, value]) => `${key}: ${value}`);
    const text = encodeURIComponent(`${subject}\n\n${detailsString.join("\n")}`);
    
    // Afficher le lien WhatsApp immédiatement
    setMessageUrl(`${site.whatsapp}?text=${text}`);

    // Sauvegarder dans Supabase en arrière-plan (sans bloquer)
    const detailsObj = Object.fromEntries(detailsArray);
    saveSubmission(subject, detailsObj).catch(err => {
      console.error("Échec de l'enregistrement silencieux dans Supabase:", err);
    });
  }

  if (messageUrl) {
    return (
      <div className="card-soft flex flex-col items-center gap-3 p-8 text-center">
        <WhatsAppIcon className="h-10 w-10 text-whatsapp" />
        <p className="text-lg font-bold text-primary">Votre message est prêt</p>
        <p className="text-sm text-muted-foreground">
          Ouvrez WhatsApp, puis appuyez sur Envoyer pour nous transmettre votre demande.
        </p>
        <a
          href={messageUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white transition-transform hover:scale-105"
        >
          <WhatsAppIcon className="h-4 w-4" /> Ouvrir WhatsApp
        </a>
        <button
          type="button"
          onClick={() => setMessageUrl(null)}
          className="text-sm text-muted-foreground underline"
        >
          Modifier ma demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-soft space-y-4 p-6 md:p-8">
      {children}
      <button
        type="submit"
        className="h-auto w-full rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-soft transition-transform hover:bg-accent/90 hover:scale-105"
      >
        {submitLabel}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Votre demande s&apos;ouvrira dans WhatsApp pour envoi.
      </p>
    </form>
  );
}

export function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-primary">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}

export function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-primary">{label}</span>
      <select
        name={name}
        required
        defaultValue=""
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      >
        <option value="" disabled>
          Choisir…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TextareaField({ label, name }: { label: string; name: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-primary">{label}</span>
      <textarea
        name={name}
        rows={4}
        required
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
      />
    </label>
  );
}
