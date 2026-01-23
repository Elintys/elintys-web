"use client";

import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../../i18n/LanguageProvider";
import { clearCredentials } from "../../../store/slices/authSlice";
import { ROLES, hasRole } from "../../../store/roleUtils";

export default function AdminHeader() {
  const { t } = useLanguage();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const displayName =
    currentUser?.display_name || currentUser?.email || t("Admin");
  const roleLabel = hasRole(currentUser, ROLES.SUPER_ADMIN)
    ? "SUPER_ADMIN"
    : "ADMIN";

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
      <div className="flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder={t("Recherche globale")}
              className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-700 outline-none focus:border-slate-300"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            aria-label={t("Notifications")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 2a7 7 0 0 0-7 7v3.586l-1.707 1.707A1 1 0 0 0 4 16h16a1 1 0 0 0 .707-1.707L19 12.586V9a7 7 0 0 0-7-7zm0 20a3 3 0 0 0 2.83-2H9.17A3 3 0 0 0 12 22z" />
            </svg>
          </button>
          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              {(displayName || "A")[0]}
            </span>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-medium">{displayName}</span>
              <span className="text-xs text-slate-500">{roleLabel}</span>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-semibold text-indigo-700 hover:text-indigo-800"
            >
              {t("Logout")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
