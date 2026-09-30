import { createClient } from "@supabase/supabase-js";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/Section";

export const metadata: Metadata = {
  title: "Conseils & Actualités — UVS Voyages",
  description: "Nos guides et conseils pour réussir vos procédures Campus France, vos demandes de visa pour le Canada et la Belgique.",
};

export const revalidate = 60; // Cache de 60s

async function getArticles() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) return [];

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return data || [];
}

export default async function ConseilsPage() {
  const articles = await getArticles();

  return (
    <>
      <PageHero
        title="Conseils & Guides Pratiques"
        subtitle="Retrouvez toutes les astuces de nos experts pour maximiser vos chances d'admission et de visa."
      />

      <section className="container mx-auto px-4 md:px-8 py-16">
        {articles.length === 0 ? (
          <div className="card-soft p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-primary">Articles à venir</h2>
            <p className="text-muted-foreground mt-2">Nous publierons bientôt de nouveaux guides. Revenez plus tard !</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article: any) => (
              <Link key={article.id} href={`/conseils/${article.slug}`} className="group card-soft flex flex-col overflow-hidden hover:border-primary/30 transition-all">
                {article.image_url ? (
                  <img src={article.image_url} alt={article.title} className="h-48 w-full object-cover transition-transform group-hover:scale-105" />
                ) : (
                  <div className="h-48 w-full bg-muted flex items-center justify-center">
                    <BookOpen className="h-10 w-10 text-muted-foreground" />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-xs font-bold text-accent mb-2">
                    {new Date(article.created_at).toLocaleDateString("fr-FR")}
                  </p>
                  <h3 className="text-xl font-bold text-primary mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-1">
                    {article.content}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:text-accent transition-colors">
                    Lire l'article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
