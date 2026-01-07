"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getStoredAuth } from "../components/lib/auth";
import { createCategory, fetchCategories } from "../store/slices/categoriesSlice";

const initialForm = {
  name: "",
  description: "",
  color: "",
  icon: "",
};

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour creer une categorie.");
      return;
    }

    setLoading(true);
    try {
      const action = await dispatch(createCategory(formData));
      const created = action.payload;
      setFormData(initialForm);
      setMessage("Categorie creee.");
    } catch (error) {
      console.error("Erreur creation categorie:", error);
      setMessage("Erreur lors de la creation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Categories</h1>
            <div className="space-y-3">
              {categories.map((cat) => (
                <div
                  key={cat._id || cat.name}
                  className="bg-white rounded-xl shadow p-4 border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">{cat.name}</h2>
                    {cat.color && (
                      <span
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                    )}
                  </div>
                  {cat.description && (
                    <p className="text-sm text-gray-600 mt-2">{cat.description}</p>
                  )}
                </div>
              ))}
              {!categories.length && (
                <p className="text-gray-500">Aucune categorie disponible.</p>
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 space-y-4 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-800">Nouvelle categorie</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows={3}
            />
            <input
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Couleur (ex: #FFAA00)"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Icone"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {loading ? "Creation..." : "Creer"}
            </button>
            {message && (
              <p className="text-sm text-gray-600">{message}</p>
            )}
          </form>
        </div>
      </section>
      <Footer />
    </main>
  );
}
