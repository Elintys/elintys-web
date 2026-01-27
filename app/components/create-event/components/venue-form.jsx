"use client";

import { useLanguage } from "../../../i18n/language-provider";

export default function VenueForm({ value, onChange }) {
  const { t } = useLanguage();
  const handleChange = (e) => {
    const { name, value: inputValue } = e.target;
    if (name === "capacityMin" || name === "capacityMax") {
      onChange({
        ...value,
        capacity: {
          ...value.capacity,
          [name === "capacityMin" ? "min" : "max"]: inputValue,
        },
      });
      return;
    }
    onChange({ ...value, [name]: inputValue });
  };

  return (
    <div className="space-y-4">
      <input
        name="name"
        value={value.name}
        onChange={handleChange}
        placeholder={t("Nom du lieu")}
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        required
      />
      <input
        name="address"
        value={value.address}
        onChange={handleChange}
        placeholder={t("Adresse")}
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        required
      />
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="city"
          value={value.city}
          onChange={handleChange}
          placeholder={t("Ville")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
        <input
          name="country"
          value={value.country}
          onChange={handleChange}
          placeholder={t("Pays")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <input
          name="capacityMin"
          value={value.capacity.min}
          onChange={handleChange}
          placeholder={t("Capacite min")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          type="number"
          min="0"
        />
        <input
          name="capacityMax"
          value={value.capacity.max}
          onChange={handleChange}
          placeholder={t("Capacite max")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          type="number"
          min="0"
        />
      </div>
      <textarea
        name="notes"
        value={value.notes}
        onChange={handleChange}
        placeholder={t("Notes ou instructions")}
        className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        rows={3}
      />
    </div>
  );
}
