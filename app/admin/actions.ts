"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Initialisation du client Supabase avec la clé Service Role (Admin)
function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase non configuré");
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function addTestimonial(formData: FormData) {
  try {
    const pays = formData.get("pays") as string;
    const label = formData.get("label") as string;
    const file = formData.get("image") as File;

    if (!pays || !label || !file || file.size === 0) {
      return { success: false, error: "Tous les champs sont requis." };
    }

    const supabase = getAdminSupabase();

    // 1. Uploader l'image dans le bucket 'gallery'
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      return { success: false, error: `Erreur upload: ${uploadError.message}` };
    }

    // 2. Récupérer l'URL publique
    const { data: { publicUrl } } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    // 3. Insérer dans la table testimonials
    const { error: insertError } = await supabase
      .from("testimonials")
      .insert([
        { pays, label, image_url: publicUrl }
      ]);

    if (insertError) {
      return { success: false, error: `Erreur BDD: ${insertError.message}` };
    }

    revalidatePath("/admin/temoignages");
    revalidatePath("/temoignages"); // Actualiser la page publique
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Erreur inconnue" };
  }
}

export async function deleteTestimonial(id: string, imageUrl: string) {
  try {
    const supabase = getAdminSupabase();

    // 1. Supprimer l'image du bucket
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      await supabase.storage.from("gallery").remove([fileName]);
    }

    // 2. Supprimer la ligne de la BDD
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/temoignages");
    revalidatePath("/temoignages");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
