"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { registerProfile, setCredentials } from "../store/slices/authSlice";
import { useLanguage } from "../i18n/LanguageProvider";

export default function RegisterForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      // 🔹 1. Création du compte Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // 🔹 2. Récupération du token Firebase
      const token = await userCredential.user.getIdToken();

      // 🔹 3. Appel de ton backend Elyntis via Redux
      dispatch(setCredentials({ user: null, token }));
      const action = await dispatch(registerProfile());

      const data = action.payload;

      if (action.type.endsWith("fulfilled")) {
        dispatch(setCredentials({ user: data?.user, token: data?.token }));
        setMessage({
          type: "success",
          text: t("Compte cree avec succes"),
          value: data?.user?.display_name || data?.user?.email,
        });
        router.push("/");
      } else {
        setMessage({
          type: "error",
          text: t("Erreur"),
          value: data?.message || t("Erreur lors de la creation du compte."),
        });
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error);
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow border border-gray-100 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("Creer un compte")}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {t("Rejoignez la plateforme pour organiser vos evenements.")}
        </p>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              name="firstName"
              placeholder={t("Prenom")}
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              required
            />
            <input
              name="lastName"
              placeholder={t("Nom")}
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>

          <input
            name="email"
            placeholder={t("Adresse email")}
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            required
          />

          <input
            name="password"
            placeholder={t("Mot de passe")}
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? t("Creation du compte...") : t("S'inscrire")}
          </button>

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
  );
}
