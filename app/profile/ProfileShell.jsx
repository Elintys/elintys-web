"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { fetchCurrentUser } from "../store/slices/usersSlice";
import { ROLES, getUserRoles } from "../store/roleUtils";
import { useLanguage } from "../i18n/LanguageProvider";
import { getStoredAuth } from "../lib/auth";

const menuItems = [
  { href: "/profile/overview", label: "Apercu" },
  {
    href: "/profile/events",
    label: "Evenements",
    roles: [ROLES.USER, ROLES.ORGANIZER],
  },
  { href: "/profile/tickets", label: "Billets", roles: [ROLES.USER] },
  { href: "/profile/services", label: "Services", roles: [ROLES.PROVIDER] },
  { href: "/profile/venues", label: "Espaces", roles: [ROLES.LANDLORD] },
  { href: "/profile/notifications", label: "Notifications" },
  { href: "/profile/account", label: "Profil" },
  { href: "/profile/security", label: "Securite" },
  { href: "/profile/preferences", label: "Preferences" },
  { href: "/profile/privacy", label: "Confidentialite" },
  { href: "/profile/access", label: "Roles et acces" },
];

export default function ProfileShell({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useSelector((state) => state.users.current);
  const auth = useSelector((state) => state.auth);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const { t, language } = useLanguage();

  useEffect(() => {
    const stored = getStoredAuth();
    const token = auth?.token || stored?.token;
    if (!token) {
      router.replace("/login");
      return;
    }
    dispatch(fetchCurrentUser());
    setIsAuthChecked(true);
  }, [auth?.token, dispatch, router]);

  if (!isAuthChecked) {
    return null;
  }

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

  const breadcrumbItems =
    pathname?.split("?")[0].split("#")[0].split("/").filter(Boolean) || [];
  const breadcrumbLinks = breadcrumbItems.map((segment, index) => {
    const href = `/${breadcrumbItems.slice(0, index + 1).join("/")}`;
    const fromMenu = menuItems.find((item) => item.href === href);
    const label = fromMenu?.label || segment.replace(/-/g, " ");
    return { href, label };
  });

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            {currentUser?.photo_url ? (
              <img
                src={currentUser.photo_url}
                alt={t("Avatar")}
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-lg">
                {initials || "EL"}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser?.display_name || t("Utilisateur")}
              </h1>
              <p className="text-sm text-gray-500">
                {currentUser?.email || t("Compte Elyntis")}
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusStyles[statusValue] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t(statusValue)}
                </span>
                {lastLogin && (
                  <span className="text-xs text-gray-500">
                    {t("Derniere connexion")}: {lastLogin}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/profile/account"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
            >
              {t("Modifier le profil")}
            </Link>
            <Link
              href="/profile/access"
              className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 text-sm hover:bg-yellow-300 transition"
            >
              {t("Roles et acces")}
            </Link>
            {/* <Link
              href="/profile/settings"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              Parametres
            </Link> */}
          </div>
        </div>

        <nav className="mb-6 text-sm text-gray-500" aria-label={t("Fil d'ariane")}>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/profile" className="hover:text-gray-700 transition">
              {t("Profil")}
            </Link>
            {breadcrumbLinks.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                <span className="text-gray-300">/</span>
                {index === breadcrumbLinks.length - 1 ? (
                  <span className="text-gray-700 font-semibold">{t(item.label)}</span>
                ) : (
                  <Link href={item.href} className="hover:text-gray-700 transition">
                    {t(item.label)}
                  </Link>
                )}
              </span>
            ))}
          </div>
        </nav>
        <div>{children}</div>
      </section>
      <Footer />
    </main>
  );
}
