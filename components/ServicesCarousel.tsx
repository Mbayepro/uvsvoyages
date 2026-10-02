"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  FolderOpen,
  BookMarked,
  PenLine,
  Mic2,
  FileCheck,
  Plane,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  FolderOpen,
  BookMarked,
  PenLine,
  Mic2,
  FileCheck,
  Plane,
};

type Service = {
  icon?: string;
  step?: string;
  image?: string;
  title: string;
  text: string;
};

/**
 * Couleurs de fallback si pas d'image — dégradé bleu accentué par carte
 */
const gradients = [
  "from-[#0B2A6F] to-[#1a3f9f]",
  "from-[#0d3080] to-[#0B2A6F]",
  "from-[#122e78] to-[#0a2560]",
  "from-[#0B2A6F] to-[#163580]",
  "from-[#0e3280] to-[#0B2A6F]",
  "from-[#0B2A6F] to-[#112d75]",
];

export function ServicesCarousel({ services }: { services: Service[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="relative mt-10">
      {/* Gradient fade bords */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-background to-transparent md:w-16" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-background to-transparent md:w-16" />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-5">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon ?? ""] ?? FolderOpen;
            const grad = gradients[i % gradients.length];

            return (
              <div
                key={s.title}
                className="min-w-0 shrink-0 grow-0 basis-[88%] pl-5 sm:basis-[55%] lg:basis-[36%]"
              >
                {/* Carte pleine image */}
                <div className="group relative h-[420px] overflow-hidden rounded-3xl cursor-default shadow-soft hover:shadow-strong transition-all duration-500 hover:-translate-y-1.5">

                  {/* Image de fond */}
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${grad}`} />
                  )}

                  {/* Overlay dégradé - repos */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A6F]/95 via-[#0B2A6F]/50 to-[#0B2A6F]/10 transition-all duration-500 group-hover:from-[#0B2A6F]/98 group-hover:via-[#0B2A6F]/70 group-hover:to-[#0B2A6F]/30" />

                  {/* Badge numéro - top right */}
                  <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-xs font-black">
                    {s.step ?? String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Icône - top left */}
                  <div className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/90 text-white shadow-lg backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  {/* Contenu texte en bas */}
                  <div className="absolute inset-x-0 bottom-0 p-6 translate-y-0 transition-transform duration-500">
                    {/* Titre toujours visible */}
                    <h3 className="text-lg font-extrabold leading-snug text-white drop-shadow-md">
                      {s.title}
                    </h3>

                    {/* Description + CTA — glissent vers le haut au hover */}
                    <div className="mt-3 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                      <p className="text-sm leading-relaxed text-white/85">
                        {s.text}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent/90 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                        En savoir plus <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Ligne accent */}
                    <div className="mt-4 h-0.5 w-8 rounded-full bg-accent transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={scrollPrev}
          aria-label="Service précédent"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-primary shadow-soft transition-all hover:border-primary hover:bg-primary hover:text-white hover:scale-110"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Indicateur dot */}
        <div className="flex gap-1.5">
          {services.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Service ${i + 1}`}
              className="h-1.5 w-1.5 rounded-full bg-primary/20 transition-all hover:bg-primary hover:w-5"
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          aria-label="Service suivant"
          className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-primary/20 bg-white text-primary shadow-soft transition-all hover:border-primary hover:bg-primary hover:text-white hover:scale-110"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
