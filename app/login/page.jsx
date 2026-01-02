"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../components/lib/firebaseConfig";
import { setStoredAuth } from "../components/lib/auth";

export default function LoginForm() {
  const router = useRouter();
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

      // 🔹 Étape 3 : Appel de ton backend Elyntis
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: email.split("@")[0],
          lastName: "",
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 🔹 Étape 4 : Sauvegarde du profil et du token
        setStoredAuth(data, token);

        setMessage(`✅ Bienvenue, ${data.firstName || data.email}`);
        router.push("/");
      } else {
        setMessage(`❌ Erreur : ${data.message || "Impossible de se connecter."}`);
      }
    } catch (error) {
      setMessage(`⚠️ ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          🔐 Connexion Elyntis
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Connecte-toi pour accéder à ton espace événementiel
        </p>

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adresse email
        </label>
        <input
          type="email"
          placeholder="ex: klan@elyntis.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mot de passe
        </label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>

        {message && (
          <p
            className={`mt-4 text-center text-sm ${
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
  );
}
