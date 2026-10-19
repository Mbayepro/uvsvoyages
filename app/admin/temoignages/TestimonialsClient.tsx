"use client";

import { useState, useRef, useEffect } from "react";
import { addTestimonial, deleteTestimonial } from "../actions";
import { Trash2, Upload, Plus, ImagePlus, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function TestimonialsClient({
  initialData,
  countries,
}: {
  initialData: any[];
  countries: string[];
}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setError("");
    } else {
      setPreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await addTestimonial(formData);

      if (res.success && res.item) {
        setData((prev) => [res.item, ...prev]);
        formRef.current?.reset();
        setPreview(null);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 4000);
        router.refresh();
      } else {
        setError(res.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (err: any) {
      setError(err?.message || "Erreur de connexion lors de l'upload.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string, imageUrl: string, label: string) {
    if (!confirm(`Supprimer définitivement la photo "${label}" ?`)) return;

    setDeletingId(id);
    try {
      const res = await deleteTestimonial(id, imageUrl);
      if (res.success) {
        setData((prev) => prev.filter((d) => d.id !== id));
        router.refresh();
      } else {
        alert(`Erreur : ${res.error}`);
      }
    } catch (err: any) {
      alert(`Erreur lors de la suppression : ${err?.message}`);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Formulaire d'ajout */}
      <div className="lg:col-span-1">
        <div className="card-soft p-6 sticky top-24 space-y-4">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            <Plus className="h-5 w-5 text-accent" /> Ajouter un visa / admission
          </h2>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-primary">
                Pays de destination <span className="text-red-500">*</span>
              </label>
              <select
                name="pays"
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
                required
              >
                <option value="">Sélectionner un pays...</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Autre">Autre destination</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-primary">
                Légende / Titre court <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="label"
                placeholder="ex: Visa France — Université de Paris"
                className="w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-primary">
                Photo du visa ou de l&apos;attestation <span className="text-red-500">*</span>
              </label>
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 p-4 text-center hover:bg-primary/10 transition">
                <ImagePlus className="h-7 w-7 text-accent mb-1" />
                <span className="text-xs font-semibold text-primary">
                  {preview ? "Changer la photo" : "Choisir une photo"}
                </span>
                <span className="text-[11px] text-muted-foreground mt-0.5">
                  JPG, PNG ou WEBP
                </span>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  required
                />
              </label>

              {preview && (
                <div className="mt-3 relative">
                  <img
                    src={preview}
                    alt="Aperçu sélectionné"
                    className="aspect-[4/3] w-full rounded-xl object-cover border shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      if (formRef.current) {
                        const input = formRef.current.querySelector('input[type="file"]') as HTMLInputElement;
                        if (input) input.value = "";
                      }
                    }}
                    className="absolute top-2 right-2 rounded-full bg-black/70 px-2 py-0.5 text-xs font-bold text-white hover:bg-black"
                  >
                    Retirer
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-xs font-semibold text-green-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600" />
                <span>Image ajoutée avec succès à la galerie !</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-accent px-4 py-3 font-bold text-accent-foreground flex items-center justify-center gap-2 shadow-sm hover:bg-accent/90 disabled:opacity-50 transition"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Upload en cours...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" /> Enregistrer le visa
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Liste des images existantes */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">
            Galerie Actuelle ({data.length})
          </h2>
          <span className="text-xs text-muted-foreground">
            Bouton de suppression rouge visible sur chaque photo
          </span>
        </div>

        {data.length === 0 ? (
          <div className="card-soft p-12 text-center text-muted-foreground">
            <p className="font-semibold text-primary">Aucun visa dans la galerie pour l&apos;instant.</p>
            <p className="mt-1 text-sm">
              Utilisez le formulaire à gauche pour ajouter vos premières preuves d&apos;obtention de visa.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.map((item) => (
              <div
                key={item.id}
                className="relative group rounded-xl overflow-hidden border border-border bg-card shadow-sm flex flex-col justify-between"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  <img
                    src={item.image_url}
                    alt={item.label}
                    className="h-full w-full object-cover"
                  />

                  {/* Bouton Supprimer TOUJOURS visible (adapté mobile et desktop) */}
                  <button
                    onClick={() => handleDelete(item.id, item.image_url, item.label)}
                    disabled={deletingId === item.id}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-all active:scale-95 disabled:opacity-50"
                    title="Supprimer cette image"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>

                <div className="p-2.5 bg-background border-t">
                  <p className="text-xs font-bold text-accent uppercase tracking-wide">
                    {item.pays}
                  </p>
                  <p className="text-xs font-semibold text-primary truncate" title={item.label}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
