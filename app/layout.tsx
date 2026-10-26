import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppButton";
import { AlertBanner } from "@/components/AlertBanner";
import { PageTransitionWrapper } from "@/components/PageTransitionWrapper";
import { site } from "@/lib/config/site";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://uvsvoyage.com"),
  title: {
    default: "UVS Voyages — Union Vision Services",
    template: "%s | UVS Voyages",
  },
  description:
    "Accompagnement Campus France (France, Belgique, Canada) et cours de renforcement pour la Terminale, à Yeumbeul, Sénégal.",
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: "fr_SN",
    siteName: "UVS Voyages",
    images: [
      {
        url: "/uvs-logo.jpg",
        width: 800,
        height: 800,
        alt: "UVS Voyages Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/uvs-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={plusJakarta.variable}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "UVS Voyages",
              image: "https://uvsvoyage.com/uvs-logo.jpg",
              "@id": "https://uvsvoyage.com",
              url: "https://uvsvoyage.com",
              telephone: "+221786996565",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Afia 1, arrêt Fatou Laobé",
                addressLocality: "Yeumbeul Sud",
                addressCountry: "SN",
              },
              founder: {
                "@type": "Person",
                name: "Mouhamed Ndiaye"
              }
            })
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <AlertBanner />
        <Header />
        <main className="flex-1">
          <PageTransitionWrapper>{children}</PageTransitionWrapper>
        </main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
