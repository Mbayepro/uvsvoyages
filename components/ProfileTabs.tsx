"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, User, GraduationCap, BookOpen } from "lucide-react";

interface TabItem {
  id: string;
  label: string;
  items: string[];
}

const tabIcons: Record<string, React.ElementType> = {
  terminale: BookOpen,
  bacheliers: GraduationCap,
  licence3: User,
};

/**
 * ProfileTabs redesigné : onglets pill stylisés + liste de pièces avec animation.
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
        className="flex flex-wrap gap-3"
      >
        {tabs.map((tab) => {
          const Icon = tabIcons[tab.id] ?? User;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tab-panel-${tab.id}`}
              id={`tab-${tab.id}`}
              type="button"
              onClick={() => setActive(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                isActive
                  ? "bg-primary text-white shadow-md scale-105"
                  : "border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-primary hover:shadow-soft"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab panel */}
      {current && (
        <div
          role="tabpanel"
          id={`tab-panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="mt-6"
          key={current.id}
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border bg-primary/5 px-6 py-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                {(() => { const I = tabIcons[current.id] ?? User; return <I className="h-4 w-4" />; })()}
              </span>
              <p className="text-sm font-bold text-primary">{current.label}</p>
              <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
                {current.items.length} pièces
              </span>
            </div>

            {/* Items */}
            <ul className="divide-y divide-border/50">
              {current.items.map((item, i) => (
                <li
                  key={item}
                  className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-primary/5"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-black text-accent">
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm text-foreground">{item}</span>
                  <Check className="h-4 w-4 shrink-0 text-accent/50" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
