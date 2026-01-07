"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUser, fetchCurrentUser } from "../../store/slices/usersSlice";
import { getStoredAuth } from "../../components/lib/auth";

const initialForm = {
  firstName: "",
  lastName: "",
  avatarUrl: "",
};

export default function ProfileSettingsPage() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.current);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    if (!currentUser) return;
    setFormData({
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      avatarUrl: currentUser.avatarUrl || "",
    });
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour modifier votre profil.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(updateCurrentUser(formData));
      setMessage("Profil mis a jour.");
    } catch (error) {
      console.error("Erreur maj profil:", error);
      setMessage("Erreur lors de la mise a jour.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Parametres</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-2xl"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Prenom
          </label>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Avatar URL
          </label>
          <input
            name="avatarUrl"
            value={formData.avatarUrl}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          {loading ? "Mise a jour..." : "Enregistrer"}
        </button>
        {message && <p className="text-sm text-gray-600">{message}</p>}
      </form>

      <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 max-w-2xl">
        <h3 className="text-lg font-semibold text-gray-900">Securite</h3>
        <p className="text-sm text-gray-500 mt-2">
          Gerer vos sessions actives et vos parametres de connexion.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="/recover"
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
          >
            Gerer le mot de passe
          </a>
          <a
            href="/login"
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
          >
            Reconnexion
          </a>
        </div>
      </div>
    </div>
  );
}
