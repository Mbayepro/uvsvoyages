import { createClient } from "@supabase/supabase-js";
import { site } from "@/lib/config/site";
import { TestimonialsClient } from "./TestimonialsClient";

export const revalidate = 0; // Pas de cache

export default async function AdminTemoignagesPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
        <p className="font-bold">Supabase n&apos;est pas configuré.</p>
      </div>
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: testimonials, error } = await supabase
    .from("testimonials")
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Gestion de la Galerie (Visas & Admissions)</h1>
      <p className="text-muted-foreground">
        Ajoutez ici les captures de visas, d&apos;admissions ou de témoignages qui s&apos;afficheront sur la page publique.
      </p>

      <TestimonialsClient initialData={testimonials || []} countries={[...site.countries]} />
    </div>
  );
}
