import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ClientList } from "./ClientList";

export const revalidate = 0;

export default async function AdminBlogPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: articles } = await supabase
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Gestion du Blog / Conseils</h1>
          <p className="text-muted-foreground">Rédigez des articles pour attirer plus d&apos;étudiants via Google.</p>
        </div>
        <Link href="/admin/blog/nouveau" className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-bold text-accent-foreground hover:bg-accent/90">
          <Plus className="h-5 w-5" /> Nouvel Article
        </Link>
      </div>

      <ClientList initialArticles={articles || []} />
    </div>
  );
}
