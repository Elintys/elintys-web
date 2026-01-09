"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchCurrentUser } from "../store/slices/usersSlice";
import { ROLES, getUserRoles } from "../store/roleUtils";

const menuItems = [
  { href: "/profile/overview", label: "Overview" },
  {
    href: "/profile/events",
    label: "Evenements",
    roles: [ROLES.USER, ROLES.ORGANIZER],
  },
  { href: "/profile/tickets", label: "Billets", roles: [ROLES.USER] },
  { href: "/profile/services", label: "Services", roles: [ROLES.PROVIDER] },
  { href: "/profile/venues", label: "Espaces", roles: [ROLES.LANDLORD] },
  { href: "/profile/roles", label: "Roles" },
  { href: "/profile/notifications", label: "Notifications" },
  { href: "/profile/settings", label: "Parametres" },
];

export default function ProfileShell({ children }) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const currentUser = useSelector((state) => state.users.current);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const roles = getUserRoles(currentUser);
  const initials = [currentUser?.display_name, currentUser?.email]
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

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
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-semibold text-lg">
                {initials || "EL"}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentUser?.display_name || "Utilisateur"}
              </h1>
              <p className="text-sm text-gray-500">
                {currentUser?.email || "Compte Elyntis"}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {roles.map((role) => (
                  <span
                    key={role}
                    className="px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-600"
                  >
                    {role}
                  </span>
                ))}
              </div>
              {currentUser?.status && (
                <p className="text-xs text-gray-400 mt-2">
                  Compte {currentUser?.status.toLowerCase()}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/profile/settings"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
            >
              Modifier le profil
            </Link>
            <Link
              href="/profile/roles"
              className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 text-sm hover:bg-yellow-300 transition"
            >
              Gerer mes roles
            </Link>
            {/* <Link
              href="/profile/settings"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              Parametres
            </Link> */}
          </div>
        </div>

        <nav className="mb-6 text-sm text-gray-500" aria-label="Fil d'ariane">
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/profile" className="hover:text-gray-700 transition">
              Profil
            </Link>
            {breadcrumbLinks.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                <span className="text-gray-300">/</span>
                {index === breadcrumbLinks.length - 1 ? (
                  <span className="text-gray-700 font-semibold">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-gray-700 transition">
                    {item.label}
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
