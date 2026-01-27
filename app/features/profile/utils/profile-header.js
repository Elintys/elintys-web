import { getUserRoles } from "../../../store/roleUtils";

export const buildProfileHeader = (currentUser, language) => {
  const roles = getUserRoles(currentUser);
  const initials = [currentUser?.display_name, currentUser?.email]
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  const locale = currentUser?.locale || (language === "en" ? "en-CA" : "fr-CA");
  const rawStatus = currentUser?.status || "PENDING";
  const statusValue = currentUser?.deleted_at ? "DELETED" : rawStatus;
  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-gray-100 text-gray-600",
    SUSPENDED: "bg-red-100 text-red-700",
    DELETED: "bg-zinc-200 text-zinc-600",
  };
  const lastLogin = currentUser?.last_login_at
    ? new Date(currentUser.last_login_at).toLocaleString(locale)
    : null;

  return {
    roles,
    initials,
    locale,
    statusValue,
    statusStyles,
    lastLogin,
  };
};
