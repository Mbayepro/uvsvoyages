import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/lib/config/site";

/**
 * Bouton flottant WhatsApp — positionné en bas à droite, z-index 50.
 * Composant client car il s'affiche sur toutes les pages.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={site.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Écrire sur WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-strong transition-transform hover:scale-110"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
