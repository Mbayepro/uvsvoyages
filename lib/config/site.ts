/**
 * Configuration centrale du site UVS Voyages — Union Vision Services.
 * Toutes les données textuelles, tarifs et coordonnées sont ici.
 * Le numéro WhatsApp vient de la variable d'environnement NEXT_PUBLIC_WHATSAPP_NUMBER.
 */

const waNumber =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "221786996565";

export const site = {
  name: "UVS Voyages",
  legalName: "Union Vision Services",
  slogan: "Voyager · Étudier · Réussir",
  founder: "Mouhamed Ndiaye",
  phoneDisplay: "78 699 65 65",
  phoneTel: "+221786996565",
  whatsapp: `https://wa.me/${waNumber}`,
  email: "servicesunionvision@gmail.com",
  address: "Yeumbeul Sud, Afia 1, arrêt Fatou Laobé, Sise Kognou Guéwël",
  tiktok: "https://www.tiktok.com/@uvsvoyages",
  ninea: "NINEA : à compléter",
  rccm: "RCCM : à compléter",
  successRate: "84,21 %",
  countries: ["France", "Belgique", "Canada"],
} as const;

export const nav = [
  { href: "/", label: "Accueil" },
  { href: "/uvs-voyages", label: "UVS Voyages" },
  { href: "/elites-du-bac", label: "Élites du Bac" },
  { href: "/temoignages", label: "Témoignages" },
  { href: "/conseils", label: "Conseils" },
  { href: "/contact", label: "Contact" },
] as const;

export const voyagesServices = [
  {
    title: "Création et suivi du dossier Campus France",
    text: "Ouverture du compte, saisie des informations et vérification complète du dossier.",
  },
  {
    title: "Choix des formations",
    text: "Sélection de vœux cohérents avec votre profil, votre niveau et votre budget.",
  },
  {
    title: "Lettres de motivation",
    text: "Rédaction et relecture de vos lettres pour chaque établissement visé.",
  },
  {
    title: "Préparation à l'entretien",
    text: "Simulations d'entretien Campus France et conseils personnalisés.",
  },
  {
    title: "Dossier de visa",
    text: "Constitution du dossier, prise de rendez-vous et vérification des pièces.",
  },
  {
    title: "Préparation au départ",
    text: "Logement, assurance, arrivée : nous restons présents jusqu'au voyage.",
  },
];

export const voyagesSteps = [
  { step: "01", title: "Premier échange", text: "Nous étudions votre profil et vos objectifs d'études." },
  { step: "02", title: "Ouverture du dossier", text: "Création du compte Campus France et collecte des pièces." },
  { step: "03", title: "Saisie des vœux", text: "Choix des formations et rédaction des lettres de motivation." },
  { step: "04", title: "Entretien", text: "Préparation et passage de l'entretien Campus France." },
  { step: "05", title: "Réponses des établissements", text: "Analyse des réponses et choix de l'établissement." },
  { step: "06", title: "Demande de visa", text: "Dossier visa, rendez-vous et suivi jusqu'à la décision." },
];

export const voyagesTarifs = [
  { label: "Accompagnement UVS Voyages", price: "60 000 FCFA" },
  { label: "Frais Campus France", price: "85 200 FCFA" },
  { label: "Prise de rendez-vous", price: "15 000 FCFA" },
  { label: "Frais de visa", price: "33 000 FCFA" },
];

export const piecesParProfil = [
  {
    id: "terminale",
    label: "Élèves de Terminale",
    items: [
      "Bulletins de Seconde, Première et Terminale",
      "Attestation de scolarité de l'année en cours",
      "Relevé de notes du BFEM",
      "Extrait de naissance",
      "Passeport en cours de validité",
      "Photo d'identité récente",
    ],
  },
  {
    id: "bacheliers",
    label: "Bacheliers",
    items: [
      "Relevé de notes du Baccalauréat",
      "Attestation ou diplôme du Baccalauréat",
      "Bulletins de Première et Terminale",
      "Extrait de naissance",
      "Passeport en cours de validité",
      "Photo d'identité récente",
    ],
  },
  {
    id: "licence3",
    label: "Étudiants en Licence 3",
    items: [
      "Relevés de notes de L1, L2 et L3",
      "Attestation d'inscription universitaire",
      "Attestation du Baccalauréat",
      "Extrait de naissance",
      "Passeport en cours de validité",
      "CV et lettre de motivation",
    ],
  },
];

export const visaDocuments = [
  {
    id: "obligatoires",
    label: "Obligatoires",
    items: [
      "Passeport valide (+ copies)",
      "Formulaire de demande de visa rempli",
      "Attestation Campus France (acceptation)",
      "Justificatif de ressources financières",
      "Attestation d'hébergement ou réservation de logement",
      "Photos d'identité aux normes",
    ],
  },
  {
    id: "recommandes",
    label: "Recommandés",
    items: [
      "Assurance voyage / santé",
      "Réservation de billet d'avion (non payée)",
      "Relevés bancaires des 3 derniers mois",
      "Attestation de prise en charge du garant",
    ],
  },
  {
    id: "facultatifs",
    label: "Facultatifs",
    items: [
      "Certificats de stage ou de travail",
      "Attestations de niveau de langue",
      "Lettres de recommandation",
    ],
  },
];

export const voyagesFaq = [
  {
    q: "Quand faut-il commencer la procédure Campus France ?",
    a: "Idéalement dès le mois d'octobre, la campagne principale se déroulant entre octobre et mars. Plus le dossier est préparé tôt, plus il est solide.",
  },
  {
    q: "Le visa est-il garanti si mon dossier est accepté ?",
    a: "Non. La décision appartient toujours aux autorités consulaires. Notre rôle est de présenter un dossier complet, cohérent et bien préparé.",
  },
  {
    q: "Puis-je candidater sans avoir encore le Baccalauréat ?",
    a: "Oui, les élèves de Terminale peuvent candidater avec leurs bulletins. Le relevé du Baccalauréat est transmis dès son obtention.",
  },
  {
    q: "Quels pays accompagnez-vous ?",
    a: "La France, la Belgique et le Canada, avec des procédures adaptées à chaque destination.",
  },
  {
    q: "Comment se déroule le paiement ?",
    a: "Les frais d'accompagnement sont réglés par Wave ou Orange Money. Les frais officiels (Campus France, visa) sont payés directement aux institutions concernées.",
  },
];

export const elitesMatieres = [
  "Mathématiques",
  "Français",
  "Histoire-Géographie",
  "Anglais",
  "Économie",
  "Philosophie",
];

export const elitesFormules = [
  {
    title: "Cours de vacances",
    price: "10 000 FCFA",
    priceNote: "frais d'inscription",
    details: [
      "Du 17 août au 18 septembre 2026",
      "Lycée El Hadji Ibrahima Diop de Yeumbeul",
      "Cours en présentiel, petits groupes",
      "Évaluations régulières et corrigés",
    ],
  },
  {
    title: "Cours en ligne",
    price: "15 000 FCFA",
    priceNote: "inscription, mensualité gratuite",
    details: [
      "Accessibles partout au Sénégal et à l'étranger",
      "Séances en direct et replays",
      "Supports et exercices téléchargeables",
      "Suivi personnalisé des élèves",
    ],
  },
];

export const fascicules = [
  { title: "Français", price: "2 000 FCFA" },
  { title: "Philosophie", price: "2 000 FCFA" },
  { title: "Histoire-Géographie", price: "2 000 FCFA" },
];

export const temoignages = [
  { name: "Aminata D.", country: "France", text: "Un accompagnement clair du début à la fin, j'ai su exactement quoi préparer à chaque étape." },
  { name: "Ousmane F.", country: "Belgique", text: "L'équipe a relu ma lettre de motivation plusieurs fois. J'étais beaucoup plus serein à l'entretien." },
  { name: "Fatou S.", country: "Canada", text: "Le suivi du dossier visa m'a évité plusieurs erreurs. Merci pour la patience." },
  { name: "Cheikh M.", country: "France", text: "Les cours des Élites du Bac m'ont remis à niveau en philosophie avant les épreuves." },
];

export const valeurs = [
  { title: "Transparence", text: "Des tarifs annoncés clairement, sans frais cachés ni promesse irréaliste." },
  { title: "Rigueur", text: "Chaque pièce est vérifiée, chaque échéance est suivie avec sérieux." },
  { title: "Accompagnement", text: "Un interlocuteur disponible, du premier échange jusqu'au départ." },
];

export const equipe = [
  {
    name: site.founder,
    role: "Fondateur",
    text: "Fondateur d'Union Vision Services, il accompagne depuis plusieurs années les élèves et étudiants de Yeumbeul dans leurs projets d'études, au Sénégal comme à l'étranger.",
  },
  {
    name: "Babacar",
    role: "Expert des procédures Campus France",
    text: "Il suit les dossiers Campus France au quotidien : constitution des pièces, choix des formations, préparation à l'entretien et demande de visa.",
  },
];
