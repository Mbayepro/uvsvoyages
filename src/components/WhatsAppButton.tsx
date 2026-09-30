import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { site } from "@/config/site";

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
