import { createClient } from "@supabase/supabase-js";
import { Users, Calendar, TrendingUp } from "lucide-react";

export const revalidate = 0; // Pas de cache

export default async function AdminDashboardPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p className="font-bold">Supabase n&apos;est pas configuré.</p>
        <p className="text-sm">Veuillez renseigner vos clés dans .env.local.</p>
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: submissions, error } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p className="font-bold">Erreur de chargement :</p>
        <p className="text-sm">{error.message}</p>
      </div>
    );
  }

  // --- STATISTIQUES ---
  const total = submissions?.length || 0;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const thisMonth = submissions?.filter(s => {
    const d = new Date(s.created_at);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length || 0;

  // Calcul du pays le plus demandé
  const countryCounts: Record<string, number> = {};
  submissions?.forEach(sub => {
    // Les clés peuvent varier selon les formulaires (Pays, Destination, etc.)
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary">Tableau de Bord</h1>
        <p className="text-muted-foreground mt-1">
          Aperçu de l&apos;activité et des soumissions récentes.
        </p>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-soft p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Total Demandes</p>
            <p className="text-2xl font-bold text-primary">{total}</p>
          </div>
        </div>
        <div className="card-soft p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Ce mois-ci</p>
            <p className="text-2xl font-bold text-primary">{thisMonth}</p>
          </div>
        </div>
        <div className="card-soft p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Pays Tendance</p>
            <p className="text-2xl font-bold text-primary truncate max-w-[150px]">{topCountry}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-primary mt-8">Dernières Soumissions</h2>

      {(!submissions || submissions.length === 0) ? (
        <div className="card-soft p-12 text-center text-muted-foreground">
          Aucune soumission pour le moment.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {submissions.map((sub: any) => (
            <div key={sub.id} className="card-soft flex flex-col p-6 shadow-sm">
              <div className="mb-4 border-b pb-4">
                <span className="inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-bold text-accent-foreground mb-2">
                  {sub.subject}
                </span>
                <p className="text-xs text-muted-foreground">
                  {new Date(sub.created_at).toLocaleString("fr-FR")}
                </p>
              </div>
              <div className="flex-1 space-y-2 text-sm">
                {sub.details &&
                  Object.entries(sub.details).map(([key, val]) => (
                    <div key={key}>
                      <span className="font-semibold text-primary">{key}:</span> {String(val)}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
