"use client";

import { useState, useRef } from "react";
import { addTestimonial, deleteTestimonial } from "../actions";
import { Trash2, Upload, Plus } from "lucide-react";

export function TestimonialsClient({ initialData, countries }: { initialData: any[], countries: string[] }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await addTestimonial(formData);
    
    if (res.success) {
      formRef.current?.reset();
      // On recharge la page pour voir le nouveau
      window.location.reload();
    } else {
      setError(res.error || "Une erreur est survenue");
    }
    setLoading(false);
  }

  async function handleDelete(id: string, imageUrl: string) {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return;
    
    const res = await deleteTestimonial(id, imageUrl);
    if (res.success) {
      setData(data.filter(d => d.id !== id));
    } else {
      alert(`Erreur: ${res.error}`);
    }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Formulaire d'ajout */}
      <div className="lg:col-span-1">
        <div className="card-soft p-6 sticky top-24">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
            <Plus className="h-5 w-5" /> Ajouter une image
          </h2>
          
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-primary">Pays</label>
              <select name="pays" className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none" required>
                <option value="">Sélectionner...</option>
                {countries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-semibold text-primary">Label (Titre court)</label>
              <input type="text" name="label" placeholder="ex: Admission UVS" className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none" required />
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-primary">Image</label>
              <input type="file" name="image" accept="image/*" className="w-full rounded-xl border border-input bg-background px-4 py-2 text-sm outline-none" required />
            </div>

            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-accent px-4 py-3 font-bold text-accent-foreground flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? "Upload en cours..." : <><Upload className="h-4 w-4"/> Enregistrer</>}
            </button>
          </form>
        </div>
      </div>

      {/* Liste des images existantes */}
      <div className="lg:col-span-2">
        <h2 className="text-xl font-bold text-primary mb-4">Galerie Actuelle ({data.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {data.map((item) => (
            <div key={item.id} className="relative group rounded-xl overflow-hidden border">
              <img src={item.image_url} alt={item.label} className="aspect-[3/4] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-white text-xs">
                <p className="font-bold">{item.pays}</p>
                <p>{item.label}</p>
              </div>
              <button
                onClick={() => handleDelete(item.id, item.image_url)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                title="Supprimer"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          {data.length === 0 && (
            <p className="text-muted-foreground col-span-full">Aucun témoignage trouvé.</p>
          )}
        </div>
      </div>
    </div>
  );
}
