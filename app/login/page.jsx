"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { loginProfile, setCredentials } from "../store/slices/authSlice";
import { useLanguage } from "../i18n/LanguageProvider";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // 🔹 Étape 1 : Connexion (ou création si compte inexistant)
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        // Si utilisateur inconnu → création d’un compte
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      // 🔹 Étape 2 : Récupération du token Firebase
      const token = await userCredential.user.getIdToken();

      // 🔹 Étape 3 : Appel de ton backend Elyntis via Redux
      dispatch(setCredentials({ user: null, token }));
      const action = await dispatch(loginProfile());
      const data = action.payload;

      if (action.type.endsWith("fulfilled")) {
        dispatch(setCredentials({ user: data?.user, token: data?.token }));
        setMessage({
          type: "success",
          text: t("Bienvenue"),
          value: data?.user?.display_name || data?.user?.email,
        });
        router.push("/");
      } else {
        setMessage({
          type: "error",
          text: t("Erreur"),
          value: data?.message || t("Impossible de se connecter."),
        });
      }
    } catch (error) {
      setMessage({
        type: "warning",
        text: t("Attention"),
        value: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 px-4 py-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr,1fr] rounded-[36px] overflow-hidden shadow-2xl bg-white">
          <div className="bg-[#2b283a] text-white p-10 lg:p-14 flex flex-col justify-between">
            <div className="space-y-6">
              <p className="text-lg font-semibold text-amber-400">Elintys</p>
              <h1 className="text-3xl lg:text-4xl font-semibold leading-tight">
                {t("Decouvrez des evenements sur mesure.")}
                <br />
                {t("Connectez-vous pour des recommandations personnalisees.")}
              </h1>
            </div>
            <p className="text-sm text-gray-300">
              {t("Votre prochaine experience commence ici.")}
            </p>
          </div>
          <div className="p-10 lg:p-14">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-semibold text-gray-900">
                {t("Connexion")}
              </h2>
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-200 text-gray-400 hover:text-gray-700 transition"
                aria-label={t("Fermer")}
              >
                ✕
              </button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:border-gray-300 transition"
              >
                <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-700">
                  G
                </span>
                {t("Connexion avec Google")}
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-3 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:border-gray-300 transition"
              >
                <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-semibold">
                  f
                </span>
                {t("Connexion avec Facebook")}
              </button>
            </div>
            <div className="my-8 flex items-center gap-3 text-xs text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              {t("OU")}
              <span className="h-px flex-1 bg-gray-200" />
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Adresse email")}
                </label>
                <input
                  type="email"
                  placeholder={t("Entrez votre email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("Mot de passe")}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder={t("Entrez votre mot de passe")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-black placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    required
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    👁
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#6d4ae6] hover:bg-[#5f3fd3]"
                }`}
              >
                {loading ? t("Connexion...") : t("Login")}
              </button>
              <div className="text-center">
                <a href="/recover" className="text-sm text-indigo-600 hover:underline">
                  {t("Mot de passe oublie ?")}
                </a>
              </div>
              {message && (
                <p
                  className={`text-center text-sm ${
                    message.type === "success"
                      ? "text-green-600"
                      : message.type === "warning"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {message.text}
                  {message.value ? `: ${message.value}` : ""}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
