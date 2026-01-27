"use client";

import { useEffect, useState } from "react";
import StepControls from "../step-controls";

export default function BasicInfoStep({ initialValues, onSubmit, saving }) {
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    title: initialValues.title || "",
    description: initialValues.description || "",
    isPublic: initialValues.isPublic ?? true,
    startDate: initialValues.startDate ? initialValues.startDate.slice(0, 16) : "",
    endDate: initialValues.endDate ? initialValues.endDate.slice(0, 16) : "",
  });

  useEffect(() => {
    setForm({
      title: initialValues.title || "",
      description: initialValues.description || "",
      isPublic: initialValues.isPublic ?? true,
      startDate: initialValues.startDate ? initialValues.startDate.slice(0, 16) : "",
      endDate: initialValues.endDate ? initialValues.endDate.slice(0, 16) : "",
    });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (!form.title || !form.startDate || !form.endDate) {
      setError("Titre, debut et fin sont requis.");
      return;
    }
    setError("");
    onSubmit({
      ...form,
      startDate: new Date(form.startDate).toISOString(),
      endDate: new Date(form.endDate).toISOString(),
      status: "DRAFT",
    });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Titre de l'evenement"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Decrivez l'evenement"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          rows={4}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Debut</label>
          <input
            type="datetime-local"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Fin</label>
          <input
            type="datetime-local"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
            required
          />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          name="isPublic"
          checked={form.isPublic}
          onChange={handleChange}
        />
        Evenement public
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <StepControls
        onNext={handleNext}
        nextLabel="Creer le brouillon et continuer"
        saving={saving}
      />
    </div>
  );
}
