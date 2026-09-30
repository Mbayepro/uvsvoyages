"use client";

import { useState } from "react";
import { deleteArticle } from "./actions";
import { Trash2 } from "lucide-react";

export function ClientList({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    const res = await deleteArticle(id);
    if (res.success) {
      setArticles(articles.filter(a => a.id !== id));
    } else {
      alert("Erreur: " + res.error);
    }
  }

  if (articles.length === 0) {
    return <div className="card-soft p-12 text-center text-muted-foreground">Aucun article publié.</div>;
  }

  return (
    <div className="grid gap-4">
      {articles.map(article => (
        <div key={article.id} className="card-soft p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {article.image_url && <img src={article.image_url} alt="" className="h-16 w-16 rounded-lg object-cover" />}
            <div>
              <h3 className="font-bold text-primary">{article.title}</h3>
              <p className="text-xs text-muted-foreground">/{article.slug} — {new Date(article.created_at).toLocaleDateString("fr-FR")}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${article.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
              {article.published ? "Public" : "Brouillon"}
            </span>
            <button onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-700 p-2">
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
