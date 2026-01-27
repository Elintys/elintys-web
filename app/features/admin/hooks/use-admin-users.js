import { useCallback, useEffect, useMemo, useState } from "react";
import { adminApi } from "../../../store/adminApi";

const PAGE_SIZE = 6;

export default function useAdminUsers(t) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [usersData, setUsersData] = useState({
    items: [],
    total: 0,
    page: 1,
    limit: PAGE_SIZE,
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      setIsLoading(true);
      try {
        const response = await adminApi.fetchUsers({
          page,
          limit: PAGE_SIZE,
          role: roleFilter === "ALL" ? undefined : roleFilter,
          status: statusFilter === "ALL" ? undefined : statusFilter,
        });
        if (isMounted) {
          setUsersData(
            response.data || { items: [], total: 0, page, limit: PAGE_SIZE }
          );
        }
      } catch (error) {
        if (isMounted) {
          setUsersData({ items: [], total: 0, page, limit: PAGE_SIZE });
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

  const totalPages = Math.max(1, Math.ceil(usersData.total / PAGE_SIZE));

  const rows = useMemo(
    () =>
      filtered.map((user) => ({
        id: user.id,
        name: user.display_name || user.email || t("Utilisateur"),
        email: user.email || "-",
        roles: Array.isArray(user.roles) ? user.roles : [],
        status: user.status || "PENDING",
        createdAt: user.created_at
          ? new Date(user.created_at).toLocaleDateString()
          : "-",
        lastActive: user.last_login_at
          ? new Date(user.last_login_at).toLocaleDateString()
          : "-",
      })),
    [filtered, t]
  );

  const handleToggleStatus = useCallback(async (user) => {
    const nextStatus = user.status === "SUSPENDED" ? "ACTIVE" : "SUSPENDED";
    await adminApi.updateUserStatus(user.id, nextStatus);
    setReloadKey((key) => key + 1);
  }, []);

  const handleForceRole = useCallback(async (user, roleCode) => {
    await adminApi.assignRole(user.id, roleCode);
    setReloadKey((key) => key + 1);
  }, []);

  return {
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
  };
}
