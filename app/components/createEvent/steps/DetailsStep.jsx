import { useEffect, useState } from "react";
import StepControls from "../components/StepControls";
import { useLanguage } from "../../../i18n/LanguageProvider";

export default function DetailsStep({ initialValues, onSave, onBack, saving }) {
  const { t } = useLanguage();
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Categorie (optionnel)")}
        </label>
        <input
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          placeholder={t("Categorie")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Source externe (optionnel)")}
        </label>
        <input
          name="externalSourceId"
          value={form.externalSourceId}
          onChange={handleChange}
          placeholder={t("Identifiant externe")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("Tickets (V1)")}
        </label>
        <input
          value={t("Non disponible en V1")}
          className="w-full border border-gray-200 rounded-lg px-4 py-2 bg-gray-50 text-black placeholder-gray-300 text-gray-400"
          readOnly
        />
      </div>
      <StepControls onBack={onBack} onNext={() => onSave(form)} saving={saving} />
    </form>
  );
}
