"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/lib/firebaseConfig";
import { setStoredAuth } from "../components/lib/auth";

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
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

      // 🔹 3. Appel de ton backend Elyntis
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStoredAuth(data, token);
        setMessage(`✅ Compte créé avec succès ! Bienvenue, ${data.firstName}`);
        router.push("/");
      } else {
        setMessage(`❌ ${data.message || "Erreur lors de la création du compte."}`);
      }
    } catch (error) {
      console.error("Erreur d'inscription :", error);
      setMessage(`⚠️ ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          ✨ Crée ton compte Elyntis
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Rejoins la plateforme événementielle Elyntis
        </p>

        <div className="grid grid-cols-2 gap-3">
          <input
            name="firstName"
            placeholder="Prénom"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
          <input
            name="lastName"
            placeholder="Nom"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />
        </div>

        <input
          name="email"
          placeholder="Adresse email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />

        <input
          name="password"
          placeholder="Mot de passe"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-6 rounded-md text-white font-semibold ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {loading ? "Création du compte..." : "S'inscrire"}
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
