import type { Metadata } from "next";
import {
  Check,
  BookOpen,
  Monitor,
  Users,
  Star,
  GraduationCap,
  Calculator,
  Globe,
  BookMarked,
  Landmark,
  Atom,
  Banknote,
  Phone,
  Wifi,
} from "lucide-react";
import { Section, SectionTitle, PageHero } from "@/components/Section";
import { SimpleForm, Field, SelectField } from "@/components/SimpleForm";
import { site, elitesFormules, elitesMatieres, fascicules } from "@/lib/config/site";
import { AnimatedSection } from "@/components/AnimatedSection";

export const metadata: Metadata = {
  title: "Les Élites du Bac — Cours de renforcement Terminale",
  description:
    "Cours de vacances à Yeumbeul et cours en ligne pour les élèves de Terminale : maths, français, philosophie, histoire-géo, anglais, économie.",
  openGraph: {
    title: "Les Élites du Bac — Renforcement Terminale",
    description: "Cours de vacances et cours en ligne pour préparer sérieusement le Baccalauréat.",
  },
};

const matiereIcons: Record<string, React.ElementType> = {
  "Mathématiques": Calculator,
  "Français": BookMarked,
  "Histoire-Géographie": Globe,
  "Anglais": Landmark,
  "Économie": Banknote,
  "Philosophie": Atom,
};

const formulaIcons = [Users, Wifi];
const formulaColors = [
  { card: "bg-primary", text: "text-white", badge: "bg-accent text-white", check: "text-accent", sub: "text-white/70" },
  { card: "bg-[#1a3f8f]", text: "text-white", badge: "bg-white/20 text-white", check: "text-white/70", sub: "text-white/60" },
];

export default function ElitesDuBacPage() {
  return (
    <>
      <PageHero
        eyebrow="Les Élites du Bac"
        title="Préparer son Baccalauréat avec méthode"
        subtitle="Cours de renforcement pour les élèves de Terminale, en présentiel à Yeumbeul et en ligne partout ailleurs."
      />

      {/* Formules — cartes plein style */}
      <Section>
        <AnimatedSection>
          <SectionTitle
            eyebrow="Formules"
            title="Deux façons de suivre les cours"
            subtitle="Choisissez la formule qui correspond à votre situation : en salle ou depuis chez vous."
          />
        </AnimatedSection>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {elitesFormules.map((f, idx) => {
            const Icon = formulaIcons[idx] ?? Users;
            const c = formulaColors[idx]!;
            return (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-3xl p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-strong ${c.card}`}
              >
                {/* Déco cercle fond */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-white/5" />

                {/* Icône */}
                <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Icon className={`h-7 w-7 ${c.text}`} aria-hidden="true" />
                </div>

                {/* Titre */}
                <h3 className={`relative text-2xl font-extrabold ${c.text}`}>{f.title}</h3>

                {/* Prix */}
                <div className="relative mt-4 flex items-end gap-2">
                  <span className={`text-4xl font-black tracking-tight ${c.text}`}>{f.price}</span>
                  <span className={`mb-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${c.badge}`}>
                    {f.priceNote}
                  </span>
                </div>

                {/* Détails */}
                <ul className="relative mt-7 space-y-3.5 border-t border-white/10 pt-6">
                  {f.details.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${c.check}`} aria-hidden="true" />
                      <span className={`text-sm leading-relaxed ${c.sub}`}>{d}</span>
                    </li>
                  ))}
                </ul>

                {/* Barre accent */}
                <div className="relative mt-8 h-0.5 w-10 rounded-full bg-white/20 transition-all duration-500 group-hover:w-full" />
              </div>
            );
          })}
        </div>
      </Section>

      {/* Matières — grille d'icônes */}
      <section className="bg-primary py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <AnimatedSection>
            <SectionTitle
              inverse
              eyebrow="Programme"
              title="Les matières couvertes"
              subtitle="6 matières clés du Baccalauréat, enseignées par des professeurs expérimentés."
            />
          </AnimatedSection>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {elitesMatieres.map((m) => {
              const Icon = matiereIcons[m] ?? BookOpen;
              return (
                <div
                  key={m}
                  className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-white/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="text-xs font-bold leading-tight text-white/85">{m}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stat résultat Bac */}
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, value: site.successRate, label: "de réussite au Bac (C.R.E.M 2026)", sub: `sur ${site.students} élèves` },
            { icon: Users, value: "Petits groupes", label: "pour un suivi individuel de chaque élève", sub: "Présentiel & En ligne" },
            { icon: Star, value: `Depuis ${site.since}`, label: "des élèves renforcés pour le Bac", sub: "À Yeumbeul et partout au Sénégal" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center rounded-2xl border border-border bg-white p-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-strong"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <stat.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <p className="mt-5 text-2xl font-black text-primary md:text-3xl">{stat.value}</p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-xs font-semibold text-accent">{stat.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Fascicules */}
      <Section muted>
        <AnimatedSection>
          <SectionTitle
            eyebrow="Supports"
            title="Fascicules PDF et version papier"
            subtitle="Version papier sur commande, livraison partout au Sénégal. Paiement par Wave ou Orange Money."
          />
        </AnimatedSection>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {fascicules.map((f, idx) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-strong"
            >
              {/* Déco */}
              <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
              {/* Icône */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-extrabold text-primary">{f.title}</h3>
              <p className="mt-3 text-2xl font-black text-accent">{f.price}</p>
              <p className="mt-1 text-xs text-muted-foreground">PDF · papier sur commande</p>
              {/* Barre */}
              <div className="mt-6 h-0.5 w-8 rounded-full bg-accent transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>
      </Section>

      {/* Formulaire d'inscription */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bloc info */}
          <div className="flex flex-col justify-center">
            <SectionTitle
              eyebrow="Inscription"
              title="Rejoindre les Élites du Bac"
              subtitle="Remplissez le formulaire et nous vous recontactons sous 24 h pour confirmer votre inscription."
            />
            {/* Points clés */}
            <ul className="mt-8 space-y-4">
              {[
                { icon: GraduationCap, text: `${site.successRate} de réussite au Bac (C.R.E.M 2026)` },
                { icon: Users, text: "Petits groupes, suivi individuel garanti" },
                { icon: Monitor, text: "Cours en ligne accessibles depuis partout" },
                { icon: Phone, text: `Renseignements au ${site.phoneDisplay}` },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-accent">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <span className="mt-1 text-sm text-muted-foreground">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulaire */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-soft sm:p-8">
              <SimpleForm
                submitLabel="Préparer mon inscription →"
                subject="Inscription aux Élites du Bac"
              >
                <Field label="Nom complet" name="nom" placeholder="Votre nom" />
                <Field label="Téléphone" name="telephone" type="tel" placeholder="77 000 00 00" />
                <SelectField
                  label="Classe"
                  name="classe"
                  options={["Terminale S1", "Terminale S2", "Terminale L1", "Terminale L2", "Terminale G", "Autre"]}
                />
                <SelectField label="Matière principale" name="matiere" options={elitesMatieres} />
              </SimpleForm>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
