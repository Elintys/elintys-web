"use client";

import AdminCard from "../components/AdminCard";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function AdminTransactionsPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Transactions")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Suivi des paiements et flux financiers.")}
        </p>
      </div>
      <AdminCard>
        <p className="text-sm text-slate-600">
          {t("Module de monetisation en cours.")}
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm text-slate-600">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            {t("Paiements")}
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            {t("Commissions")}
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            {t("Abonnements")}
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
