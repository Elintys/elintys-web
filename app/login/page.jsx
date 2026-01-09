"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../components/lib/firebaseConfig";
import { loginProfile, setCredentials } from "../store/slices/authSlice";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
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
        setMessage(
          `✅ Bienvenue, ${data?.user?.display_name || data?.user?.email}`
        );
        router.push("/");
      } else {
        setMessage(`❌ Erreur : ${data?.message || "Impossible de se connecter."}`);
      }
    } catch (error) {
      setMessage(`⚠️ ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow border border-gray-100 w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connexion Elyntis
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Accedez a votre espace et retrouvez vos evenements.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email
            </label>
            <input
              type="email"
              placeholder="ex: klan@elyntis.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
          <div className="text-center">
            <a href="/recover" className="text-sm text-indigo-600 hover:underline">
              Mot de passe oublie ?
            </a>
          </div>
          {message && (
            <p
              className={`text-center text-sm ${
                message.startsWith("✅")
                  ? "text-green-600"
                  : message.startsWith("⚠️")
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
