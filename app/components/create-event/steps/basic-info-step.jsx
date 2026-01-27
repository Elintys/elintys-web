import { useEffect, useState } from "react";
import StepControls from "../components/step-controls";
import { useLanguage } from "../../../i18n/language-provider";

export default function BasicInfoStep({ initialValues, onSubmit, saving, nextLabel }) {
  const [error, setError] = useState("");
  const { t } = useLanguage();
  const toInputDate = (value) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toISOString().slice(0, 16);
  };
  const [form, setForm] = useState({
    title: initialValues.title || "",
    description: initialValues.description || "",
    startDate: toInputDate(initialValues.startDate),
    endDate: toInputDate(initialValues.endDate),
    isPublic: initialValues.isPublic ?? true,
    timezone: initialValues.timezone || "",
  });

  useEffect(() => {
    setForm({
      title: initialValues.title || "",
      description: initialValues.description || "",
      startDate: toInputDate(initialValues.startDate),
      endDate: toInputDate(initialValues.endDate),
      isPublic: initialValues.isPublic ?? true,
      timezone: initialValues.timezone || "",
    });
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const buildPayload = () => ({
    ...form,
    startDate: form.startDate ? new Date(form.startDate).toISOString() : "",
    endDate: form.endDate ? new Date(form.endDate).toISOString() : "",
    status: "DRAFT",
  });

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">{t("Titre")}</label>
        <input
          name="title"
          value={form.title}
          placeholder={t("Titre de l'evenement")}
          onChange={handleChange}
          className="w-full border border-gray-200 text-black placeholder-gray-300 rounded-lg px-4 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Description")}
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder={t("Decrivez l'evenement")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          rows={4}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Debut")}
          </label>
          <input
            type="datetime-local"
            name="startDate"
            value={form.startDate}
            onChange={handleChange}
            placeholder={t("Date de debut")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("Fin")}
          </label>
          <input
            type="datetime-local"
            name="endDate"
            value={form.endDate}
            onChange={handleChange}
            placeholder={t("Date de fin")}
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
        {t("Evenement public")}
      </label>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Fuseau horaire (optionnel)")}
        </label>
        <input
          name="timezone"
          value={form.timezone}
          onChange={handleChange}
          placeholder={t("ex: America/Montreal")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      {error && <p className="text-sm text-red-600">{t(error)}</p>}
      <StepControls
        onNext={() => {
          if (!form.title || !form.startDate || !form.endDate) {
            setError("Titre, debut et fin sont requis.");
            return;
          }
          setError("");
          onSubmit(buildPayload());
        }}
        nextLabel={nextLabel || t("Creer le brouillon et continuer")}
        saving={saving}
      />
    </form>
  );
}
