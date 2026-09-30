import { NextResponse } from "next/server";
import { site } from "@/lib/config/site";

export async function GET() {
  const whatsappRaw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "221786996565";
  const formattedPhone = `+${whatsappRaw}`;
  
  // Format VCard (vcf)
  const vcard = `BEGIN:VCARD
VERSION:3.0
N:Ndiaye;Mouhamed;;;
FN:Mouhamed Ndiaye
ORG:UVS Voyages & Les Élites du Bac
TITLE:Fondateur
TEL;TYPE=CELL,VOICE:${formattedPhone}
TEL;TYPE=WORK,MSG:${formattedPhone}
ADR;TYPE=WORK:;;Afia 1, arrêt Fatou Laobé;Yeumbeul Sud;;;Sénégal
URL:https://uvsvoyage.com
END:VCARD`;

  const response = new NextResponse(vcard);
  response.headers.set("Content-Type", "text/vcard; charset=utf-8");
  response.headers.set("Content-Disposition", 'attachment; filename="Mouhamed_Ndiaye_UVS.vcf"');

  return response;
}
