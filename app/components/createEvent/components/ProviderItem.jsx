import { useState } from "react";
import { useLanguage } from "../../../i18n/LanguageProvider";

const formatValue = (value) => (value === null || value === undefined ? "—" : String(value));

export default function ProviderItem({ provider, onRemove, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(provider);
  const { t } = useLanguage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        contact: { ...prev.contact, [key]: value },
      }));
      return;
    }
    if (name.startsWith("pricing.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        pricing: { ...prev.pricing, [key]: value },
      }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdate({
      ...form,
      pricing: {
        ...form.pricing,
        amount: form.pricing.amount ? Number(form.pricing.amount) : 0,
      },
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="border border-gray-200 rounded-xl p-4 space-y-3">
        <div className="grid md:grid-cols-2 gap-3">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={t("Nom")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
          />
          <input
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder={t("Role")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <input
            name="contact.email"
            value={form.contact?.email || ""}
            onChange={handleChange}
            placeholder={t("Email")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
          />
          <input
            name="contact.phone"
            value={form.contact?.phone || ""}
            onChange={handleChange}
            placeholder={t("Telephone")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <select
            name="pricing.model"
            value={form.pricing?.model || "FIXED"}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
          >
            <option value="FIXED">{t("Fixe")}</option>
            <option value="HOURLY">{t("Horaire")}</option>
            <option value="PACKAGE">{t("Forfait")}</option>
          </select>
          <input
            name="pricing.amount"
            value={form.pricing?.amount || ""}
            onChange={handleChange}
            placeholder={t("Montant")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
            type="number"
            min="0"
          />
          <input
            name="pricing.currency"
            value={form.pricing?.currency || "CAD"}
            onChange={handleChange}
            placeholder={t("Devise")}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
            readOnly
          />
        </div>
        <textarea
          name="notes"
          value={form.notes || ""}
          onChange={handleChange}
          placeholder={t("Notes")}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-black placeholder-gray-300"
          rows={2}
        />
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="px-3 py-2 rounded-full bg-indigo-600 text-white text-sm"
          >
            {t("Enregistrer")}
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="px-3 py-2 rounded-full bg-gray-100 text-sm"
          >
            {t("Annuler")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-xl p-4 space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-gray-900">{provider.name}</p>
          <p className="text-sm text-gray-500">{provider.role}</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="text-sm text-indigo-600 hover:underline"
          >
            {t("Modifier")}
          </button>
          <button
            type="button"
            onClick={() => onRemove(provider.id)}
            className="text-sm text-red-600 hover:underline"
          >
            {t("Supprimer")}
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        {t("Contact")}: {formatValue(provider.contact?.email)} /{" "}
        {formatValue(provider.contact?.phone)}
      </p>
      <p className="text-sm text-gray-600">
        {t("Tarif")}: {formatValue(provider.pricing?.model)} -{" "}
        {formatValue(provider.pricing?.amount)} {formatValue(provider.pricing?.currency)}
      </p>
      {provider.notes && <p className="text-sm text-gray-500">{provider.notes}</p>}
    </div>
  );
}
