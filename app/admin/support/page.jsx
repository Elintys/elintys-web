"use client";

import AdminCard from "../components/AdminCard";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function AdminSupportPage() {
  const { t } = useLanguage();

  const mockTickets = [
    { id: "ticket-1", subject: "Paiement bloque", status: "OPEN", priority: "Haute" },
    { id: "ticket-2", subject: "Compte suspendu", status: "OPEN", priority: "Moyenne" },
    { id: "ticket-3", subject: "Acces prestataire", status: "RESOLVED", priority: "Basse" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Support")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Gestion des tickets et demandes utilisateurs.")}
        </p>
      </div>
      <AdminCard>
        <p className="text-sm text-slate-600">{t("Module support a brancher.")}</p>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          {mockTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
            >
              <div>
                <p className="font-medium">{ticket.subject}</p>
                <p className="text-xs text-slate-500">
                  {t("Statut")}: {ticket.status} · {t("Priorite")}: {ticket.priority}
                </p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                {t("Historique echanges")}
              </button>
            </div>
          ))}
        </div>
      </AdminCard>
    </div>
  );
}
