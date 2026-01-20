"use client";

import StepControls from "../components/StepControls";

export default function ReviewPublishStep({ draft, onBack, onSaveDraft, onPublish, saving }) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-2xl p-5 text-sm text-gray-600 space-y-4">
        <div>
          <p className="font-semibold text-gray-900">Infos de base</p>
          <p>Titre: {draft.title || "—"}</p>
          <p>Description: {draft.description || "—"}</p>
          <p>Debut: {draft.startDate || "—"}</p>
          <p>Fin: {draft.endDate || "—"}</p>
          <p>Public: {draft.isPublic ? "Oui" : "Non"}</p>
          <p>Categorie: {draft.categoryId || "—"}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Image de couverture</p>
          {draft.coverImageUrl ? (
            <img
              src={draft.coverImageUrl}
              alt="Cover"
              className="w-full max-w-md rounded-xl border border-gray-200"
            />
          ) : (
            <p>Aucune image</p>
          )}
          {draft.imageUrl && (
            <p className="text-xs text-gray-400 mt-2">
              URL: {draft.imageUrl}
            </p>
          )}
        </div>
        <div>
          <p className="font-semibold text-gray-900">Lieu</p>
          <p>{draft.manualVenue?.name || "—"}</p>
          <p>{draft.manualVenue?.address || "—"}</p>
          <p>
            {draft.manualVenue?.city || ""} {draft.manualVenue?.country || ""}
          </p>
        </div>
        <div>
          <p className="font-semibold text-gray-900">Prestataires</p>
          {draft.manualProviders?.length ? (
            <ul className="space-y-1">
              {draft.manualProviders.map((provider) => (
                <li key={provider._id || provider.id}>
                  {provider.name} ({provider.role})
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun prestataire</p>
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
