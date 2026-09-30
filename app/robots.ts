import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://uvsvoyage.com"; // À remplacer par le vrai domaine

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"], // Empêcher l'indexation de l'espace admin
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
