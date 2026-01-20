"use client";

import { useEffect, useState } from "react";
import StepControls from "../components/StepControls";

export default function DetailsStep({ initialValues, onSave, onBack, onNext, saving }) {
  const [form, setForm] = useState({
    categoryId: initialValues.categoryId || "",
    externalSourceId: initialValues.externalSourceId || "",
  });

  useEffect(() => {
    setForm({
      categoryId: initialValues.categoryId || "",
      externalSourceId: initialValues.externalSourceId || "",
    });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await onSave(form);
    onNext();
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categorie
        </label>
        <input
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          placeholder="Categorie"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Source externe (optionnel)
        </label>
        <input
          name="externalSourceId"
          value={form.externalSourceId}
          onChange={handleChange}
          placeholder="Identifiant externe"
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      <StepControls onBack={onBack} onNext={handleSubmit} saving={saving} />
    </div>
  );
}
