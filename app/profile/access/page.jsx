"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../store/slices/usersSlice";
import { ROLES, getUserRoles } from "../../store/roleUtils";
import { useLanguage } from "../../i18n/LanguageProvider";
import Link from "next/link";

const roleConfig = {
  [ROLES.USER]: {
    title: "Utilisateur",
    description: "Acces aux evenements, billets et notifications.",
    capabilities: ["Consulter des evenements", "Reserver des billets", "Recevoir des alertes"],
  },
  [ROLES.ORGANIZER]: {
    title: "Organisateur",
    description: "Creer et gerer vos evenements.",
    capabilities: ["Creer des evenements", "Gerer les collaborateurs", "Suivre les performances"],
  },
  [ROLES.PROVIDER]: {
    title: "Prestataire",
    description: "Proposer vos services et gerer vos demandes.",
    capabilities: ["Publier des services", "Recevoir des demandes", "Gerer votre vitrine"],
  },
  [ROLES.LANDLORD]: {
    title: "Proprietaire",
    description: "Lister vos espaces et gerer les demandes.",
    capabilities: ["Ajouter des lieux", "Gerer disponibilites", "Suivre les reservations"],
  },
  [ROLES.ADMIN]: {
    title: "Admin",
    description: "Superviser la plateforme.",
    capabilities: ["Administrer les utilisateurs", "Superviser les contenus"],
  },
};

export default function ProfileAccessPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const { t } = useLanguage();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const roles = getUserRoles(currentUser);

  const roleEntries = Object.entries(roleConfig);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t("Roles et acces")}</h2>
        <p className="text-sm text-gray-500 mt-2">
          {t("Consultez vos roles actifs et les capacites associees.")}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {roleEntries.map(([roleKey, role]) => {
          const isActive = roles.includes(roleKey);
          return (
            <div
              key={roleKey}
              className="bg-white rounded-2xl shadow border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{t(role.title)}</h3>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {isActive ? t("Actif") : t("Inactif")}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{t(role.description)}</p>
              <ul className="mt-4 space-y-1 text-sm text-gray-600">
                {role.capabilities.map((capability) => (
                  <li key={capability}>• {t(capability)}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{t("Besoin d'un role ?")}</h3>
          <p className="text-sm text-gray-500 mt-1">
            {t("Pour modifier vos acces, contactez le support ou completez votre verification.")}
          </p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
        >
          {t("Contacter le support")}
        </Link>
      </div>
    </div>
  );
}
