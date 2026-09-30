import { Link } from "@tanstack/react-router";
import logo from "@/assets/uvs-logo.jpg.asset.json";
import { nav, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="Logo UVS Voyages" className="h-14 w-14 rounded-full object-cover" />
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
              <li key={item.to}>
                <Link to={item.to} className="opacity-80 transition-opacity hover:opacity-100">
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
              <a href={site.tiktok} target="_blank" rel="noreferrer">
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-xs opacity-70 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. Tous droits réservés.
          </p>
          <p>
            {site.ninea} · {site.rccm}
          </p>
        </div>
      </div>
    </footer>
  );
}
