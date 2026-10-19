"use client";

import { useState, useEffect } from "react";
import { deleteArticle, togglePublishArticle } from "./actions";
import { Trash2, ExternalLink, Globe, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";

export function ClientList({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    setArticles(initialArticles);
  }, [initialArticles]);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Confirmez-vous la suppression du conseil :\n"${title}" ?`)) return;
    
    setBusyId(id);
    const res = await deleteArticle(id);
    if (res.success) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    } else {
      alert("Erreur lors de la suppression : " + res.error);
    }
    setBusyId(null);
  }

  async function handleToggle(id: string, currentStatus: boolean) {
    setBusyId(id);
    const res = await togglePublishArticle(id, currentStatus);
    if (res.success) {
      setArticles((prev) =>
        prev.map((a) => (a.id === id ? { ...a, published: !currentStatus } : a))
      );
    } else {
      alert("Erreur lors de la modification du statut : " + res.error);
    }
    setBusyId(null);
  }

  if (articles.length === 0) {
    return (
      <div className="card-soft p-12 text-center text-muted-foreground">
        <p className="font-semibold text-primary">Aucun conseil publié pour le moment.</p>
        <p className="mt-1 text-sm">
          Cliquez sur le bouton &quot;Nouvel Article&quot; ci-dessus pour rédiger votre premier conseil.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {articles.map((article) => (
        <div
          key={article.id}
          className="card-soft p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-primary/30"
        >
          <div className="flex items-start sm:items-center gap-4">
            {article.image_url ? (
              <img
                src={article.image_url}
                alt=""
                className="h-16 w-16 md:h-20 md:w-20 rounded-xl object-cover shrink-0 border"
              />
            ) : (
              <div className="h-16 w-16 md:h-20 md:w-20 rounded-xl bg-muted/60 flex items-center justify-center shrink-0 border text-xs text-muted-foreground font-semibold">
                Sans image
              </div>
            )}
            <div>
              <h3 className="font-bold text-primary line-clamp-1 text-base md:text-lg">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                /conseils/{article.slug} · Créé le {new Date(article.created_at).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            {/* Bouton Voir en ligne */}
            <Link
              href={`/conseils/${article.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-xs font-semibold text-primary hover:bg-muted transition-colors"
              title="Voir sur le site public"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Voir</span>
            </Link>

            {/* Statut cliquable */}
            <button
              onClick={() => handleToggle(article.id, article.published)}
              disabled={busyId === article.id}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold transition-all ${
                article.published
                  ? "bg-green-100 text-green-700 hover:bg-green-200"
                  : "bg-amber-100 text-amber-800 hover:bg-amber-200"
              }`}
              title="Cliquer pour changer le statut"
            >
              {article.published ? (
                <>
                  <Globe className="h-3 w-3" /> Public
                </>
              ) : (
                <>
                  <EyeOff className="h-3 w-3" /> Brouillon
                </>
              )}
            </button>

            {/* Supprimer */}
            <button
              onClick={() => handleDelete(article.id, article.title)}
              disabled={busyId === article.id}
              className="rounded-lg p-2 text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50"
              title="Supprimer cet article"
            >
              {busyId === article.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
