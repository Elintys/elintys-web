"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import apiClient from "../store/apiClient";

const formatValue = (value) => {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

const getProviderName = (provider) =>
  provider?.name || provider?.companyName || provider?.title || "Prestataire";

export default function ProvidersPage() {
  const [providersData, setProvidersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await apiClient.get("/providers");
        setProvidersData(res.data || []);
      } catch (err) {
        console.error("Erreur chargement prestataires:", err);
        setError("Impossible de charger les prestataires.");
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const providers = useMemo(() => {
    return providersData.filter((provider) => {
      if (category && provider.category !== category) return false;
      if (query) {
        const name = getProviderName(provider).toLowerCase();
        if (!name.includes(query.toLowerCase())) return false;
      }
      return true;
    });
  }, [providersData, query, category]);

  const suggestions = providers.slice(0, 2);
  const categories = useMemo(() => {
    const all = providersData.map((provider) => provider.category).filter(Boolean);
    return Array.from(new Set(all));
  }, [providersData]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-gray-500 mb-2">Catalogue</p>
              <h1 className="text-3xl font-bold text-gray-900">Prestataires</h1>
              <p className="text-sm text-gray-500 mt-2">
                Trouvez des experts pour votre evenement.
              </p>
            </div>
            <Link
              href="/services/manage"
              className="px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
            >
              Gerer mes services
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-5 mb-6 flex flex-wrap gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un prestataire"
            className="border border-gray-200 rounded-lg px-3 py-2"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2"
          >
            <option value="">Categorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {loading && (
            <p className="text-gray-500">Chargement des prestataires...</p>
          )}
          {error && (
            <p className="text-red-600">{error}</p>
          )}
          {providers.map((provider) => (
            <Link
              key={provider._id || provider.id || provider.name}
              href={`/providers/${provider._id || provider.id}`}
              className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition p-5"
            >
              <h2 className="text-lg font-semibold text-gray-800">
                {getProviderName(provider)}
              </h2>
              <div className="mt-3 text-sm text-gray-600 space-y-1">
                {Object.entries(provider || {}).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <span className="font-medium text-gray-700">{key}:</span>
                    <span className="text-gray-500 break-all">{formatValue(value)}</span>
                  </div>
                ))}
              </div>
            </Link>
          ))}
          {!loading && !providers.length && !error && (
            <p className="text-gray-500">Aucun prestataire disponible.</p>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Suggestions</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {suggestions.map((provider) => (
              <div
                key={provider._id || provider.id || provider.name}
                className="bg-white rounded-2xl shadow border border-gray-100 p-4"
              >
                <p className="text-sm text-gray-600">{getProviderName(provider)}</p>
                {provider.category && (
                  <p className="text-xs text-gray-400">{provider.category}</p>
                )}
              </div>
            ))}
            {!suggestions.length && (
              <p className="text-gray-500">Aucune suggestion disponible.</p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
