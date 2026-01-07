"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { getStoredAuth } from "../../components/lib/auth";
import { createEvent } from "../../store/slices/eventsSlice";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { fetchVenues } from "../../store/slices/venuesSlice";
import { addUserRole, fetchCurrentUser } from "../../store/slices/usersSlice";
import RoleGuard from "../../components/RoleGuard";
import { ROLES, hasRole, getUserId } from "../../store/roleUtils";

const initialForm = {
  title: "",
  description: "",
  startDate: "",
  endDate: "",
  categoryId: "",
  venueId: "",
  isPublic: true,
};

export default function EventCreatePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.list);
  const venues = useSelector((state) => state.venues.list);
  const currentUser = useSelector((state) => state.users.current);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchVenues());
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour creer un evenement.");
      return;
    }
    if (!hasRole(currentUser, ROLES.ORGANIZER)) {
      setMessage("Seuls les organisateurs peuvent creer un evenement.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
      };

      const action = await dispatch(createEvent(payload));
      const created = action.payload;
      setMessage("Evenement cree avec succes.");
      if (created?._id) {
        router.push(`/events/${created._id}`);
      } else {
        setFormData(initialForm);
      }
    } catch (error) {
      console.error("Erreur creation evenement:", error);
      setMessage("Erreur lors de la creation de l'evenement.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDescription = () => {
    const categoryLabel =
      categories.find((cat) => cat._id === formData.categoryId)?.name || "evenement";
    const generated = `Participez a ${formData.title || "cet evenement"} : une experience ${categoryLabel} concue pour rassembler votre communaute.`;
    setFormData((prev) => ({ ...prev, description: generated }));
  };

  const handleActivateRole = async (role) => {
    setMessage("");
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour activer ce role.");
      return;
    }
    if (!getUserId(currentUser)) {
      setMessage("Utilisateur introuvable. Veuillez vous reconnecter.");
      return;
    }
    try {
      await dispatch(addUserRole({ userId: getUserId(currentUser), roleCode: role }));
      await dispatch(fetchCurrentUser());
      setMessage("Role active avec succes.");
    } catch (error) {
      console.error("Erreur activation role:", error);
      setMessage("Erreur lors de l'activation du role.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">Creation</p>
          <h1 className="text-3xl font-bold text-gray-900">
            Creer un evenement
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Renseignez les informations clefs pour publier votre evenement.
          </p>
        </div>
        <RoleGuard
          requiredRoles={[ROLES.ORGANIZER]}
          title="Acces reserve aux organisateurs"
          description="Seuls les utilisateurs avec le role ORGANIZER peuvent creer un evenement."
          activationRole={ROLES.ORGANIZER}
          onActivateRole={handleActivateRole}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-2xl"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2"
                rows={4}
              />
              <button
                type="button"
                onClick={handleGenerateDescription}
                className="mt-2 text-sm text-indigo-600 hover:underline"
              >
                Generer une description (IA)
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Debut
                </label>
                <input
                  type="datetime-local"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fin
                </label>
                <input
                  type="datetime-local"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categorie
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                >
                  <option value="">Selectionner</option>
                  {categories.map((cat) => (
                    <option key={cat._id || cat.name} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu
                </label>
                <select
                  name="venueId"
                  value={formData.venueId}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2"
                >
                  <option value="">Selectionner</option>
                  {venues.map((venue) => (
                    <option key={venue._id || venue.name} value={venue._id}>
                      {venue.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="isPublic"
                checked={formData.isPublic}
                onChange={handleChange}
              />
              Evenement public
            </label>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              {loading ? "Creation..." : "Creer"}
            </button>
            {message && (
              <p className="text-sm text-gray-600">{message}</p>
            )}
          </form>
        </RoleGuard>
      </section>
      <Footer />
    </main>
  );
}
