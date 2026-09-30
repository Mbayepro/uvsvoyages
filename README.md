# UVS Voyages — Union Vision Services

Site vitrine migré de **Lovable (TanStack Start)** vers **Next.js 15 App Router**.

## Stack technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Style** : Tailwind CSS v3 + variables CSS oklch
- **Police** : Plus Jakarta Sans via `next/font/google`
- **Images** : `next/image` (optimisation automatique)

## Démarrage rapide

```bash
# 1. Copier les variables d'environnement
cp .env.example .env.local

# 2. Renseigner NEXT_PUBLIC_WHATSAPP_NUMBER dans .env.local

# 3. Installer les dépendances
npm install

# 4. Lancer le serveur de développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure

```
app/                    # Pages (App Router)
  layout.tsx            # Layout racine (Header, Footer, WhatsApp)
  page.tsx              # Accueil /
  uvs-voyages/          # Route /uvs-voyages
  elites-du-bac/        # Route /elites-du-bac
  temoignages/          # Route /temoignages
  a-propos/             # Route /a-propos
  contact/              # Route /contact
  sitemap.ts            # Sitemap automatique

components/             # Composants partagés
  Header.tsx            # "use client" — menu burger + lien actif
  Footer.tsx            # Server Component
  Section.tsx           # Section, SectionTitle, PageHero
  SimpleForm.tsx        # "use client" — formulaire → WhatsApp
  Accordion.tsx         # "use client" — FAQ
  ProfileTabs.tsx       # "use client" — onglets pièces
  GalleryModal.tsx      # "use client" — galerie + zoom
  WhatsAppButton.tsx    # Bouton flottant
  WhatsAppIcon.tsx      # SVG WhatsApp

lib/
  config/site.ts        # ⭐ Configuration centrale unique
  utils.ts              # cn() helper

public/
  favicon.png           # Favicon
  uvs-logo.jpg          # Logo (à placer manuellement)
  robots.txt
```

## Configuration centrale

Tous les textes, tarifs et coordonnées sont dans [`lib/config/site.ts`](lib/config/site.ts).  
**Ne jamais modifier les tarifs dans les pages — toujours passer par ce fichier.**

## Variables d'environnement

| Variable | Description | Côté |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Numéro WhatsApp (ex: `221786996565`) | Client |
| `NEXT_PUBLIC_SUPABASE_URL` | URL Supabase *(étape 2)* | Client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon Supabase *(étape 2)* | Client |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service role *(étape 2)* | **Serveur uniquement** |

## Déploiement Vercel

```bash
vercel --prod
```

Configurer les variables d'environnement dans le dashboard Vercel avant le déploiement.

---

Fondateur : **Mouhamed Ndiaye** — Union Vision Services, Yeumbeul Sud, Dakar, Sénégal.
