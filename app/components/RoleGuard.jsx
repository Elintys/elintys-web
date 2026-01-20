"use client";

import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/authSelectors";
import { hasRole } from "../store/roleUtils";
import { useLanguage } from "../i18n/LanguageProvider";
import Link from "next/link";

// Simple guard: shows children only when the user has one of the required roles.
export default function RoleGuard({
  requiredRoles = [],
  children,
  title = "Acces restreint",
  description = "Vous n'avez pas le role requis pour acceder a cette section.",
  activationRole,
  onActivateRole,
}) {
  const currentUser = useSelector(selectCurrentUser);
  const { t } = useLanguage();
  const isAllowed =
    requiredRoles.length === 0 ||
    requiredRoles.some((role) => hasRole(currentUser, role));

  if (isAllowed) {
    return children;
  }

  const needsLogin = !currentUser;

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 max-w-2xl">
      <h2 className="text-lg font-semibold text-gray-900">{t(title)}</h2>
      <p className="text-sm text-gray-600 mt-2">{t(description)}</p>
      {needsLogin && (
        <Link
          href="/login"
          className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          {t("Se connecter")}
        </Link>
      )}
      {activationRole && onActivateRole && (
        <button
          type="button"
          onClick={() => onActivateRole(activationRole)}
          className="mt-4 inline-flex items-center justify-center px-5 py-3 rounded-full bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 transition"
        >
          {t("Activer le role")} {activationRole}
        </button>
      )}
    </div>
  );
}
