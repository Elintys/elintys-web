import VenueForm from "../components/VenueForm";
import StepControls from "../components/StepControls";
import { useLanguage } from "../../../i18n/LanguageProvider";

export default function VenueStep({
  value,
  onChange,
  onSave,
  onBack,
  onNext,
  saving,
  showWarning,
}) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {showWarning && (
        <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 rounded-lg p-3 text-sm">
          {t(
            "Le lieu n'a pas encore ete enregistre. Vous pouvez continuer, mais le lieu sera manquant."
          )}
        </div>
      )}
      <VenueForm value={value} onChange={onChange} />
      <StepControls
        onBack={onBack}
        onNext={onNext}
        nextLabel={t("Continuer")}
        saving={saving}
      />
      <button
        type="button"
        onClick={() => onSave(value)}
        disabled={saving}
        className="px-5 py-3 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        {saving ? t("Sauvegarde...") : t("Enregistrer le lieu")}
      </button>
    </div>
  );
}
