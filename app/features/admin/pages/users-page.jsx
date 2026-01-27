"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useAdminUsers from "../hooks/use-admin-users";
import UsersFilters from "../components/users/users-filters";
import UsersTable from "../components/users/users-table";
import UserDetailsCard from "../components/users/user-details-card";
import UsersPagination from "../components/users/users-pagination";

export default function AdminUsersPage() {
  const { t } = useLanguage();
  const {
    query,
    setQuery,
    statusFilter,
    setStatusFilter,
    roleFilter,
    setRoleFilter,
    page,
    setPage,
    isLoading,
    rows,
    totalPages,
    selectedUser,
    setSelectedUser,
    handleToggleStatus,
    handleForceRole,
  } = useAdminUsers(t);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">{t("Utilisateurs")}</h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("Suivi des comptes et roles actifs sur la plateforme.")}
        </p>
      </div>

      <UsersFilters
        query={query}
        onQueryChange={(value) => {
          setQuery(value);
          setPage(1);
        }}
        roleFilter={roleFilter}
        onRoleChange={(value) => {
          setRoleFilter(value);
          setPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(value) => {
          setStatusFilter(value);
          setPage(1);
        }}
        t={t}
      />

      <UsersTable
        rows={rows}
        isLoading={isLoading}
        onToggleStatus={handleToggleStatus}
        onSelectUser={setSelectedUser}
        onForceRole={handleForceRole}
        t={t}
      />

      <UserDetailsCard
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
        t={t}
      />

      <UsersPagination page={page} totalPages={totalPages} onPageChange={setPage} t={t} />
    </div>
  );
}
