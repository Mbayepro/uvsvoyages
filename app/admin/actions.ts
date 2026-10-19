"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Initialisation du client Supabase avec la clé Service Role (Admin)
function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase non configuré. Veuillez vérifier vos identifiants dans .env.");
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function addTestimonial(formData: FormData) {
  try {
    const pays = (formData.get("pays") as string)?.trim();
    const label = (formData.get("label") as string)?.trim();
    const file = formData.get("image") as File | null;

    if (!pays || !label || !file || file.size === 0) {
      return { success: false, error: "Veuillez renseigner le pays, le titre et sélectionner une image." };
    }

    const supabase = getAdminSupabase();

    // 1. Conversion du fichier en Buffer Node.js (évite tout blocage de stream / freeze)
    const originalName = file.name || "visa.jpg";
    const fileExt = (originalName.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const fileName = `visa-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 2. Upload dans le bucket 'gallery'
    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      return { success: false, error: `Erreur stockage image : ${uploadError.message}` };
    }

    // 3. Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    // 4. Insérer dans la table testimonials
    const { data: inserted, error: insertError } = await supabase
      .from("testimonials")
      .insert([
        { pays, label, image_url: publicUrl }
      ])
      .select()
      .single();

    if (insertError) {
      return { success: false, error: `Erreur base de données : ${insertError.message}` };
    }

    revalidatePath("/admin/temoignages");
    revalidatePath("/temoignages"); // Actualiser la page publique
    return { success: true, item: inserted };
  } catch (err: any) {
    return { success: false, error: err?.message || "Une erreur inattendue est survenue lors de l'enregistrement." };
  }
}

export async function deleteTestimonial(id: string, imageUrl: string) {
  try {
    const supabase = getAdminSupabase();

    // 1. Supprimer l'image du bucket si elle est stockée sur Supabase
    if (imageUrl && imageUrl.includes("/gallery/")) {
      const fileName = imageUrl.split("/").pop();
      if (fileName) {
        await supabase.storage.from("gallery").remove([fileName]);
      }
    }

    // 2. Supprimer la ligne de la BDD
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      return { success: false, error: `Erreur suppression BDD : ${error.message}` };
    }

    revalidatePath("/admin/temoignages");
    revalidatePath("/temoignages");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Erreur lors de la suppression." };
  }
}
