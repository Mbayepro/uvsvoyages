"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "../actions";

export function ClientForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await createArticle(formData);

    if (res.success) {
      router.push("/admin/blog");
    } else {
      setError(res.error || "Erreur inconnue");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-soft p-6 space-y-4">
      <div>
        <label className="mb-1 block text-sm font-semibold text-primary">Titre</label>
        <input type="text" name="title" className="w-full rounded-xl border border-input bg-background px-4 py-2" required placeholder="ex: Comment réussir son entretien Campus France ?" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-primary">Contenu (Texte)</label>
        <textarea name="content" rows={10} className="w-full rounded-xl border border-input bg-background px-4 py-2" required placeholder="Écrivez votre article ici..."></textarea>
      </div>

      <div>
        <label className="mb-1 block text-sm font-semibold text-primary">Image de couverture (Optionnel)</label>
        <input type="file" name="image" accept="image/*" className="w-full rounded-xl border border-input bg-background px-4 py-2" />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" name="published" id="published" defaultChecked className="h-4 w-4" />
        <label htmlFor="published" className="text-sm font-semibold text-primary">Publier immédiatement</label>
      </div>

      {error && <p className="text-red-500 font-semibold">{error}</p>}

      <button type="submit" disabled={loading} className="w-full rounded-xl bg-primary px-6 py-3 font-bold text-white hover:bg-primary/90 disabled:opacity-50">
        {loading ? "Enregistrement..." : "Enregistrer l'article"}
      </button>
    </form>
  );
}
