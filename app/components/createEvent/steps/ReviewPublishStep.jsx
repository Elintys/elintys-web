import StepControls from "../components/StepControls";
import { useLanguage } from "../../../i18n/LanguageProvider";

const formatValue = (value) => (value === null || value === undefined ? "—" : value);

export default function ReviewPublishStep({
  draft,
  onBack,
  onSaveDraft,
  onPublish,
  saving,
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-xl p-4 space-y-4 text-sm text-gray-600">
        <div>
          <p className="font-semibold text-gray-800">{t("Infos")}</p>
          <p>{t("Titre")}: {formatValue(draft.title)}</p>
          <p>{t("Description")}: {formatValue(draft.description)}</p>
          <p>{t("Debut")}: {formatValue(draft.startDate)}</p>
          <p>{t("Fin")}: {formatValue(draft.endDate)}</p>
          <p>{t("Fuseau horaire")}: {formatValue(draft.timezone)}</p>
          <p>{t("Public")}: {draft.isPublic ? t("Oui") : t("Non")}</p>
          <p>{t("Categorie")}: {formatValue(draft.categoryId)}</p>
          <p>{t("Source externe")}: {formatValue(draft.externalSourceId)}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{t("Lieu")}</p>
          <p>{formatValue(draft.manualVenue?.name)}</p>
          <p>
            {formatValue(draft.manualVenue?.address)}{" "}
            {formatValue(draft.manualVenue?.city)}
          </p>
          <p>{formatValue(draft.manualVenue?.country)}</p>
          <p>
            {t("Capacite")}: {formatValue(draft.manualVenue?.capacity?.min)} -{" "}
            {formatValue(draft.manualVenue?.capacity?.max)}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">{t("Prestataires")}</p>
          {draft.manualProviders?.length ? (
            <ul className="space-y-1">
              {draft.manualProviders.map((provider) => (
                <li key={provider.id || provider._id}>
                  {provider.name} ({provider.role})
                </li>
              ))}
            </ul>
          ) : (
            <p>{t("Aucun prestataire")}</p>
          )}
        </div>
      </div>
      <StepControls
        onBack={onBack}
        onSaveDraft={onSaveDraft}
        showSaveDraft
        onPublish={onPublish}
        showPublish
        saving={saving}
      />
    </div>
  );
}
