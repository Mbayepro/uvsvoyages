import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import { Section, PageHero, SectionTitle } from "@/components/Section";
import { SimpleForm, Field, TextareaField } from "@/components/SimpleForm";
import { site } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — UVS Voyages, Yeumbeul" },
      {
        name: "description",
        content: `Contactez Union Vision Services à Yeumbeul Sud : ${site.phoneDisplay}, ${site.email}.`,
      },
      { property: "og:title", content: "Contact — UVS Voyages" },
      {
        property: "og:description",
        content: "Adresse, téléphone, WhatsApp et formulaire de contact d'Union Vision Services.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Par téléphone, sur WhatsApp, par e-mail ou directement à notre bureau de Yeumbeul Sud."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle title="Nos coordonnées" />
            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm">{site.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <a href={`tel:${site.phoneTel}`} className="text-sm font-semibold">
                  {site.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="text-sm font-semibold">
                  {site.email}
                </a>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`tel:${site.phoneTel}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
              >
                <Phone className="h-4 w-4" /> Appeler
              </a>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-bold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>

            <div className="card-soft mt-8 flex aspect-video flex-col items-center justify-center gap-2 text-center">
              <MapPin className="h-8 w-8 text-accent" />
              <p className="text-sm font-semibold text-primary">Carte Google Maps</p>
              <p className="text-xs text-muted-foreground">Emplacement réservé à la carte.</p>
            </div>
          </div>

          <div>
            <SectionTitle title="Nous écrire" />
            <div className="mt-8">
              <SimpleForm
                submitLabel="Préparer le message"
                subject="Message depuis le site UVS Voyages"
              >
                <Field label="Nom complet" name="nom" placeholder="Votre nom" />
                <Field label="Téléphone" name="telephone" type="tel" placeholder="77 000 00 00" />
                <Field label="E-mail" name="email" type="email" required={false} placeholder="vous@exemple.com" />
                <TextareaField label="Votre message" name="message" />
              </SimpleForm>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
