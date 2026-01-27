"use client";

import { useEffect, useState } from "react";
import StepControls from "../step-controls";

export default function VenueStep({ initialValues, onSave, onBack, onNext, saving }) {
  const [warning, setWarning] = useState("");
  const [form, setForm] = useState({
    name: initialValues?.name || "",
    address: initialValues?.address || "",
    city: initialValues?.city || "",
    country: initialValues?.country || "",
    capacityMin: initialValues?.capacity?.min || "",
    capacityMax: initialValues?.capacity?.max || "",
    notes: initialValues?.notes || "",
  });

  useEffect(() => {
    setForm({
      name: initialValues?.name || "",
      address: initialValues?.address || "",
      city: initialValues?.city || "",
      country: initialValues?.country || "",
      capacityMin: initialValues?.capacity?.min || "",
      capacityMax: initialValues?.capacity?.max || "",
      notes: initialValues?.notes || "",
    });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await onSave({
      name: form.name,
      address: form.address,
      city: form.city,
      country: form.country,
      capacity: {
        min: form.capacityMin ? Number(form.capacityMin) : null,
        max: form.capacityMax ? Number(form.capacityMax) : null,
      },
      notes: form.notes,
    });
  };

  const handleNext = () => {
    if (!form.name || !form.address) {
      setWarning("Le lieu n'est pas complet. Vous pouvez continuer mais il sera manquant.");
    }
    onNext();
  };

  return (
    <div className="space-y-4">
      {warning && (
        <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 rounded-lg p-3 text-sm">
          {warning}
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nom du lieu"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          required
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Adresse"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          required
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Ville"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
        <input
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Pays"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="capacityMin"
          value={form.capacityMin}
          onChange={handleChange}
          placeholder="Capacite min"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          type="number"
          min="0"
        />
        <input
          name="capacityMax"
          value={form.capacityMax}
          onChange={handleChange}
          placeholder="Capacite max"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          type="number"
          min="0"
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
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
        >
          {saving ? "Sauvegarde..." : "Enregistrer le lieu"}
        </button>
      </div>
      <StepControls onBack={onBack} onNext={handleNext} saving={saving} />
    </div>
  );
}
