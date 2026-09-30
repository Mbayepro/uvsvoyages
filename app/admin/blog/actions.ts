"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase non configuré");
  }

  return createClient(supabaseUrl, supabaseKey);
}

function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function createArticle(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const published = formData.get("published") === "on";
    const file = formData.get("image") as File;

    if (!title || !content) {
      return { success: false, error: "Titre et contenu requis." };
    }

    const supabase = getAdminSupabase();
    let imageUrl = null;

    // Upload d'image (optionnel)
    if (file && file.size > 0) {
      const fileExt = file.name.split(".").pop();
      const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file);

      if (!uploadError) {
        const { data: { publicUrl } } = supabase.storage.from("gallery").getPublicUrl(fileName);
        imageUrl = publicUrl;
      }
    }

    const slug = generateSlug(title);

    const { error: insertError } = await supabase
      .from("articles")
      .insert([
        { title, slug, content, published, image_url: imageUrl }
      ]);

    if (insertError) {
      return { success: false, error: insertError.message };
    }

    revalidatePath("/conseils");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteArticle(id: string) {
  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase.from("articles").delete().eq("id", id);
    
    if (error) return { success: false, error: error.message };
    
    revalidatePath("/conseils");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
