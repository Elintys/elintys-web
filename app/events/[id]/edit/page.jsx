"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { getStoredAuth } from "../../../components/lib/auth";
import { deleteEvent, fetchEventById, updateEvent } from "../../../store/slices/eventsSlice";
import { fetchCurrentUser } from "../../../store/slices/usersSlice";
import RoleGuard from "../../../components/RoleGuard";
import { ROLES, hasRole, getUserId } from "../../../store/roleUtils";

const getOrganizerId = (event) =>
  event?.organizer?._id ||
  event?.organizerId ||
  event?.organizer ||
  event?.createdBy ||
  null;

export default function EventEditPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params?.id;
  const currentEvent = useSelector((state) => state.events.current);
  const currentUser = useSelector((state) => state.users.current);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    isPublic: true,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!eventId) return;
    dispatch(fetchEventById(eventId));
    dispatch(fetchCurrentUser());
  }, [dispatch, eventId]);

  useEffect(() => {
    if (!currentEvent) return;
    setFormData({
      title: currentEvent.title || "",
      description: currentEvent.description || "",
      startDate: currentEvent.startDate ? currentEvent.startDate.slice(0, 16) : "",
      endDate: currentEvent.endDate ? currentEvent.endDate.slice(0, 16) : "",
      isPublic: currentEvent.isPublic ?? true,
    });
  }, [currentEvent]);

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
      setMessage("Veuillez vous connecter pour modifier cet evenement.");
      return;
    }
    const organizerId = getOrganizerId(currentEvent);
    if (!hasRole(currentUser, ROLES.ORGANIZER) || !organizerId || organizerId !== getUserId(currentUser)) {
      setMessage("Vous n'etes pas autorise a modifier cet evenement.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : undefined,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : undefined,
      };

      if (!eventId) return;
      await dispatch(updateEvent({ id: eventId, payload }));
      setMessage("Evenement mis a jour.");
      router.push(`/events/${eventId}`);
    } catch (error) {
      console.error("Erreur maj evenement:", error);
      setMessage("Erreur lors de la mise a jour.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour supprimer cet evenement.");
      return;
    }
    const organizerId = getOrganizerId(currentEvent);
    if (!hasRole(currentUser, ROLES.ORGANIZER) || !organizerId || organizerId !== getUserId(currentUser)) {
      setMessage("Vous n'etes pas autorise a supprimer cet evenement.");
      return;
    }

    if (!window.confirm("Supprimer cet evenement ?")) return;

    try {
      if (!eventId) return;
      await dispatch(deleteEvent(eventId));
      router.push("/events");
    } catch (error) {
      console.error("Erreur suppression evenement:", error);
      setMessage("Erreur lors de la suppression.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2">Mise a jour</p>
          <h1 className="text-3xl font-bold text-gray-900">
            Modifier l'evenement
          </h1>
        </div>
        <RoleGuard
          requiredRoles={[ROLES.ORGANIZER]}
          title="Acces restreint"
          description="Seuls les organisateurs peuvent modifier un evenement."
        >
          {getOrganizerId(currentEvent) === getUserId(currentUser) ? (
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
                  />
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
                {loading ? "Mise a jour..." : "Enregistrer"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-5 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
              >
                Supprimer
              </button>
              {message && (
                <p className="text-sm text-gray-600">{message}</p>
              )}
            </form>
          ) : (
            <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 max-w-2xl">
              <h2 className="text-lg font-semibold text-gray-900">
                Acces restreint
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Seul l&apos;organisateur qui a cree cet evenement peut le modifier.
                Accedez a vos evenements depuis votre profil.
              </p>
            </div>
          )}
        </RoleGuard>
      </section>
      <Footer />
    </main>
  );
}
