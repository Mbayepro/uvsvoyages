import { useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

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
    const details = Array.from(form.entries())
      .filter(([, value]) => typeof value === "string" && value.trim())
      .map(([key, value]) => `${key}: ${value}`);
    setMessageUrl(`${site.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${details.join("\n")}`)}`);
  }

  if (messageUrl) {
    return (
      <div className="card-soft flex flex-col items-center gap-3 p-8 text-center">
        <WhatsAppIcon className="h-10 w-10 text-whatsapp" />
        <p className="text-lg font-bold text-primary">Votre message est prêt</p>
        <p className="text-sm text-muted-foreground">Ouvrez WhatsApp, puis appuyez sur Envoyer pour nous transmettre votre demande.</p>
        <Button asChild className="mt-2 rounded-full bg-whatsapp px-6 text-white hover:bg-whatsapp/90">
          <a href={messageUrl} target="_blank" rel="noreferrer" className="gap-2">
            <WhatsAppIcon className="h-4 w-4" /> Ouvrir WhatsApp
          </a>
        </Button>
        <Button
          type="button"
          variant="link"
          onClick={() => setMessageUrl(null)}
        >
          Modifier ma demande
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-soft space-y-4 p-6 md:p-8">
      {children}
      <Button
        type="submit"
        className="h-auto w-full rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-soft transition-transform hover:bg-accent/90"
      >
        {submitLabel}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        Votre demande s'ouvrira dans WhatsApp pour envoi.
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
  options: string[];
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
