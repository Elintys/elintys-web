"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser, updateUserProfile } from "../../store/slices/usersSlice";
import { useLanguage } from "../../i18n/LanguageProvider";

const MAX_BIO_LENGTH = 250;

const isValidUrl = (value) => {
  if (!value) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

export default function ProfileAccountPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const { language, t } = useLanguage();
  const [form, setForm] = useState({
    display_name: "",
    bio: "",
    photo_url: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) return;
    setForm({
      display_name: currentUser.display_name || "",
      bio: currentUser.bio || "",
      photo_url: currentUser.photo_url || "",
    });
  }, [currentUser]);

  const photoPreview = useMemo(() => {
    if (!form.photo_url || !isValidUrl(form.photo_url)) return null;
    return form.photo_url;
  }, [form.photo_url]);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 text-sm text-gray-500">
        {t("Chargement...")}
      </div>
    );
  }

  const statusValue = currentUser?.deleted_at
    ? "DELETED"
    : currentUser?.status || "PENDING";
  const statusStyles = {
    ACTIVE: "bg-green-100 text-green-700",
    PENDING: "bg-gray-100 text-gray-600",
    SUSPENDED: "bg-red-100 text-red-700",
    DELETED: "bg-zinc-200 text-zinc-600",
  };
  const locale = currentUser?.locale || (language === "en" ? "en-CA" : "fr-CA");
  const lastLogin = currentUser?.last_login_at
    ? new Date(currentUser.last_login_at).toLocaleString(locale)
    : null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(null);

    const trimmedName = form.display_name.trim();
    if (trimmedName.length < 2) {
      setMessage({ type: "error", text: t("Le nom doit contenir au moins 2 caracteres.") });
      return;
    }
    if (form.bio.length > MAX_BIO_LENGTH) {
      setMessage({ type: "error", text: t("La bio ne peut pas depasser 250 caracteres.") });
      return;
    }
    if (!isValidUrl(form.photo_url)) {
      setMessage({ type: "error", text: t("L'URL de la photo n'est pas valide.") });
      return;
    }

    setLoading(true);
    try {
      const action = await dispatch(
        updateUserProfile({
          display_name: trimmedName,
          bio: form.bio,
          photo_url: form.photo_url || null,
        })
      );
      if (updateUserProfile.rejected.match(action)) {
        setMessage({
          type: "error",
          text: action.payload?.message || t("Erreur lors de la mise a jour."),
        });
      } else {
        setMessage({ type: "success", text: t("Profil mis a jour.") });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{t("Profil")}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {t("Mettez a jour vos informations principales.")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
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
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-5"
      >
        <div className="grid md:grid-cols-[180px,1fr] gap-6 items-start">
          <div className="space-y-3">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt={t("Photo de profil")} className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm text-gray-400">{t("Aucun avatar")}</span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              {t("Formats recommandes: JPG, PNG.")}
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("Nom d'affichage")}
              </label>
              <input
                name="display_name"
                value={form.display_name}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
                placeholder={t("Votre nom public")}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("Bio")}
              </label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
                rows={4}
                maxLength={MAX_BIO_LENGTH}
                placeholder={t("Quelques mots sur vous")}
              />
              <p className="text-xs text-gray-400 mt-1">
                {form.bio.length}/{MAX_BIO_LENGTH}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("Photo de profil (URL)")}
              </label>
              <input
                name="photo_url"
                value={form.photo_url}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
                placeholder="https://"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("Email")}
            </label>
            <input
              value={currentUser?.email || ""}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("Identifiant de compte")}
            </label>
            <input
              value={currentUser?.firebase_uid || currentUser?.id || ""}
              readOnly
              className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-gray-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? t("Mise a jour...") : t("Enregistrer")}
          </button>
          {message && (
            <span
              className={`text-sm ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
