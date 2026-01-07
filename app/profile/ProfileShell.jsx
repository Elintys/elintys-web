"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { fetchCurrentUser } from "../store/slices/usersSlice";
import { ROLES, getUserRoles, hasRole } from "../store/roleUtils";

const menuItems = [
  { href: "/profile/overview", label: "Overview" },
  { href: "/profile/events", label: "Evenements", roles: [ROLES.USER, ROLES.ORGANIZER] },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const roles = getUserRoles(currentUser);
  const initials = [currentUser?.firstName, currentUser?.lastName]
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
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
                {currentUser?.firstName || "Utilisateur"} {currentUser?.lastName || ""}
              </h1>
              <p className="text-sm text-gray-500">{currentUser?.email || "Compte Elyntis"}</p>
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
              <p className="text-xs text-gray-400 mt-2">Compte actif</p>
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
            <Link
              href="/profile/settings"
              className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
            >
              Parametres
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6 lg:hidden">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition"
            onClick={() => setIsMenuOpen(true)}
          >
            Menu profil
          </button>
        </div>
        <div>{children}</div>
      </section>
      <Footer />

      <Dialog open={isMenuOpen} onClose={setIsMenuOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/60 transition-opacity duration-500 ease-in-out data-closed:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-sm transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
              >
                <TransitionChild>
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 duration-500 ease-in-out data-closed:opacity-0 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      onClick={() => setIsMenuOpen(false)}
                      className="relative rounded-md text-gray-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    >
                      <span className="absolute -inset-2.5" />
                      <span className="sr-only">Fermer le menu</span>
                      <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                    </button>
                  </div>
                </TransitionChild>
                <div className="relative flex h-full flex-col overflow-y-auto bg-gray-900 py-6 shadow-xl after:absolute after:inset-y-0 after:left-0 after:w-px after:bg-white/10">
                  <div className="px-4 sm:px-6">
                    <DialogTitle className="text-base font-semibold text-white">
                      Menu profil
                    </DialogTitle>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    <div className="flex flex-col gap-1">
                      {menuItems
                        .filter(
                          (item) =>
                            !item.roles || item.roles.some((role) => hasRole(currentUser, role))
                        )
                        .map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`px-3 py-2 rounded-lg text-sm transition ${
                              pathname === item.href
                                ? "bg-white/10 text-white font-semibold"
                                : "text-gray-300 hover:bg-white/5 hover:text-white"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </main>
  );
}
