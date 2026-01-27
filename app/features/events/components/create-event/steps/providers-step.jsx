"use client";

import ProviderForm from "../provider-form";
import ProvidersList from "../providers-list";
import StepControls from "../step-controls";

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
