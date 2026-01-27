"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { recoverPassword } from "../store/slices/authSlice";
import { useLanguage } from "../i18n/language-provider";

export default function RecoverPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResetLink("");
    setLoading(true);

    try {
      const action = await dispatch(recoverPassword({ email }));
      const data = action.payload || {};
      if (action.type.endsWith("fulfilled")) {
        setMessage(data.message || "Lien de reinitialisation genere.");
        setResetLink(data.resetLink || "");
      } else {
        setMessage(data.message || "Erreur lors de la generation.");
      }
    } catch (error) {
      console.error("Erreur recover:", error);
      setMessage("Erreur lors de la generation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">{t("Compte")}</p>
          <h1 className="text-3xl font-bold text-gray-900">{t("Mot de passe oublie")}</h1>
          <p className="text-sm text-gray-500 mt-2">
            {t("Recevez un lien pour reinitialiser votre mot de passe.")}
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-lg"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Email")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
          >
            {loading ? t("Envoi...") : t("Envoyer")}
          </button>
          {message && <p className="text-sm text-gray-600">{t(message)}</p>}
          {resetLink && (
            <a
              href={resetLink}
              className="text-sm text-indigo-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {t("Ouvrir le lien de reinitialisation")}
            </a>
          )}
        </form>
      </section>
      <Footer />
    </main>
  );
}
