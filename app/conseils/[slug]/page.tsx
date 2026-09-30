import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

async function getArticle(slug: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return null;

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  return data;
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const article = await getArticle(params.slug);
  if (!article) return { title: "Article introuvable" };

  return {
    title: `${article.title} — Conseils UVS Voyages`,
    description: article.content.substring(0, 160) + "...",
  };
}

export default async function ArticlePage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
      <Link href="/conseils" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour aux conseils
      </Link>

      {article.image_url && (
        <img src={article.image_url} alt={article.title} className="w-full h-[40vh] md:h-[50vh] object-cover rounded-3xl mb-8 shadow-sm" />
      )}

      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-bold text-accent mb-4">
          Publié le {new Date(article.created_at).toLocaleDateString("fr-FR")}
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-8 leading-tight">
          {article.title}
        </h1>
        
        {/* Affichage basique du contenu avec sauts de ligne */}
        <div className="prose prose-lg max-w-none text-muted-foreground whitespace-pre-wrap">
          {article.content}
        </div>
      </div>
    </article>
  );
}
