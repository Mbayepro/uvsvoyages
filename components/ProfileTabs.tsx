"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  items: string[];
}

/**
 * Tabs simple sans dépendance Radix.
 * Client Component pour la gestion de l'onglet actif.
 */
export function ProfileTabs({ tabs }: { tabs: TabItem[] }) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  const current = tabs.find((t) => t.id === active);

  return (
    <div>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Profils"
        className="flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`tab-panel-${tab.id}`}
            id={`tab-${tab.id}`}
            type="button"
            onClick={() => setActive(tab.id)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors",
              active === tab.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-primary"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panel */}
      {current && (
        <div
          role="tabpanel"
          id={`tab-panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="mt-6"
        >
          <ul className="card-soft grid gap-3 p-7 sm:grid-cols-2">
            {current.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
