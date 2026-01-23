export const ROLES = {
  USER: "USER",
  ORGANIZER: "ORGANIZER",
  PROVIDER: "PROVIDER",
  LANDLORD: "LANDLORD",
  STAFF: "STAFF",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
};

export const getUserRoles = (user) => {
  const roles = Array.isArray(user?.roles)
    ? user.roles
    : user?.role
      ? [user.role]
      : [];
  const normalized = roles.map((role) => String(role).toUpperCase());
  if (user && !normalized.includes(ROLES.USER)) {
    normalized.push(ROLES.USER);
  }
  return normalized;
};

export const hasRole = (user, role) => getUserRoles(user).includes(role);

export const getUserId = (user) =>
  user?._id || user?.id || user?.firebase_uid || user?.firebaseUid || null;
