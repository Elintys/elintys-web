// components/layout/navbar.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { getStoredAuth } from "../../lib/auth";
import { clearCredentials, setCredentials } from "../../store/slices/authSlice";
import { ROLES, hasRole } from "../../store/roleUtils";
import Breadcrumbs from "./breadcrumbs";
import { useLanguage } from "../../i18n/language-provider";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const stored = getStoredAuth();
    if (stored?.token) {
      dispatch(setCredentials({ user: stored.user, token: stored.token }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (auth?.user) {
      console.log("Utilisateur connecte:", auth.user);
    }
  }, [auth?.user]);

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/");
  };

  const userLabel =
    auth?.user?.display_name ||
    auth?.user?.email ||
    t("Mon compte");
  const linkClass = (href) =>
    `transition text-sm ${
      pathname === href
        ? "text-indigo-700 font-semibold"
        : "text-gray-600 hover:text-indigo-600"
    }`;
  const dashboardHref = hasRole(auth?.user, ROLES.ADMIN) || hasRole(auth?.user, ROLES.SUPER_ADMIN)
    ? "/admin"
    : "/dashboard";

  return (
    <div>
      <nav className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Elintys
            </Link>
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 text-gray-500 hover:text-indigo-600"
              aria-label={t("Ouvrir le menu")}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <ul
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row gap-3 md:gap-6 text-gray-700 font-medium md:items-center mt-4 md:mt-0`}
          >
            <li><Link href="/" className={linkClass("/")}>{t("Accueil")}</Link></li>
            <li><Link href="/events" className={linkClass("/events")}>{t("Evenements")}</Link></li>
            <li><Link href="/providers" className={linkClass("/providers")}>{t("Prestataires")}</Link></li>
            <li><Link href="/venues" className={linkClass("/venues")}>{t("Lieux")}</Link></li>
            {/* <li><Link href={dashboardHref} className={linkClass(dashboardHref)}>{t("Dashboard")}</Link></li> */}
            <li><Link href="/about" className={linkClass("/about")}>{t("A propos")}</Link></li>
            <li><Link href="/contact" className={linkClass("/contact")}>{t("Contact")}</Link></li>
            {auth?.token ? (
              <>
                <li className="text-sm text-gray-500">
                  <Link href="/profile" className={linkClass("/profile")}>{userLabel}</Link>
                </li>
                <li>
                  <Link
                    href="/notifications"
                    className={`${linkClass("/notifications")} inline-flex items-center`}
                    aria-label={t("Notifications")}
                    title={t("Notifications")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 2a7 7 0 0 0-7 7v3.586l-1.707 1.707A1 1 0 0 0 4 16h16a1 1 0 0 0 .707-1.707L19 12.586V9a7 7 0 0 0-7-7zm0 20a3 3 0 0 0 2.83-2H9.17A3 3 0 0 0 12 22z" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    {t("Se deconnecter")}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><Link href="/login" className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">{t("Se connecter")}</Link></li>
                {/* <li><Link href="/login" className={linkClass("/login")}>{t("Se connecter")}</Link></li> */}
                {/* <li>
                  <Link
                    href="/register"
                    className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
                  >
                    {t("S'inscrire")}
                  </Link>
                </li> */}
              </>
            )}
          </ul>
        </div>
      </nav>
      <Breadcrumbs />
    </div>
  );
}
