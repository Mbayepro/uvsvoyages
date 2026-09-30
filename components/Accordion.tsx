"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemData {
  q: string;
  a: string;
}

/**
 * Accordion simple sans dépendance Radix.
 * Client Component car il gère l'état ouvert/fermé.
 */
export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-4 py-4 text-left text-sm font-bold text-primary"
            >
              <span>{item.q}</span>
              <ChevronDown
                className={cn(
                  "mt-0.5 h-4 w-4 shrink-0 text-accent transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>
            {isOpen && (
              <p className="pb-4 text-sm text-muted-foreground">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
