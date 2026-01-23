"use client";

import { useEffect, useMemo, useState } from "react";
import AdminCard from "../components/AdminCard";
import AdminTable from "../components/AdminTable";
import AdminStatusPill from "../components/AdminStatusPill";
import AdminConfirmModal from "../components/AdminConfirmModal";
import { useLanguage } from "../../i18n/LanguageProvider";
import { adminApi } from "../../store/adminApi";

export default function AdminEventsPage() {
  const { t } = useLanguage();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [dateFilter, setDateFilter] = useState("");
  const [eventsData, setEventsData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rejectEvent, setRejectEvent] = useState(null);
  const [rejectReason, setRejectReason] = useState("");

  // Filter events on the client while waiting for real BFF wiring.
  const filtered = useMemo(() => {
    return eventsData.items.filter((event) => {
      const displayStatus = event.displayStatus || event.status;
      const matchesStatus = statusFilter === "ALL" || displayStatus === statusFilter;
      const matchesCategory =
        categoryFilter === "ALL" || event.category === categoryFilter;
      const matchesCity = cityFilter === "ALL" || event.city === cityFilter;
      const matchesDate =
        !dateFilter ||
        (event.dateRaw && new Date(event.dateRaw) >= new Date(dateFilter));
      return matchesStatus && matchesCategory && matchesCity && matchesDate;
    });
  }, [eventsData.items, statusFilter, categoryFilter, cityFilter, dateFilter]);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const statusParam =
          statusFilter === "PENDING_REVIEW"
            ? "DRAFT"
            : statusFilter === "REJECTED"
              ? "CANCELLED"
              : statusFilter === "ALL"
                ? undefined
                : statusFilter;
        const response = await adminApi.fetchEvents({
          page,
          limit: 10,
          status: statusParam,
        });

        if (isMounted) {
          const items = Array.isArray(response.data?.items) ? response.data.items : [];
          const mapped = items.map((event) => {
            const status = event.status || "DRAFT";
            const organizerLabel =
              event.organizer?.displayName ||
              event.organizer?.email ||
              event.organizerId ||
              "-";
            return {
              id: event._id || event.id,
              title: event.title || "-",
              organizer: organizerLabel,
              status,
              displayStatus:
                status === "DRAFT"
                  ? "PENDING_REVIEW"
                  : status === "CANCELLED"
                    ? "REJECTED"
                    : status,
              city: event.manualVenue?.city || "-",
              dateRaw: event.startDate ? new Date(event.startDate) : null,
              date: event.startDate
                ? new Date(event.startDate).toLocaleDateString()
                : "-",
              createdAt: event.createdAt
                ? new Date(event.createdAt).toLocaleDateString()
                : "-",
              category: event.categoryId || "-",
              reports: [],
            };
          });
          setEventsData({
            items: mapped,
            total: response.data?.total || 0,
            page: response.data?.page || page,
            limit: response.data?.limit || 10,
          });
          console.log("[admin/events] fetched:", mapped);
        }
      } catch (error) {
        if (isMounted) {
          setEventsData({ items: [], total: 0, page, limit: 10 });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, [page, statusFilter, reloadKey]);

  const columns = [
    { key: "title", label: t("Evenement") },
    { key: "organizer", label: t("Organisateur") },
    { key: "city", label: t("Ville") },
    { key: "date", label: t("Date") },
    { key: "createdAt", label: t("Date de creation") },
    {
      key: "status",
      label: t("Statut"),
      render: (row) => <AdminStatusPill status={row.displayStatus} />,
    },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Preview")}
          </button>
          <button
            type="button"
            onClick={() => setSelectedEvent(row)}
            className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
          >
            {t("Voir details")}
          </button>
          <button
            type="button"
            onClick={() => {
              setRejectEvent(row);
              setRejectReason("");
            }}
            className="rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white hover:bg-rose-700"
          >
            {t("Refuser")}
          </button>
          <button
            type="button"
            onClick={() =>
              adminApi.approveEvent(row.id).then(() => setReloadKey((key) => key + 1))
            }
            className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white hover:bg-emerald-700"
          >
            {t("Approuver")}
          </button>
          <button
            type="button"
            onClick={() =>
              adminApi.unpublishEvent(row.id).then(() => setReloadKey((key) => key + 1))
            }
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Depublier")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Evenements")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Controle des evenements soumis et publies.")}
        </p>
      </div>

      <AdminCard>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="text-sm text-slate-600">{t("Filtres")}</div>
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="ALL">{t("Tous statuts")}</option>
              <option value="DRAFT">{t("Brouillon")}</option>
              <option value="PENDING_REVIEW">{t("En attente")}</option>
              <option value="PUBLISHED">{t("Publie")}</option>
              <option value="REJECTED">{t("Refuse")}</option>
            </select>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="ALL">{t("Toutes categories")}</option>
              <option value="Festival">{t("Festival")}</option>
              <option value="Conference">{t("Conference")}</option>
              <option value="Soiree">{t("Soiree")}</option>
              <option value="Networking">{t("Networking")}</option>
            </select>
            <select
              value={cityFilter}
              onChange={(event) => setCityFilter(event.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="ALL">{t("Toutes villes")}</option>
              <option value="Abidjan">{t("Abidjan")}</option>
              <option value="Paris">{t("Paris")}</option>
              <option value="Lome">{t("Lome")}</option>
              <option value="Dakar">{t("Dakar")}</option>
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
            />
          </div>
        </div>
      </AdminCard>

      <AdminTable
        columns={columns}
        rows={filtered}
        isLoading={isLoading}
        emptyMessage={t("Aucun evenement pour ce filtre.")}
      />

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          {t("Page")} {page} / {Math.max(1, Math.ceil(eventsData.total / eventsData.limit))}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Precedent")}
          </button>
          <button
            type="button"
            onClick={() =>
              setPage((prev) =>
                Math.min(Math.max(1, Math.ceil(eventsData.total / eventsData.limit)), prev + 1)
              )
            }
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Suivant")}
          </button>
        </div>
      </div>

      {/* Details panel for the currently selected event. */}
      {selectedEvent && (
        <AdminCard
          title={t("Details evenement")}
          subtitle={selectedEvent.title}
          action={
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              {t("Fermer")}
            </button>
          }
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Donnees principales")}</p>
              <p className="mt-2 text-sm text-slate-700">
                {t("Organisateur")}: {selectedEvent.organizer}
              </p>
              <p className="text-sm text-slate-700">
                {t("Ville")}: {selectedEvent.city}
              </p>
              <p className="text-sm text-slate-700">
                {t("Categorie")}: {selectedEvent.category}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Historique statut")}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li>{selectedEvent.displayStatus}</li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Signalements associes")}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                {selectedEvent.reports.length
                  ? selectedEvent.reports.map((report) => <li key={report}>{report}</li>)
                  : <li className="text-slate-500">{t("Aucun signalement")}</li>}
              </ul>
            </div>
          </div>
        </AdminCard>
      )}

      {/* Modal used to capture a rejection reason (mock for now). */}
      <AdminConfirmModal
        open={Boolean(rejectEvent)}
        title={t("Refuser un evenement")}
        description={t("Indiquez un motif pour la moderation.")}
        confirmLabel={t("Confirmer le refus")}
        onCancel={() => setRejectEvent(null)}
        onConfirm={() =>
          adminApi.rejectEvent(rejectEvent?.id).then(() => {
            setRejectEvent(null);
            setReloadKey((key) => key + 1);
          })
        }
      >
        <textarea
          value={rejectReason}
          onChange={(event) => setRejectReason(event.target.value)}
          placeholder={t("Motif du refus")}
          className="min-h-[120px] w-full rounded-xl border border-slate-200 p-3 text-sm"
        />
      </AdminConfirmModal>
    </div>
  );
}
