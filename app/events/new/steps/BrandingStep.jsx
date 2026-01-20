"use client";

import { useState } from "react";
import StepControls from "../components/StepControls";
import ImageUploader from "../components/ImageUploader";

export default function BrandingStep({
  coverImageUrl,
  onUpload,
  onSave,
  onBack,
  onNext,
  saving,
}) {
  const [warning, setWarning] = useState("");

  const handleNext = () => {
    if (!coverImageUrl) {
      setWarning(
        "Aucune image de couverture. Vous pouvez continuer et l'ajouter plus tard."
      );
    }
    onNext();
  };

  return (
    <div className="space-y-4">
      {warning && (
        <div className="bg-yellow-50 border border-yellow-100 text-yellow-700 rounded-lg p-3 text-sm">
          {warning}
        </div>
      )}
      <ImageUploader onUpload={onUpload} previewUrl={coverImageUrl} loading={saving} />
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="px-5 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
        >
          {saving ? "Sauvegarde..." : "Enregistrer l'image"}
        </button>
      </div>
      <StepControls onBack={onBack} onNext={handleNext} saving={saving} />
    </div>
  );
}
