import { useLanguage } from "../../../i18n/language-provider";

export default function StepControls({
  onBack,
  onNext,
  onSaveDraft,
  onPublish,
  nextLabel = "Continuer",
  saving,
  disableNext,
  showSaveDraft,
  showPublish,
}) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-wrap gap-3">
      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="px-5 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
        >
          {t("Retour")}
        </button>
      )}
      {showSaveDraft && (
        <button
          type="button"
          onClick={onSaveDraft}
          disabled={saving}
          className="px-5 py-3 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
        >
          {saving ? t("Sauvegarde...") : t("Sauvegarder le brouillon")}
        </button>
      )}
      {onNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext || saving}
          className="px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          {saving ? t("Sauvegarde...") : t(nextLabel)}
        </button>
      )}
      {showPublish && (
        <button
          type="button"
          onClick={onPublish}
          disabled={saving}
          className="px-5 py-3 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition"
        >
          {saving ? t("Publication...") : t("Publier")}
        </button>
      )}
    </div>
  );
}
