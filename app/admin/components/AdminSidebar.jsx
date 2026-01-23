"use client";

import Link from "next/link";
import { useLanguage } from "../../i18n/LanguageProvider";

const navItems = [
  { href: "/admin", label: "Vue d'ensemble" },
  { href: "/admin/users", label: "Utilisateurs" },
  { href: "/admin/events", label: "Evenements" },
  { href: "/admin/providers", label: "Prestataires & services" },
  { href: "/admin/venues", label: "Lieux" },
  { href: "/admin/moderation", label: "Moderation" },
  { href: "/admin/transactions", label: "Transactions" },
  { href: "/admin/support", label: "Support" },
  { href: "/admin/settings", label: "Parametres" },
];

export default function AdminSidebar({ pathname }) {
  const { t } = useLanguage();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:shrink-0 md:border-r md:border-slate-200 md:bg-white md:sticky md:top-0 md:h-screen">
      <div className="px-6 py-6 border-b border-slate-100">
        <div className="text-lg font-semibold text-gray-900">Elintys Admin</div>
        <p className="text-xs text-gray-500 mt-1">{t("Console de gestion")}</p>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
