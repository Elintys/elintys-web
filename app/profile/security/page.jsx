"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "../../store/slices/usersSlice";
import { clearCredentials } from "../../store/slices/authSlice";
import { useLanguage } from "../../i18n/LanguageProvider";

export default function ProfileSecurityPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => state.users.current);
  const { language, t } = useLanguage();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  const locale = currentUser?.locale || (language === "en" ? "en-CA" : "fr-CA");
  const lastLogin = currentUser?.last_login_at
    ? new Date(currentUser.last_login_at).toLocaleString(locale)
    : t("Non disponible");

  const handleLogout = () => {
    dispatch(clearCredentials());
    router.push("/");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t("Securite")}</h2>
        <p className="text-sm text-gray-500 mt-2">
          {t("Gerez les informations de connexion et la securite du compte.")}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">{t("Derniere connexion")}</p>
          <p className="text-base text-gray-900 font-semibold">{lastLogin}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">{t("Fournisseur d'authentification")}</p>
          <p className="text-base text-gray-900 font-semibold">
            {currentUser?.auth_provider || "Firebase"}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
          {t("Les parametres de connexion sont geres via Firebase.")}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleLogout}
          className="px-5 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
        >
          {t("Se deconnecter")}
        </button>
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="px-5 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          {t("Se reconnecter")}
        </button>
      </div>
    </div>
  );
}
