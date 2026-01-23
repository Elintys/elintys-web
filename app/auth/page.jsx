"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { auth } from "../lib/firebaseConfig";
import { registerProfile, setCredentials } from "../store/slices/authSlice";
import { useLanguage } from "../i18n/LanguageProvider";

export default function AuthTestForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const { t } = useLanguage();

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage({ type: "info", text: t("Connexion en cours...") });

    try {
      // Connexion ou création de compte Firebase
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch {
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
      }

      console.log('====================================');
      console.log("User credential: ",userCredential);
      console.log('====================================');
      // Récupère le token Firebase
      const token = await userCredential.user.getIdToken();

      dispatch(setCredentials({ user: null, token }));
      const action = await dispatch(registerProfile());

      const data = action.payload;

      if (action.type.endsWith("fulfilled")) {
        setMessage({
          type: "success",
          text: t("Utilisateur connecte"),
          value: data?.user?.email,
        });
        dispatch(setCredentials({ user: data?.user, token: data?.token }));
        router.push("/");
      } else {
        setMessage({
          type: "error",
          text: t("Erreur"),
          value: data?.message || t("Impossible de se connecter."),
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: t("Erreur"),
        value: error instanceof Error ? error.message : String(error),
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow border border-gray-100 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {t("Test API Elyntis Auth")}
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {t("Connectez-vous avec Firebase et envoyez le token a l'API.")}
        </p>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder={t("Email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
            required
          />
          <input
            type="password"
            placeholder={t("Mot de passe")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold rounded-full py-3 hover:bg-indigo-700 transition"
          >
            {t("Tester l'API")}
          </button>

          {message && (
            <p
              className={`text-center text-sm ${
                message.type === "success" ? "text-green-600" : "text-red-600"
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
