import type { Metadata } from "next";
import { MapPin, Mail, Phone } from "lucide-react";
import { Section, PageHero, SectionTitle } from "@/components/Section";
import { SimpleForm, Field, TextareaField } from "@/components/SimpleForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/config/site";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Contact — Yeumbeul",
  description: `Contactez Union Vision Services à Yeumbeul Sud : ${site.phoneDisplay}, ${site.email}.`,
  openGraph: {
    title: "Contact — UVS Voyages",
    description: "Adresse, téléphone, WhatsApp et formulaire de contact d'Union Vision Services.",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre projet"
        subtitle="Par téléphone, sur WhatsApp, par e-mail ou directement à notre bureau de Yeumbeul Sud."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Coordonnées */}
          <div>
            <AnimatedSection>
              <SectionTitle title="Nos coordonnées" />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <ul className="mt-8 space-y-5">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span className="text-sm">{site.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <a href={`tel:${site.phoneTel}`} className="text-sm font-semibold">
                    {site.phoneDisplay}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <a href={`mailto:${site.email}`} className="text-sm font-semibold">
                    {site.email}
                  </a>
                </li>
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.18}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={`tel:${site.phoneTel}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> Appeler
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
            </AnimatedSection>

            {/* Emplacement carte Google Maps */}
            <AnimatedSection delay={0.25}>
              <div className="card-soft mt-8 flex aspect-video flex-col items-center justify-center gap-2 text-center">
                <MapPin className="h-8 w-8 text-accent" aria-hidden="true" />
                <p className="text-sm font-semibold text-primary">Carte Google Maps</p>
                <p className="text-xs text-muted-foreground">
                  Yeumbeul Sud, Afia 1, arrêt Fatou Laobé
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Formulaire */}
          <div>
            <AnimatedSection>
              <SectionTitle title="Nous écrire" />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="mt-8">
                <SimpleForm
                  submitLabel="Préparer le message"
                  subject="Message depuis le site UVS Voyages"
                >
                  <Field label="Nom complet" name="nom" placeholder="Votre nom" />
                  <Field label="Téléphone" name="telephone" type="tel" placeholder="77 000 00 00" />
                  <Field
                    label="E-mail"
                    name="email"
                    type="email"
                    required={false}
                    placeholder="vous@exemple.com"
                  />
                  <TextareaField label="Votre message" name="message" />
                </SimpleForm>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Section>
    </>
  );
}
