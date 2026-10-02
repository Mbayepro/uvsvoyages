"use client";

import { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Section, SectionTitle } from "@/components/Section";
import { AnimatedSection } from "@/components/AnimatedSection";

type Testimonial = {
  id: string;
  type?: "text" | "image" | "video"; // si non défini, on devinera (ex: si image_url -> image)
  name?: string;
  text?: string;
  country?: string;
  badge?: string; // Campus France ou Élites du Bac
  image_url?: string;
  video_url?: string;
};

export function HomeTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  ]);
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [playVideo, setPlayVideo] = useState<string | null>(null);

  if (!testimonials || testimonials.length === 0) {
    return null; // Ne pas afficher la section s'il n'y a pas de témoignage publié
  }

  const getCountryEmoji = (c?: string) => {
    if (!c) return "🌍";
    const lower = c.toLowerCase();
    if (lower.includes("france")) return "🇫🇷";
    if (lower.includes("belgique")) return "🇧🇪";
    if (lower.includes("canada")) return "🇨🇦";
    if (lower.includes("sénégal") || lower.includes("senegal")) return "🇸🇳";
    return "🌍";
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.substring(0, 2).toUpperCase();
  };

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <Section>
      <AnimatedSection>
        <SectionTitle eyebrow="Témoignages" title="Ils nous ont fait confiance" />
      </AnimatedSection>
      <div className="mt-10 relative px-4 md:px-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {testimonials.map((t) => {
              // Déduction du type si non fourni
              let type = t.type;
              if (!type) {
                if (t.video_url) type = "video";
                else if (t.image_url) type = "image";
                else type = "text";
              }

              return (
                <div key={t.id} className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="card-soft h-full p-7 flex flex-col relative overflow-hidden group border border-border/50">
                    {type === "text" && (
                      <>
                        <Quote className="h-7 w-7 text-accent shrink-0 mb-4" aria-hidden="true" />
                        <p className="text-sm leading-relaxed text-foreground flex-1 italic">"{t.text}"</p>
                        <div className="mt-6 flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
                            {getInitials(t.name)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-primary truncate">{t.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              {getCountryEmoji(t.country)} {t.country}
                            </p>
                          </div>
                          {t.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-accent/20 text-accent px-2 py-1 rounded-full whitespace-nowrap">
                              {t.badge}
                            </span>
                          )}
                        </div>
                      </>
                    )}

                    {type === "image" && t.image_url && (
                      <div className="relative h-48 w-full cursor-pointer overflow-hidden rounded-xl bg-muted" onClick={() => setZoomImg(t.image_url as string)}>
                        <img src={t.image_url} alt="Capture" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="rounded-full bg-white/20 p-2 backdrop-blur-md text-white font-semibold text-xs">Agrandir</span>
                        </div>
                        {t.badge && (
                          <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-primary px-2 py-1 rounded-full">
                            {t.badge}
                          </span>
                        )}
                      </div>
                    )}

                    {type === "video" && (
                      <div className="relative h-48 w-full cursor-pointer overflow-hidden rounded-xl bg-muted" onClick={() => setPlayVideo(t.video_url as string)}>
                        {t.image_url ? (
                           <img src={t.image_url} alt="Vignette" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        ) : (
                           <div className="h-full w-full bg-slate-800" />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg transition-transform group-hover:scale-110">
                            <Play className="h-5 w-5 ml-1" />
                          </div>
                        </div>
                        {t.badge && (
                          <span className="absolute top-2 right-2 text-[10px] font-bold uppercase tracking-wider bg-white/90 text-primary px-2 py-1 rounded-full">
                            {t.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Arrows Desktop */}
        <button
          className="absolute -left-2 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft text-primary hover:bg-primary/5 hover:scale-110 transition-all md:flex"
          onClick={scrollPrev}
          aria-label="Précédent"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          className="absolute -right-2 top-1/2 -translate-y-1/2 hidden h-10 w-10 items-center justify-center rounded-full bg-white shadow-soft text-primary hover:bg-primary/5 hover:scale-110 transition-all md:flex"
          onClick={scrollNext}
          aria-label="Suivant"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-8 flex justify-center">
        <a
          href="/temoignages"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
        >
          Voir tous les témoignages
        </a>
      </div>

      {/* Lightbox Image */}
      {zoomImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/90 p-6 backdrop-blur-sm"
          onClick={() => setZoomImg(null)}
        >
          <button
            onClick={() => setZoomImg(null)}
            className="absolute top-6 right-6 rounded-full p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <img src={zoomImg} alt="Capture plein écran" className="max-h-[85vh] w-auto max-w-full rounded-xl object-contain shadow-2xl" />
        </div>
      )}

      {/* Lightbox Video */}
      {playVideo && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-primary/90 p-4 sm:p-6 backdrop-blur-sm"
          onClick={() => setPlayVideo(null)}
        >
          <button
            onClick={() => setPlayVideo(null)}
            className="absolute top-6 right-6 rounded-full p-2 text-white hover:bg-white/20 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden bg-black shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <video src={playVideo} controls autoPlay className="h-full w-full" />
          </div>
        </div>
      )}
    </Section>
  );
}
