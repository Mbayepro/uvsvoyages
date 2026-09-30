import { Metadata } from "next";
import Link from "next/link";
import { Download, MapPin, Phone, ArrowLeft, Globe, Share2 } from "lucide-react";
import { site } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "Carte Digitale — Mouhamed Ndiaye",
  description: "Contactez Mouhamed Ndiaye, fondateur de UVS Voyages et Les Élites du Bac.",
};

export default function CarteDigitalePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "221786996565";
  
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 flex flex-col items-center justify-center">
      <Link href="/" className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>

      <div className="w-full max-w-sm card-soft p-8 text-center relative overflow-hidden">
        {/* Décoration en arrière-plan */}
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-accent/20 blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>

        {/* Avatar Placeholder (Logo) */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary text-white shadow-xl">
          <span className="text-3xl font-bold tracking-tighter">UVS</span>
        </div>

        <h1 className="text-2xl font-bold text-primary">Mouhamed Ndiaye</h1>
        <p className="font-semibold text-accent mt-1">Fondateur</p>
        <p className="text-sm text-muted-foreground mt-2">
          UVS Voyages & Les Élites du Bac
        </p>

        <div className="mt-8 space-y-4 text-sm text-left">
          <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-background p-3 hover:bg-muted/50 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-primary">Téléphone / WhatsApp</p>
              <p className="text-muted-foreground">+{whatsappNumber}</p>
            </div>
          </a>

          <div className="flex items-center gap-3 rounded-xl bg-background p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-primary">Adresse</p>
              <p className="text-muted-foreground">{site.address}</p>
            </div>
          </div>
          
          <Link href="/" className="flex items-center gap-3 rounded-xl bg-background p-3 hover:bg-muted/50 transition">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-primary">Site Web</p>
              <p className="text-muted-foreground">Visiter uvsvoyages.com</p>
            </div>
          </Link>
        </div>

        <div className="mt-8">
          <a
            href="/api/vcard"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-primary/90"
          >
            <Download className="h-5 w-5" />
            Enregistrer le contact
          </a>
        </div>
      </div>
    </div>
  );
}
