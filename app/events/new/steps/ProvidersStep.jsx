"use client";

import ProviderForm from "../components/ProviderForm";
import ProvidersList from "../components/ProvidersList";
import StepControls from "../components/StepControls";

export default function ProvidersStep({
  providers,
  onAdd,
  onRemove,
  onBack,
  onNext,
  saving,
}) {
  return (
    <div className="space-y-6">
      <ProviderForm onAdd={onAdd} />
      <ProvidersList providers={providers} onRemove={onRemove} />
      <StepControls onBack={onBack} onNext={onNext} saving={saving} />
    </div>
  );
}
