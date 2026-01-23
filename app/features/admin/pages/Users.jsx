"use client";

import { useEffect, useMemo, useState } from "react";
import AdminCard from "../components/AdminCard";
import AdminTable from "../components/AdminTable";
import AdminStatusPill from "../components/AdminStatusPill";
import AdminBadge from "../components/AdminBadge";
import { useLanguage } from "../../../i18n/LanguageProvider";
import { adminApi } from "../../../store/adminApi";

const pageSize = 6;

export default function AdminUsersPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState({ items: [], total: 0, page: 1, limit: pageSize });
  const [selectedUser, setSelectedUser] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.fetchUsers({
          page,
          limit: pageSize,
          role: roleFilter === "ALL" ? undefined : roleFilter,
          status: statusFilter === "ALL" ? undefined : statusFilter,
        });
        if (isMounted) {
          setUsersData(response.data || { items: [], total: 0, page, limit: pageSize });
        }
      } catch (error) {
        if (isMounted) {
          setUsersData({ items: [], total: 0, page, limit: pageSize });
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, [page, roleFilter, statusFilter, reloadKey]);

  // Client-side search on the current page payload.
  const filtered = useMemo(() => {
    return usersData.items.filter((user) => {
      const name = user.display_name || user.email || "";
      const matchesQuery =
        !query ||
        name.toLowerCase().includes(query.toLowerCase()) ||
        String(user.email || "").toLowerCase().includes(query.toLowerCase());
      return matchesQuery;
    });
  }, [query, usersData.items]);

  const totalPages = Math.max(1, Math.ceil(usersData.total / pageSize));
  const pagedRows = filtered.map((user) => ({
    id: user.id,
    name: user.display_name || user.email || t("Utilisateur"),
    email: user.email || "-",
    roles: Array.isArray(user.roles) ? user.roles : [],
    status: user.status || "PENDING",
    createdAt: user.created_at ? new Date(user.created_at).toLocaleDateString() : "-",
    lastActive: user.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : "-",
  }));

  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
    await adminApi.updateUserStatus(user.id, nextStatus);
    setReloadKey((key) => key + 1);
  };

  const handleForceRole = async (user, roleCode) => {
    await adminApi.assignRole(user.id, roleCode);
    setReloadKey((key) => key + 1);
  };

  const columns = [
    { key: "name", label: t("Nom") },
    { key: "email", label: t("Email") },
    {
      key: "roles",
      label: t("Roles"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          {row.roles.map((role) => (
            <AdminBadge key={role} tone="info">
              {role}
            </AdminBadge>
          ))}
        </div>
      ),
    },
    {
      key: "status",
      label: t("Statut"),
      render: (row) => <AdminStatusPill status={row.status} />,
    },
    { key: "createdAt", label: t("Date d'inscription") },
    { key: "lastActive", label: t("Derniere activite") },
    {
      key: "actions",
      label: t("Actions"),
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => handleToggleStatus(row)}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {row.status === "SUSPENDED" ? t("Reactiver") : t("Suspendre")}
          </button>
          <button
            type="button"
            onClick={() => setSelectedUser(row)}
            className="rounded-full bg-indigo-700 px-3 py-1 text-xs font-semibold text-white hover:bg-indigo-800"
          >
            {t("Voir details")}
          </button>
          <button
            type="button"
            onClick={() => handleForceRole(row, "ORGANIZER")}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Forcer ORGANIZER")}
          </button>
          <button
            type="button"
            onClick={() => handleForceRole(row, "PROVIDER")}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Forcer PROVIDER")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Utilisateurs")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Suivi des comptes et roles actifs sur la plateforme.")}
        </p>
      </div>

      <AdminCard>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder={t("Rechercher un utilisateur")}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={roleFilter}
              onChange={(event) => {
                setRoleFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="ALL">{t("Tous les roles")}</option>
              <option value="USER">{t("USER")}</option>
              <option value="ORGANIZER">{t("ORGANIZER")}</option>
              <option value="PROVIDER">{t("PROVIDER")}</option>
              <option value="ADMIN">{t("ADMIN")}</option>
            </select>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="ALL">{t("Tous les statuts")}</option>
              <option value="ACTIVE">{t("Actif")}</option>
              <option value="PENDING">{t("En attente")}</option>
              <option value="SUSPENDED">{t("Suspendu")}</option>
            </select>
          </div>
        </div>
      </AdminCard>

      <AdminTable
        columns={columns}
        rows={pagedRows}
        isLoading={isLoading}
        emptyMessage={t("Aucun utilisateur ne correspond aux filtres.")}
      />

      {/* Details panel for the currently selected user. */}
      {selectedUser && (
        <AdminCard
          title={t("Details utilisateur")}
          subtitle={selectedUser.email}
          action={
            <button
              type="button"
              onClick={() => setSelectedUser(null)}
              className="text-xs font-semibold text-slate-500 hover:text-slate-700"
            >
              {t("Fermer")}
            </button>
          }
        >
          <div className="grid gap-4 lg:grid-cols-3">
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Profil")}</p>
              <p className="mt-2 text-sm text-slate-700">{selectedUser.name}</p>
              <p className="text-xs text-slate-500">{selectedUser.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedUser.roles.map((role) => (
                  <AdminBadge key={role} tone="info">
                    {role}
                  </AdminBadge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Historique evenements")}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li className="text-slate-500">{t("Historique a brancher")}</li>
              </ul>
            </div>
            <div>
              <p className="text-xs uppercase text-slate-400">{t("Historique services")}</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li className="text-slate-500">{t("Historique a brancher")}</li>
              </ul>
            </div>
          </div>
          <div className="mt-5">
            <p className="text-xs uppercase text-slate-400">{t("Historique actions admin")}</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              <li className="text-slate-500">{t("Journal admin a brancher")}</li>
            </ul>
          </div>
        </AdminCard>
      )}

      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          {t("Page")} {page} / {totalPages}
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
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            {t("Suivant")}
          </button>
        </div>
      </div>
    </div>
  );
}
