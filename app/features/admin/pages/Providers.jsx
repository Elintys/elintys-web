"use client";

import { useEffect, useState } from "react";
import AdminCard from "../components/AdminCard";
import AdminTable from "../components/AdminTable";
import AdminStatusPill from "../components/AdminStatusPill";
import AdminBadge from "../components/AdminBadge";
import { useLanguage } from "../../../i18n/LanguageProvider";
import { adminApi } from "../../../store/adminApi";

export default function AdminProvidersPage() {
  const { t } = useLanguage();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [providersData, setProvidersData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadProviders = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.fetchProviders({ page: 1, limit: 20 });
        if (isMounted) {
          const payload = response.data || { items: [], total: 0, page: 1, limit: 20 };
          setProvidersData(payload);
          console.log("[admin/providers] fetched:", payload.items || []);
        }
      } catch (error) {
        if (isMounted) {
          setProvidersData({ items: [], total: 0, page: 1, limit: 20 });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProviders();

    return () => {
      isMounted = false;
    };
  }, []);

  const mappedProviders = providersData.items.map((provider) => ({
    id: provider._id || provider.id,
    name:
      provider.user?.displayName ||
      provider.user?.email ||
      provider.userId ||
      t("Prestataire"),
    email: provider.user?.email || "-",
    status: provider.status || "ACTIVE",
    verified: Boolean(provider.isVerified),
    rating: provider.rating?.average ?? 0,
    servicesCount: Array.isArray(provider.services) ? provider.services.length : 0,
    services: Array.isArray(provider.services)
      ? provider.services.map((service) => ({
        serviceId: service.serviceId || service._id || service.id,
        title: service.title || "-",
        category: service.category || "-",
        pricing: service.pricing || {},
        isActive: service.isActive !== false,
      }))
      : [],
    reservations: [],
    reviews: [],
  }));

  const columns = [
    { key: "name", label: t("Nom prestataire") },
    { key: "email", label: t("Email") },
    {
      key: "status",
      label: t("Statut compte"),
      render: (row) => <AdminStatusPill status={row.status} />,
    },
    {
      key: "verified",
      label: t("Verification"),
      render: (row) => (
        <AdminBadge tone={row.verified ? "success" : "warning"}>
          {row.verified ? t("Oui") : t("Non")}
        </AdminBadge>
      ),
    },
    { key: "servicesCount", label: t("Nombre de services") },
    {
      key: "rating",
      label: t("Note moyenne"),
      render: (row) => `${row.rating} / 5`,
    },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              adminApi.verifyProvider(row.id, !row.verified).then(() =>
                adminApi.fetchProviders({ page: 1, limit: 20 }).then((response) => {
                  setProvidersData(response.data || { items: [], total: 0, page: 1, limit: 20 });
                })
              )
            }
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {row.verified ? t("Deverifier") : t("Verifier")}
          </button>
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {row.status === "SUSPENDED" ? t("Reactiver") : t("Suspendre")}
          </button>
          <button
            type="button"
            onClick={() => setSelectedProvider(row)}
            className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
          >
            {t("Voir details")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">
          {t("Prestataires & services")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Controle qualite et suivi des prestataires marketplace.")}
        </p>
      </div>

      <AdminTable
        columns={columns}
        rows={mappedProviders}
        isLoading={isLoading}
        emptyMessage={t("Aucun prestataire pour le moment.")}
      />

      {/* Detail panel for provider profile and services. */}
      {selectedProvider && (
        <AdminCard
          title={t("Details prestataire")}
          subtitle={selectedProvider.name}
          action={
            <button
              type="button"
              onClick={() => setSelectedProvider(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              {t("Fermer")}
            </button>
          }
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Profil public")}</p>
              <p className="mt-2 text-sm text-slate-700">{selectedProvider.email}</p>
              <p className="text-sm text-slate-700">
                {t("Statut")}: {selectedProvider.status}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Historique reservations")}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {selectedProvider.reservations.length
                  ? selectedProvider.reservations.map((reservation) => (
                    <li key={reservation}>{reservation}</li>
                  ))
                  : <li className="text-slate-500">{t("Historique a brancher")}</li>}
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Avis & notes")}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {selectedProvider.reviews.length
                  ? selectedProvider.reviews.map((review) => <li key={review}>{review}</li>)
                  : <li className="text-slate-500">{t("Avis a brancher")}</li>}
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase text-slate-400">{t("Services proposes")}</p>
            <div className="mt-3 space-y-2">
              {selectedProvider.services.map((service) => (
                <div
                  key={service.serviceId || service.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-slate-800">{service.title}</p>
                    <p className="text-xs text-slate-500">
                      {service.category} · {service.pricing?.model || t("Tarif")}{" "}
                      {service.pricing?.amount != null ? `- ${service.pricing.amount}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <AdminStatusPill status={service.isActive ? "ACTIVE" : "SUSPENDED"} />
                    <button
                      type="button"
                      onClick={() =>
                        adminApi.suspendService(service.serviceId).then(() =>
                          adminApi.fetchProviders({ page: 1, limit: 20 }).then((response) => {
                            setProvidersData(
                              response.data || { items: [], total: 0, page: 1, limit: 20 }
                            );
                          })
                        )
                      }
                      className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                      {service.isActive ? t("Suspendre") : t("Reactiver")}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      )}
    </div>
  );
}
