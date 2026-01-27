"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { getStoredAuth } from "../lib/auth";
import {
  createInvitation,
  fetchInvitations,
  updateInvitation,
} from "../store/slices/invitationsSlice";

const initialForm = {
  eventId: "",
  guestUserId: "",
  fullName: "",
  email: "",
  message: "",
  isCouple: false,
};

export default function InvitationsPage() {
  const dispatch = useDispatch();
  const invitations = useSelector((state) => state.invitations.list);
  const [formData, setFormData] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchInvitations());
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
      setMessage("Veuillez vous connecter pour creer une invitation.");
      return;
    }

    setLoading(true);
    try {
      await dispatch(createInvitation(formData));
      setFormData(initialForm);
      setMessage("Invitation creee.");
    } catch (error) {
      console.error("Erreur creation invitation:", error);
      setMessage("Erreur lors de la creation.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (invitationId, status) => {
    const auth = getStoredAuth();
    if (!auth?.token) {
      setMessage("Veuillez vous connecter pour mettre a jour.");
      return;
    }

    try {
      await dispatch(updateInvitation({ id: invitationId, payload: { status } }));
    } catch (error) {
      console.error("Erreur maj invitation:", error);
      setMessage("Erreur lors de la mise a jour.");
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Invitations</h1>
            <div className="space-y-3">
              {invitations.map((invitation) => (
                <div
                  key={invitation._id || invitation.email}
                  className="bg-white rounded-xl shadow p-4 border border-gray-100"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {invitation.fullName || invitation.email}
                  </h2>
                  <p className="text-sm text-gray-600">Event: {invitation.eventId}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-xs text-gray-400">Status:</span>
                    <select
                      value={invitation.status || ""}
                      onChange={(e) => handleStatusChange(invitation._id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                    >
                      <option value="">Non defini</option>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="declined">Declined</option>
                    </select>
                  </div>
                </div>
              ))}
              {!invitations.length && (
                <p className="text-gray-500">Aucune invitation disponible.</p>
              )}
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow p-6 space-y-3 h-fit"
          >
            <h2 className="text-lg font-semibold text-gray-800">Nouvelle invitation</h2>
            <input
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              placeholder="Event ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              required
            />
            <input
              name="guestUserId"
              value={formData.guestUserId}
              onChange={handleChange}
              placeholder="Guest User ID"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nom complet"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              className="w-full border border-gray-300 rounded-md px-4 py-2"
              rows={3}
            />
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                name="isCouple"
                checked={formData.isCouple}
                onChange={handleChange}
              />
              Invitation couple
            </label>
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
