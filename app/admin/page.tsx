import { createClient } from "@supabase/supabase-js";
import { Users, Calendar, TrendingUp, BookOpen, ImageIcon, Plus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SubmissionsPipeline } from "./SubmissionsPipeline";

export const revalidate = 0; // Pas de cache

export default async function AdminDashboardPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p className="font-bold">Supabase n&apos;est pas configuré.</p>
        <p className="text-sm">Veuillez renseigner vos clés dans les variables d&apos;environnement.</p>
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Récupération simultanée des soumissions, articles et témoignages
  const [submissionsRes, articlesRes, testimonialsRes] = await Promise.all([
    supabase.from("submissions").select("*").order("created_at", { ascending: false }),
    supabase.from("articles").select("id, published"),
    supabase.from("testimonials").select("id"),
  ]);

  const submissions = submissionsRes.data || [];
  const articles = articlesRes.data || [];
  const testimonials = testimonialsRes.data || [];

  // --- STATISTIQUES ---
  const total = submissions.length;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonth = submissions.filter((s) => {
    const d = new Date(s.created_at);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  // Calcul du pays le plus demandé
  const countryCounts: Record<string, number> = {};
  submissions.forEach((sub) => {
    const country = sub.details?.Pays || sub.details?.Destination;
    if (country) {
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    }
  });

  let topCountry = "N/A";
  let maxCount = 0;
  for (const [c, count] of Object.entries(countryCounts)) {
    if (count > maxCount) {
      maxCount = count;
      topCountry = c;
    }
  }

  const publishedArticlesCount = articles.filter((a) => a.published).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos demandes d&apos;étudiants, vos conseils et votre galerie de visas.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blog/nouveau"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-bold text-accent-foreground hover:bg-accent/90 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" /> Rédiger un conseil
          </Link>
          <Link
            href="/admin/temoignages"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90 transition-all shadow-sm"
          >
            <ImageIcon className="h-4 w-4" /> Ajouter un visa
          </Link>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-soft p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Demandes</p>
            <p className="text-2xl font-bold text-primary">{total}</p>
          </div>
        </div>

        <div className="card-soft p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Ce mois-ci</p>
            <p className="text-2xl font-bold text-primary">{thisMonth}</p>
          </div>
        </div>

        <div className="card-soft p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Top Destination</p>
            <p className="text-2xl font-bold text-primary truncate max-w-[140px]">{topCountry}</p>
          </div>
        </div>

        <div className="card-soft p-5 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Conseils en ligne</p>
            <p className="text-2xl font-bold text-primary">{publishedArticlesCount}</p>
          </div>
        </div>
      </div>

      {/* Raccourcis Rapides */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-soft p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-primary font-bold text-lg">
                <BookOpen className="h-5 w-5 text-accent" /> Conseils & Blog
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
                {articles.length} article(s)
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Publiez des guides pour Campus France, les visas et le logement pour être premier sur Google.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/admin/blog"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              Voir tous les conseils <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="card-soft p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-primary font-bold text-lg">
                <ImageIcon className="h-5 w-5 text-accent" /> Galerie de Témoignages
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent/20 text-accent-foreground">
                {testimonials.length} visa(s)
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Mettez en valeur les visas obtenus et les attestations pour rassurer vos futurs étudiants.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Link
              href="/admin/temoignages"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-accent transition-colors"
            >
              Gérer la galerie <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-primary">Gestion des Prospects & Demandes</h2>
        </div>
        <SubmissionsPipeline initialSubmissions={submissions} />
      </div>
    </div>
  );
}
