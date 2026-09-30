import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/config/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

/**
 * Footer Server Component — identique visuellement à l'original.
 * Utilise next/image pour le logo et next/link pour la navigation.
 */
export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/uvs-logo.jpg"
              alt="Logo UVS Voyages"
              width={56}
              height={56}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-extrabold">UVS VOYAGES</p>
              <p className="text-sm text-accent">{site.legalName}</p>
            </div>
          </div>
          <p className="mt-4 text-sm opacity-80">{site.slogan}</p>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="opacity-80 transition-opacity hover:opacity-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Contact</p>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>{site.address}</li>
            <li>
              <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <a
                href={site.tiktok}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={site.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs opacity-70 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. Tous droits réservés.</p>
          <p>{site.ninea} · {site.rccm}</p>
        </div>
      </div>
    </footer>
  );
}
