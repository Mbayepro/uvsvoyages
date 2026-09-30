-- Schéma SQL pour Supabase (Étape 2)
-- Copiez-collez ce code dans l'éditeur SQL de votre dashboard Supabase

-- 1. Table des soumissions (Formulaires de contact et inscriptions)
CREATE TABLE IF NOT EXISTS public.submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  subject text NOT NULL,
  details jsonb NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activation de RLS (Row Level Security) sur les soumissions
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut insérer une soumission (si on utilise la clé anon côté serveur/client)
CREATE POLICY "Enable insert for everyone" ON public.submissions
  FOR INSERT WITH CHECK (true);

-- Politique : seuls les admins (utilisateurs authentifiés) peuvent lire les soumissions
CREATE POLICY "Enable read for authenticated users only" ON public.submissions
  FOR SELECT TO authenticated USING (true);


-- 2. Table pour la galerie de témoignages / captures de visa
CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  pays text NOT NULL, -- ex: 'France', 'Belgique', 'Canada'
  label text NOT NULL, -- ex: 'Visa étudiant', 'Admission'
  image_url text NOT NULL, -- URL de l'image stockée dans le bucket
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activation de RLS sur la galerie
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut lire la galerie
CREATE POLICY "Enable read access for all users" ON public.testimonials
  FOR SELECT USING (true);

-- Politique : seuls les admins peuvent modifier la galerie
CREATE POLICY "Enable insert for authenticated users only" ON public.testimonials
  FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Enable update for authenticated users only" ON public.testimonials
  FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Enable delete for authenticated users only" ON public.testimonials
  FOR DELETE TO authenticated USING (true);


-- 3. Bucket Storage pour les images de la galerie
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery', 'gallery', true) ON CONFLICT DO NOTHING;

-- Politiques de sécurité pour le bucket
CREATE POLICY "Images publiques" ON storage.objects FOR SELECT USING (bucket_id = 'gallery');
CREATE POLICY "Admins peuvent uploader" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'gallery');
CREATE POLICY "Admins peuvent supprimer" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'gallery');


-- ==========================================
-- OPTION 3 : BLOG / CONSEILS
-- ==========================================

CREATE TABLE IF NOT EXISTS public.articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  image_url text,
  published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Activation de RLS sur la table articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Politique : tout le monde peut lire les articles publiés
CREATE POLICY "Enable read access for all users on published articles" ON public.articles
  FOR SELECT USING (published = true);

-- Politique : seuls les admins peuvent gérer les articles
CREATE POLICY "Enable all access for admins" ON public.articles
  FOR ALL USING (true) WITH CHECK (true);

