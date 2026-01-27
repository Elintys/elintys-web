"use client";

import { useState } from "react";

const emptyProvider = {
  name: "",
  role: "",
  contact: { email: "", phone: "" },
  pricing: { model: "FIXED", amount: "", currency: "CAD" },
  notes: "",
};

export default function ProviderForm({ onAdd }) {
  const [form, setForm] = useState(emptyProvider);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({ ...prev, contact: { ...prev.contact, [key]: value } }));
      return;
    }
    if (name.startsWith("pricing.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({ ...prev, pricing: { ...prev.pricing, [key]: value } }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.name || !form.role) {
      setError("Nom et role sont requis.");
      return;
    }
    setError("");
    onAdd({
      ...form,
      pricing: {
        ...form.pricing,
        amount: form.pricing.amount ? Number(form.pricing.amount) : 0,
        currency: "CAD",
      },
    });
    setForm(emptyProvider);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-5 space-y-3">
      <h3 className="text-lg font-semibold text-gray-900">Ajouter un prestataire</h3>
      <div className="grid md:grid-cols-2 gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nom"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          required
        />
        <input
          name="role"
          value={form.role}
          onChange={handleChange}
          placeholder="Role"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        <input
          name="contact.email"
          value={form.contact.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          type="email"
        />
        <input
          name="contact.phone"
          value={form.contact.phone}
          onChange={handleChange}
          placeholder="Telephone"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        <select
          name="pricing.model"
          value={form.pricing.model}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        >
          <option value="FIXED">Fixe</option>
          <option value="HOURLY">Horaire</option>
          <option value="PACKAGE">Forfait</option>
        </select>
        <input
          name="pricing.amount"
          value={form.pricing.amount}
          onChange={handleChange}
          placeholder="Montant"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          type="number"
          min="0"
        />
        <input
          name="pricing.currency"
          value={form.pricing.currency}
          onChange={handleChange}
          placeholder="Devise"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          readOnly
        />
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Notes"
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        rows={3}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
      >
        Ajouter
      </button>
    </form>
  );
}
