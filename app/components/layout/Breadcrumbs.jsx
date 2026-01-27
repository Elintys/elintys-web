"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "../../i18n/language-provider";

const isIdSegment = (segment) =>
  /^[0-9a-f]{8,}$/i.test(segment) ||
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    segment
  );

export default function Breadcrumbs() {
  const pathname = usePathname() || "/";
  const { t } = useLanguage();

  const labelMap = {
    about: "A propos",
    admin: "Admin",
    ai: "IA",
    analytics: "Analytics",
    checkout: "Paiement",
    contact: "Contact",
    dashboard: "Dashboard",
    events: "Evenements",
    favorites: "Favoris",
    insights: "Insights",
    invitations: "Invitations",
    login: "Connexion",
    my: "Mes",
    notifications: "Notifications",
    overview: "Apercu",
    payments: "Paiements",
    profile: "Profil",
    providers: "Prestataires",
    prestataires: "Prestataires",
    recommendations: "Recommandations",
    register: "Inscription",
    reports: "Rapports",
    roles: "Roles",
    services: "Services",
    settings: "Parametres",
    tickets: "Billets",
    types: "Types",
    users: "Utilisateurs",
    venues: "Lieux",
    verification: "Verification",
    new: "Nouveau",
    edit: "Modifier",
    collaborators: "Collaborateurs",
    request: "Demande",
    availability: "Disponibilites",
  };

  const formatSegment = (segment) => {
    if (labelMap[segment]) return t(labelMap[segment]);
    if (isIdSegment(segment)) return t("Detail");
    return segment.replace(/-/g, " ");
  };

  if (pathname === "/" || pathname.startsWith("/profile")) {
    return null;
  }

  const segments = pathname.split("/").filter(Boolean);
  if (segments.length < 2) {
    return null;
  }

  const items = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`;
    return {
      href,
      label: formatSegment(segment),
    };
  });

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 py-3 text-sm text-gray-500">
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/" className="hover:text-gray-700 transition">
            {t("Accueil")}
          </Link>
          {items.map((item, index) => (
            <span key={item.href} className="flex items-center gap-2">
              <span className="text-gray-300">/</span>
              {index === items.length - 1 ? (
                <span className="text-gray-700 font-semibold">{item.label}</span>
              ) : (
                <Link href={item.href} className="hover:text-gray-700 transition">
                  {item.label}
                </Link>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
