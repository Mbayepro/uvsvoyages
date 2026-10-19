"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getAdminSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase non configuré. Veuillez vérifier vos clés dans les variables d'environnement.");
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
    const title = (formData.get("title") as string)?.trim();
    const content = (formData.get("content") as string)?.trim();
    const published = formData.get("published") === "on";
    const file = formData.get("image") as File | null;

    if (!title || !content) {
      return { success: false, error: "Le titre et le contenu de l'article sont obligatoires." };
    }

    const supabase = getAdminSupabase();
    let imageUrl: string | null = null;

    // Upload d'image de couverture si fournie
    if (file && typeof file === "object" && file.size > 0) {
      try {
        const originalName = file.name || "image.jpg";
        const fileExt = (originalName.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
        const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(fileName, buffer, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          });

        if (uploadError) {
          console.error("Avertissement upload image blog:", uploadError.message);
        } else {
          const { data: { publicUrl } } = supabase.storage
            .from("gallery")
            .getPublicUrl(fileName);
          imageUrl = publicUrl;
        }
      } catch (errUpload) {
        console.error("Exception upload image blog:", errUpload);
      }
    }

    // Génération d'un slug propre et garanti unique
    let baseSlug = generateSlug(title);
    if (!baseSlug) {
      baseSlug = `conseil-${Date.now().toString().slice(-6)}`;
    }

    let slug = baseSlug;
    const { data: existing } = await supabase
      .from("articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();

    if (existing) {
      slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
    }

    const { error: insertError } = await supabase
      .from("articles")
      .insert([
        {
          title,
          slug,
          content,
          published,
          image_url: imageUrl,
        },
      ]);

    if (insertError) {
      return { success: false, error: `Erreur base de données : ${insertError.message}` };
    }

    revalidatePath("/conseils");
    revalidatePath(`/conseils/${slug}`);
    revalidatePath("/admin/blog");
    return { success: true, slug };
  } catch (err: any) {
    return { success: false, error: err?.message || "Erreur inconnue lors de la création de l'article." };
  }
}

export async function deleteArticle(id: string) {
  try {
    const supabase = getAdminSupabase();
    
    // Récupérer l'article pour supprimer son image du storage si présente
    const { data: article } = await supabase
      .from("articles")
      .select("image_url")
      .eq("id", id)
      .maybeSingle();

    if (article?.image_url && article.image_url.includes("/gallery/")) {
      const fileName = article.image_url.split("/").pop();
      if (fileName) {
        await supabase.storage.from("gallery").remove([fileName]);
      }
    }

    const { error } = await supabase.from("articles").delete().eq("id", id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/conseils");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Erreur lors de la suppression." };
  }
}

export async function togglePublishArticle(id: string, currentStatus: boolean) {
  try {
    const supabase = getAdminSupabase();
    const { error } = await supabase
      .from("articles")
      .update({ published: !currentStatus })
      .eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/conseils");
    revalidatePath("/admin/blog");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Erreur lors de la mise à jour." };
  }
}
