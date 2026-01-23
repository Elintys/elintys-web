"use client";

import { useEffect, useState } from "react";
import AdminTable from "../components/AdminTable";
import AdminStatusPill from "../components/AdminStatusPill";
import { useLanguage } from "../../i18n/LanguageProvider";
import { adminApi } from "../../store/adminApi";

export default function AdminVenuesPage() {
  const { t } = useLanguage();
  const [venuesData, setVenuesData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadVenues = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.fetchVenues({ page: 1, limit: 20 });
        if (isMounted) {
          setVenuesData(response.data || { items: [], total: 0, page: 1, limit: 20 });
        }
      } catch (error) {
        if (isMounted) {
          setVenuesData({ items: [], total: 0, page: 1, limit: 20 });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVenues();

    return () => {
      isMounted = false;
    };
  }, []);

  const mappedVenues = venuesData.items.map((venue) => ({
    id: venue.id,
    name: venue.title || "-",
    city: venue.city || "-",
    capacity: venue.capacityMax ?? "-",
    status: venue.isVerified ? "ACTIVE" : "PENDING",
    eventsCount: "-",
  }));

  const columns = [
    { key: "name", label: t("Lieu") },
    { key: "city", label: t("Ville") },
    { key: "capacity", label: t("Capacite") },
    {
      key: "status",
      label: t("Statut"),
      render: (row) => <AdminStatusPill status={row.status} />,
    },
    { key: "eventsCount", label: t("Evenements associes") },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Voir fiche")}
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Detecter doublons")}
          </button>
          <button
            type="button"
            className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${
              row.status === "ACTIVE" ? "bg-rose-600 hover:bg-rose-700" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {row.status === "ACTIVE" ? t("Desactiver") : t("Activer")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Lieux")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Gestion des espaces et disponibilites associees.")}
        </p>
      </div>

      <AdminTable
        columns={columns}
        rows={mappedVenues}
        isLoading={isLoading}
        emptyMessage={t("Aucun lieu pour le moment.")}
      />
    </div>
  );
}
