"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth } from "../components/lib/firebaseConfig";
import { setStoredAuth } from "../components/lib/auth";

export default function AuthTestForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setMessage("Connexion en cours...");

    try {
      // 🔹 Connexion ou création de compte Firebase
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

      // Appel au backend Elyntis
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: "Klan",
          lastName: "Saah",
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✅ Utilisateur connecté: ${data.email}`);
        setStoredAuth(data, token);
        router.push("/");
      } else {
        setMessage(`❌ Erreur: ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Erreur: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleAuth}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          🔥 Test API Elyntis Auth
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Connecte-toi avec Firebase et envoie le token à ton API
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring focus:ring-blue-200"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold rounded-md py-2 hover:bg-blue-700 transition"
        >
          Tester l&apos;API
        </button>

        {message && (
          <p
            className={`text-center mt-4 text-sm ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
