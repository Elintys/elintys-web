import ProviderForm from "../components/provider-form";
import ProvidersList from "../components/providers-list";
import StepControls from "../components/step-controls";
import { useLanguage } from "../../../i18n/language-provider";

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
