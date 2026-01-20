"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  fetchCurrentUser,
  deactivateAccount,
  deleteAccount,
  exportUserData,
} from "../../store/slices/usersSlice";
import { clearCredentials } from "../../store/slices/authSlice";
import { useLanguage } from "../../i18n/LanguageProvider";

const formatDate = (value, locale) => {
  if (!value) return null;
  return new Date(value).toLocaleDateString(locale, { dateStyle: "medium" });
};

export default function ProfilePrivacyPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state) => state.users.current);
  const { language, t } = useLanguage();
  const locale = currentUser?.locale || (language === "en" ? "en-CA" : "fr-CA");
  const [message, setMessage] = useState(null);
  const [loadingAction, setLoadingAction] = useState("");
  const [confirmType, setConfirmType] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState("");

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

  const handleExport = async () => {
    setLoadingAction("export");
    setMessage(null);
    try {
      const action = await dispatch(exportUserData());
      if (exportUserData.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Export indisponible pour le moment."),
        });
      } else {
        setMessage({ type: "success", text: t("Export lance.") });
      }
    } finally {
      setLoadingAction("");
    }
  };

  const handleDeactivate = async () => {
    setLoadingAction("deactivate");
    setMessage(null);
    try {
      const action = await dispatch(deactivateAccount());
      if (deactivateAccount.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la desactivation."),
        });
      } else {
        setMessage({ type: "success", text: t("Compte desactive.") });
      }
    } finally {
      setLoadingAction("");
      setConfirmType(null);
    }
  };

  const handleDelete = async () => {
    setLoadingAction("delete");
    setMessage(null);
    try {
      const action = await dispatch(deleteAccount());
      if (deleteAccount.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la suppression."),
        });
      } else {
        dispatch(clearCredentials());
        router.push("/");
      }
    } finally {
      setLoadingAction("");
      setConfirmType(null);
      setDeleteConfirm("");
    }
  };

  const termsDate = formatDate(currentUser?.terms_accepted_at, locale);
  const privacyDate = formatDate(currentUser?.privacy_policy_accepted_at, locale);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{t("Confidentialite")}</h2>
        <p className="text-sm text-gray-500 mt-2">
          {t("Gerez vos donnees personnelles et vos consentements.")}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-2xl">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t("Conditions d'utilisation")}</span>
          <span className="text-sm text-gray-900 font-semibold">
            {termsDate || t("Non accepte")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t("Politique de confidentialite")}</span>
          <span className="text-sm text-gray-900 font-semibold">
            {privacyDate || t("Non accepte")}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{t("Consentement marketing")}</span>
          <span className="text-sm text-gray-900 font-semibold">
            {currentUser?.marketing_consent ? t("Oui") : t("Non")}
          </span>
        </div>
        <Link
          href="/profile/preferences"
          className="text-sm text-indigo-600 hover:underline"
        >
          {t("Modifier mes preferences")}
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900">{t("Actions sur les donnees")}</h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setConfirmType("export")}
            className="px-5 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            {t("Telecharger mes donnees")}
          </button>
          <button
            type="button"
            onClick={() => setConfirmType("deactivate")}
            className="px-5 py-3 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition"
          >
            {t("Desactiver mon compte")}
          </button>
          <button
            type="button"
            onClick={() => setConfirmType("delete")}
            className="px-5 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
          >
            {t("Supprimer mon compte")}
          </button>
        </div>
        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>

      {confirmType && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">
              {confirmType === "export" && t("Telecharger mes donnees")}
              {confirmType === "deactivate" && t("Desactiver mon compte")}
              {confirmType === "delete" && t("Supprimer mon compte")}
            </h4>
            <p className="text-sm text-gray-600">
              {confirmType === "export" &&
                t("Un export de vos donnees sera prepare. Vous recevrez un lien des qu'il sera pret.")}
              {confirmType === "deactivate" &&
                t("Votre compte sera desactive mais pourra etre restaure.")}
              {confirmType === "delete" &&
                t("Cette action est definitive. Pour confirmer, tapez SUPPRIMER.")}
            </p>
            {confirmType === "delete" && (
              <input
                value={deleteConfirm}
                onChange={(event) => setDeleteConfirm(event.target.value)}
                placeholder={t("Tapez SUPPRIMER")}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
              />
            )}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => {
                  setConfirmType(null);
                  setDeleteConfirm("");
                }}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                {t("Annuler")}
              </button>
              {confirmType === "export" && (
                <button
                  type="button"
                  onClick={handleExport}
                  disabled={loadingAction === "export"}
                  className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  {loadingAction === "export" ? t("Chargement...") : t("Confirmer")}
                </button>
              )}
              {confirmType === "deactivate" && (
                <button
                  type="button"
                  onClick={handleDeactivate}
                  disabled={loadingAction === "deactivate"}
                  className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition"
                >
                  {loadingAction === "deactivate" ? t("Chargement...") : t("Confirmer")}
                </button>
              )}
              {confirmType === "delete" && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loadingAction === "delete" || deleteConfirm !== "SUPPRIMER"}
                  className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
                >
                  {loadingAction === "delete" ? t("Chargement...") : t("Supprimer")}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
