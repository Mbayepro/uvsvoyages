import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  AnimatedPageHero,
  AnimatedHeroItem,
} from "@/components/AnimatedHero";

export function Section({
  children,
  className,
  muted = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
}) {
  return (
    <section className={cn("py-16 md:py-24", muted && "bg-muted", className)}>
      <div className="mx-auto max-w-6xl px-4">{children}</div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  center = false,
  inverse = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  inverse?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      )}
      <h2 className={cn("mt-3 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl", inverse ? "text-white" : "text-primary")}>
        {title}
      </h2>
      {subtitle && <p className={cn("mt-4 text-base", inverse ? "text-white/70" : "text-muted-foreground")}>{subtitle}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-primary py-14 text-primary-foreground md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <AnimatedPageHero>
          {eyebrow && (
            <AnimatedHeroItem>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
            </AnimatedHeroItem>
          )}
          <AnimatedHeroItem>
            <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">
              {title}
            </h1>
          </AnimatedHeroItem>
          {subtitle && (
            <AnimatedHeroItem>
              <p className="mt-4 max-w-2xl text-base opacity-85 md:text-lg">{subtitle}</p>
            </AnimatedHeroItem>
          )}
        </AnimatedPageHero>
      </div>
    </section>
  );
}

