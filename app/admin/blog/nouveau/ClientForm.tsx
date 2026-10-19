"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle } from "../actions";
import { Loader2, ImagePlus, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function ClientForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const res = await createArticle(formData);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/blog");
          router.refresh();
        }, 800);
      } else {
        setError(res.error || "Une erreur est survenue lors de l'enregistrement.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err?.message || "Erreur réseau ou serveur.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="card-soft p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à la liste
        </Link>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-primary">
          Titre du conseil / article <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          required
          placeholder="ex: Comment réussir son entretien Campus France à Dakar ?"
        />
        <p className="mt-1 text-xs text-muted-foreground">
          Un bon titre commence souvent par &quot;Comment...&quot;, &quot;Guide complet...&quot; ou &quot;Les 5 erreurs à éviter...&quot;.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-primary">
          Contenu détaillé du conseil <span className="text-red-500">*</span>
        </label>
        <textarea
          name="content"
          rows={12}
          className="w-full rounded-xl border border-input bg-background p-4 text-sm leading-relaxed focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
          required
          placeholder="Rédigez ici vos conseils, étapes, astuces, recommandations pour vos étudiants..."
        ></textarea>
        <p className="mt-1 text-xs text-muted-foreground">
          Les sauts de ligne et paragraphes seront automatiquement respectés à l&apos;affichage.
        </p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-bold text-primary">
          Photo d&apos;illustration (Optionnelle)
        </label>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
            <ImagePlus className="h-5 w-5 text-accent" />
            <span>Choisir une image</span>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          <span className="text-xs text-muted-foreground">
            Formats acceptés : JPG, PNG, WEBP (idéal format horizontal)
          </span>
        </div>

        {preview && (
          <div className="mt-4 relative inline-block">
            <img
              src={preview}
              alt="Aperçu sélectionné"
              className="h-44 w-auto max-w-full rounded-xl object-cover border shadow-sm"
            />
            <button
              type="button"
              onClick={() => setPreview(null)}
              className="absolute top-2 right-2 rounded-full bg-black/60 px-2 py-1 text-xs font-bold text-white hover:bg-black"
            >
              Retirer
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 rounded-xl bg-muted/40 p-3">
        <input
          type="checkbox"
          name="published"
          id="published"
          defaultChecked
          className="h-4 w-4 rounded accent-primary cursor-pointer"
        />
        <label htmlFor="published" className="text-sm font-semibold text-primary cursor-pointer select-none">
          Publier immédiatement sur le site (visible par les étudiants et sur Google)
        </label>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <span>Article enregistré avec succès ! Redirection en cours...</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || success}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-white shadow-soft hover:bg-primary/95 disabled:opacity-50 transition-all"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Enregistrement en cours...</span>
          </>
        ) : (
          <span>Publier le conseil</span>
        )}
      </button>
    </form>
  );
}
