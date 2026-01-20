"use client";

import { useLanguage } from "../i18n/LanguageProvider";

export default function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Elintys</h3>
          <p className="text-sm text-gray-500 mt-2">
            {t("Une plateforme pour decouvrir, organiser et vivre des evenements.")}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{t("Explorer")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li><a href="/events" className="hover:text-indigo-600">{t("Evenements")}</a></li>
            <li><a href="/venues" className="hover:text-indigo-600">{t("Lieux")}</a></li>
            <li><a href="/providers" className="hover:text-indigo-600">{t("Prestataires")}</a></li>
            <li><a href="/categories" className="hover:text-indigo-600">{t("Categories")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{t("Ressources")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li><a href="/about" className="hover:text-indigo-600">{t("A propos")}</a></li>
            <li><a href="/contact" className="hover:text-indigo-600">{t("Contact")}</a></li>
            <li><a href="/notifications" className="hover:text-indigo-600">{t("Notifications")}</a></li>
            <li><a href="/ai" className="hover:text-indigo-600">{t("Assistant IA")}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">{t("Compte")}</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li><a href="/login" className="hover:text-indigo-600">{t("Se connecter")}</a></li>
            <li><a href="/register" className="hover:text-indigo-600">{t("S'inscrire")}</a></li>
            <li><a href="/profile" className="hover:text-indigo-600">{t("Profil")}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-400 gap-2">
          <span>
            © {new Date().getFullYear()} Elintys — {t("Tous droits reserves.")}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <span>{t("Politique de confidentialite")} · {t("Conditions d'utilisation")}</span>
            <label className="flex items-center gap-2">
              <span className="text-gray-400">{t("Langue")}</span>
              <select
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="border border-gray-200 rounded-md px-2 py-1 text-black placeholder-gray-300"
              >
                <option value="fr">{t("Francais")}</option>
                <option value="en">English</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    </footer>
  );
}
