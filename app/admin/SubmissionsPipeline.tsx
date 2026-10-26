"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Download,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  Filter,
  User,
  Calendar,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export type SubmissionStatus = "nouveau" | "contacte" | "en_cours" | "converti" | "archive";

interface Submission {
  id: string;
  created_at: string;
  subject: string;
  details?: Record<string, any>;
  status?: SubmissionStatus;
}

const STATUS_CONFIG: Record<
  SubmissionStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  nouveau: {
    label: "Nouveau",
    badgeClass: "bg-amber-100 text-amber-800 border-amber-200",
    dotClass: "bg-amber-500",
  },
  contacte: {
    label: "Contacté",
    badgeClass: "bg-blue-100 text-blue-800 border-blue-200",
    dotClass: "bg-blue-500",
  },
  en_cours: {
    label: "Dossier en cours",
    badgeClass: "bg-purple-100 text-purple-800 border-purple-200",
    dotClass: "bg-purple-500",
  },
  converti: {
    label: "Admis / Visa",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dotClass: "bg-emerald-500",
  },
  archive: {
    label: "Archivé",
    badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
    dotClass: "bg-gray-400",
  },
};

export function SubmissionsPipeline({ initialSubmissions }: { initialSubmissions: Submission[] }) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<"tous" | SubmissionStatus>("tous");
  const [statusOverrides, setStatusOverrides] = useState<Record<string, SubmissionStatus>>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("uvs_leads_status");
        return saved ? JSON.parse(saved) : {};
      } catch {
        return {};
      }
    }
    return {};
  });

  const handleStatusChange = (id: string, newStatus: SubmissionStatus) => {
    const updated = { ...statusOverrides, [id]: newStatus };
    setStatusOverrides(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("uvs_leads_status", JSON.stringify(updated));
    }
  };

  const getSubmissionStatus = (sub: Submission): SubmissionStatus => {
    return statusOverrides[sub.id] || sub.status || "nouveau";
  };

  const findPhoneNumber = (details?: Record<string, any>): string | null => {
    if (!details) return null;
    for (const [k, v] of Object.entries(details)) {
      const keyLower = k.toLowerCase();
      if (
        keyLower.includes("téléphone") ||
        keyLower.includes("telephone") ||
        keyLower.includes("phone") ||
        keyLower.includes("tel")
      ) {
        return String(v).trim();
      }
    }
    return null;
  };

  const findStudentName = (details?: Record<string, any>): string => {
    if (!details) return "Étudiant";
    for (const [k, v] of Object.entries(details)) {
      const keyLower = k.toLowerCase();
      if (keyLower.includes("nom") || keyLower.includes("prénom") || keyLower.includes("prenom")) {
        return String(v).trim();
      }
    }
    return "Étudiant";
  };

  const normalizePhoneForWhatsapp = (phone: string): string => {
    const cleaned = phone.replace(/[^0-9]/g, "");
    if (cleaned.startsWith("221")) return cleaned;
    if (cleaned.length === 9) return `221${cleaned}`;
    return cleaned;
  };

  // Filtrage
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const currentStatus = getSubmissionStatus(sub);
      if (activeFilter !== "tous" && currentStatus !== activeFilter) {
        return false;
      }

      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const subjectMatch = sub.subject?.toLowerCase().includes(term);
      const detailsMatch = sub.details
        ? Object.values(sub.details).some((val) => String(val).toLowerCase().includes(term))
        : false;

      return subjectMatch || detailsMatch;
    });
  }, [submissions, activeFilter, searchTerm, statusOverrides]);

  // Export CSV
  const exportToCSV = () => {
    const headers = ["Date", "Sujet", "Statut", "Détails"];
    const rows = filteredSubmissions.map((sub) => {
      const date = new Date(sub.created_at).toLocaleString("fr-FR");
      const status = STATUS_CONFIG[getSubmissionStatus(sub)].label;
      const detailsStr = sub.details
        ? Object.entries(sub.details)
            .map(([k, v]) => `${k}: ${v}`)
            .join(" | ")
        : "";
      return [
        `"${date}"`,
        `"${sub.subject.replace(/"/g, '""')}"`,
        `"${status}"`,
        `"${detailsStr.replace(/"/g, '""')}"`,
      ];
    });

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `prospects-uvs-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Barre d'outils et recherche */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, téléphone, pays..."
            className="w-full rounded-xl border border-border/80 bg-background pl-10 pr-4 py-2 text-sm shadow-xs focus:border-accent focus:outline-hidden"
          />
        </div>

        <button
          type="button"
          onClick={exportToCSV}
          disabled={filteredSubmissions.length === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border/80 bg-card px-4 py-2 text-xs font-bold text-primary shadow-xs hover:bg-muted transition-colors disabled:opacity-50"
        >
          <Download className="h-4 w-4 text-accent" /> Exporter en CSV (Excel)
        </button>
      </div>

      {/* Onglets de statut (Pipeline) */}
      <div className="flex flex-wrap gap-2 border-b border-border/60 pb-3">
        {(
          [
            { key: "tous", label: `Tous (${submissions.length})` },
            { key: "nouveau", label: "Nouveaux" },
            { key: "contacte", label: "Contactés" },
            { key: "en_cours", label: "En cours" },
            { key: "converti", label: "Admis / Visa" },
            { key: "archive", label: "Archivés" },
          ] as const
        ).map((tab) => {
          const isSelected = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveFilter(tab.key)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-primary text-white shadow-xs"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Liste des cartes */}
      {filteredSubmissions.length === 0 ? (
        <div className="card-soft p-12 text-center text-sm text-muted-foreground">
          Aucun prospect ne correspond à ce filtre ou critère de recherche.
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubmissions.map((sub) => {
            const currentStatus = getSubmissionStatus(sub);
            const statusInfo = STATUS_CONFIG[currentStatus];
            const phone = findPhoneNumber(sub.details);
            const studentName = findStudentName(sub.details);
            const waPhone = phone ? normalizePhoneForWhatsapp(phone) : null;

            const whatsappMessage = encodeURIComponent(
              `Bonjour ${studentName !== "Étudiant" ? studentName : ""} ! C'est Mouhamed de l'agence UVS Voyages (Yeumbeul).\n\n` +
                `J'ai bien reçu votre demande concernant "${sub.subject}". Êtes-vous disponible pour que nous fassions le point sur votre projet ?`
            );

            return (
              <div
                key={sub.id}
                className="card-soft flex flex-col justify-between p-5 border shadow-xs transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 border-b border-border/60 pb-3">
                    <div>
                      <span className="inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-[11px] font-bold text-accent-foreground">
                        {sub.subject}
                      </span>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(sub.created_at).toLocaleString("fr-FR", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>

                    {/* Statut sélecteur */}
                    <select
                      value={currentStatus}
                      onChange={(e) => handleStatusChange(sub.id, e.target.value as SubmissionStatus)}
                      className={`rounded-lg border px-2 py-1 text-xs font-bold shadow-2xs focus:outline-hidden ${statusInfo.badgeClass}`}
                    >
                      <option value="nouveau">🟡 Nouveau</option>
                      <option value="contacte">🔵 Contacté</option>
                      <option value="en_cours">🟣 En cours</option>
                      <option value="converti">🟢 Admis / Visa</option>
                      <option value="archive">⚪ Archivé</option>
                    </select>
                  </div>

                  {/* Coordonnées et détails */}
                  <div className="mt-3.5 space-y-2 text-xs">
                    {sub.details &&
                      Object.entries(sub.details).map(([key, val]) => (
                        <div key={key} className="flex justify-between gap-2 border-b border-border/30 pb-1">
                          <span className="font-semibold text-muted-foreground">{key} :</span>
                          <span className="font-medium text-foreground text-right">{String(val)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Actions commerciales rapides */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2">
                  {waPhone ? (
                    <>
                      <a
                        href={`https://wa.me/${waPhone}?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-whatsapp px-3 py-2 text-xs font-bold text-white shadow-2xs hover:opacity-95 transition-opacity"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        Relancer WhatsApp
                      </a>
                      <a
                        href={`tel:${phone}`}
                        title="Appeler par téléphone"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                      >
                        <Phone className="h-3.5 w-3.5" />
                      </a>
                    </>
                  ) : (
                    <span className="text-[11px] text-muted-foreground italic">
                      Aucun numéro détecté
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
