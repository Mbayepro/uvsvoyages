"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemData {
  q: string;
  a: string;
}

/**
 * Accordion premium avec animation CSS height et icône +/-.
 */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={item.q}
            className={cn(
              "overflow-hidden rounded-2xl border transition-all duration-300",
              isOpen
                ? "border-primary/30 bg-primary shadow-md"
                : "border-border bg-white hover:border-primary/20 hover:shadow-soft"
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
            >
              <span
                className={cn(
                  "text-sm font-bold leading-snug transition-colors",
                  isOpen ? "text-white" : "text-primary"
                )}
              >
                {item.q}
              </span>
              <span
                className={cn(
                  "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all",
                  isOpen ? "bg-accent text-white" : "bg-primary/10 text-primary"
                )}
              >
                {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className={cn("px-6 pb-5 text-sm leading-relaxed", isOpen ? "text-white/85" : "text-muted-foreground")}>
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
