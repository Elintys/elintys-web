import ProviderForm from "../components/ProviderForm";
import ProvidersList from "../components/ProvidersList";
import StepControls from "../components/StepControls";
import { useLanguage } from "../../../i18n/LanguageProvider";

export default function ProvidersStep({
  providers,
  onAdd,
  onRemove,
  onUpdate,
  onBack,
  onNext,
  saving,
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <ProviderForm onAdd={onAdd} />
      <ProvidersList providers={providers} onRemove={onRemove} onUpdate={onUpdate} />
      <StepControls onBack={onBack} onNext={onNext} saving={saving} nextLabel={t("Continuer")} />
    </div>
  );
}
