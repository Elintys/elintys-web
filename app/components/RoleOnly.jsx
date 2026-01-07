"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authSelectors";
import { hasRole } from "../store/roleUtils";

// Small conditional helper for role-based UI.
export default function RoleOnly({ role, children }) {
  const currentUser = useSelector(selectCurrentUser);
  if (!hasRole(currentUser, role)) return null;
  return children;
}
