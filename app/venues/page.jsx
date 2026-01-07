"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getStoredAuth } from "../components/lib/auth";
import { createVenue, fetchVenues } from "../store/slices/venuesSlice";

const initialForm = {
  name: "",
  address: "",
  city: "",
  country: "",
  capacity: "",
  type: "",
  description: "",
  imageUrl: "",
};

const formatValue = (value) => {
  if (value === null || value === undefined) return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
};

export default function VenuesPage() {
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.venues.list);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [minCapacity, setMinCapacity] = useState("");

  useEffect(() => {
    dispatch(fetchVenues());
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
      setMessage("Veuillez vous connecter pour creer un lieu.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        capacity: formData.capacity ? Number(formData.capacity) : undefined,
      };
      const action = await dispatch(createVenue(payload));
      const created = action.payload;
      setFormData(initialForm);
      setMessage("Lieu cree.");
    } catch (error) {
      console.error("Erreur creation lieu:", error);
      setMessage("Erreur lors de la creation.");
    } finally {
      setLoading(false);
    }
  };

  const filteredVenues = useMemo(() => {
    return venues.filter((venue) => {
      if (query && !venue.name?.toLowerCase().includes(query.toLowerCase())) return false;
      if (city && venue.city?.toLowerCase() !== city.toLowerCase()) return false;
      if (minCapacity && Number(venue.capacity) < Number(minCapacity)) return false;
      return true;
    });
  }, [venues, query, city, minCapacity]);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <p className="text-sm text-gray-500 mb-2">Catalogue</p>
              <h1 className="text-3xl font-bold text-gray-900">Lieux</h1>
              <p className="text-sm text-gray-500 mt-2">
                Explorez les lieux disponibles pour vos prochains evenements.
              </p>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div>
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-4 mb-4 flex flex-wrap gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Recherche"
                className="border border-gray-200 rounded-lg px-3 py-2"
              />
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ville"
                className="border border-gray-200 rounded-lg px-3 py-2"
              />
              <input
                type="number"
                min="0"
                value={minCapacity}
                onChange={(e) => setMinCapacity(e.target.value)}
                placeholder="Capacite min"
                className="border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div className="space-y-3">
              {filteredVenues.map((venue) => (
                <Link
                  key={venue._id || venue.name}
                  href={`/venues/${venue._id}`}
                  className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-md transition block p-5"
                >
                  <h2 className="text-lg font-semibold text-gray-800">{venue.name}</h2>
                  <p className="text-sm text-gray-600">
                    {venue.address} {venue.city ? `- ${venue.city}` : ""}
                  </p>
                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    {Object.entries(venue || {}).map(([key, value]) => (
                      <div key={key} className="flex gap-2">
                        <span className="font-medium text-gray-700">{key}:</span>
                        <span className="text-gray-500 break-all">{formatValue(value)}</span>
                      </div>
                    ))}
                  </div>
                </Link>
              ))}
              {!filteredVenues.length && (
                <p className="text-gray-500">Aucun lieu disponible.</p>
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-3 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-900">Nouveau lieu</h2>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              required
            />
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              required
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Ville"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
            <input
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Pays"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
            <input
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Capacite"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              type="number"
              min="0"
            />
            <input
              name="type"
              value={formData.type}
              onChange={handleChange}
              placeholder="Type"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
              rows={3}
            />
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border border-gray-200 rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
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
