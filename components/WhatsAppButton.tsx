import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/config/site";

/**
 * Bouton flottant WhatsApp — positionné en bas à droite, z-index 50.
 * Composant client car il s'affiche sur toutes les pages.
 */
export function WhatsAppFloat() {
  return (
    <>
      <div className="fixed bottom-4 left-4 right-24 z-40 md:hidden flex pointer-events-auto">
        <a 
          href={site.whatsapp} 
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 font-bold text-white shadow-strong transition-transform hover:scale-105"
        >
          Démarrer ma procédure
        </a>
      </div>

      <a
        href={site.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Écrire sur WhatsApp"
        className="fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-strong transition-transform hover:scale-110 md:bottom-5 md:right-5"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </>
  );
}
