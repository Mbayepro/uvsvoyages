import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import logo from "@/assets/uvs-logo.jpg.asset.json";
import { nav, site } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:h-20">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="Logo UVS Voyages" className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12" />
          <span className="leading-tight">
            <span className="block text-sm font-extrabold tracking-tight text-primary md:text-base">UVS VOYAGES</span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
              Union Vision Services
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm font-semibold transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-4 py-2 text-sm font-bold text-white shadow-soft transition-transform hover:scale-105"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-whatsapp px-3 py-2 text-xs font-bold text-white"
          >
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-primary"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="border-b border-border/60 py-3 text-sm font-semibold text-foreground last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
