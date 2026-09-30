"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

// Fonction côté serveur pour insérer une soumission sans exposer les clés critiques
export async function saveSubmission(subject: string, details: Record<string, any>) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Supabase credentials missing. Submission not saved to DB.");
    return { success: false, error: "Credentials missing" };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const { error } = await supabase.from("submissions").insert([
      {
        subject,
        details, // JSONB column
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return { success: false, error: error.message };
    }

    // ENVOI D'EMAIL AVEC RESEND
    // Si la clé API Resend est configurée, on envoie un email à l'admin et au client s'il a laissé son email.
    if (process.env.RESEND_API_KEY) {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
      const adminEmail = process.env.RESEND_TO_EMAIL || "contact@uvsvoyage.com";
      
      const clientEmail = details["Email"] || details["email"] || details["E-mail"] || null;
      const htmlDetails = Object.entries(details).map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`).join("");

      // 1. Notification à l'admin
      await resend.emails.send({
        from: `UVS Voyages <${fromEmail}>`,
        to: adminEmail,
        subject: `Nouvelle demande : ${subject}`,
        html: `<p>Une nouvelle soumission a été reçue sur le site :</p><ul>${htmlDetails}</ul>`,
      });

      // 2. Email de confirmation au client (s'il a donné son adresse)
      if (clientEmail) {
        await resend.emails.send({
          from: `UVS Voyages <${fromEmail}>`,
          to: clientEmail,
          subject: `Confirmation de votre demande - UVS Voyages`,
          html: `<p>Bonjour,</p><p>Nous avons bien reçu votre demande concernant "<strong>${subject}</strong>".</p><p>Voici le récapitulatif :</p><ul>${htmlDetails}</ul><p>Notre équipe vous recontactera très prochainement (généralement via WhatsApp).</p><p>L'équipe UVS Voyages</p>`,
        });
      }
    }

    return { success: true };
  } catch (err) {
    console.error("Erreur serveur (Supabase/Resend):", err);
    return { success: false, error: String(err) };
  }
}
