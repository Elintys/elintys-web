const PrivacyConfirmModal = ({
  confirmType,
  deleteConfirm,
  loadingAction,
  onDeleteConfirmChange,
  onCancel,
  onExport,
  onDeactivate,
  onDelete,
  t,
}) => {
  if (!confirmType) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md space-y-4">
        <h4 className="text-lg font-semibold text-gray-900">
          {confirmType === "export" && t("Telecharger mes donnees")}
          {confirmType === "deactivate" && t("Desactiver mon compte")}
          {confirmType === "delete" && t("Supprimer mon compte")}
        </h4>
        <p className="text-sm text-gray-600">
          {confirmType === "export" &&
            t("Un export de vos donnees sera prepare. Vous recevrez un lien des qu'il sera pret.")}
          {confirmType === "deactivate" &&
            t("Votre compte sera desactive mais pourra etre restaure.")}
          {confirmType === "delete" &&
            t("Cette action est definitive. Pour confirmer, tapez SUPPRIMER.")}
        </p>
        {confirmType === "delete" && (
          <input
            value={deleteConfirm}
            onChange={(event) => onDeleteConfirmChange(event.target.value)}
            placeholder={t("Tapez SUPPRIMER")}
            className="w-full border border-gray-200 rounded-lg px-4 py-2 text-black placeholder-gray-300"
          />
        )}
        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            {t("Annuler")}
          </button>
          {confirmType === "export" && (
            <button
              type="button"
              onClick={onExport}
              disabled={loadingAction === "export"}
              className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              {loadingAction === "export" ? t("Chargement...") : t("Confirmer")}
            </button>
          )}
          {confirmType === "deactivate" && (
            <button
              type="button"
              onClick={onDeactivate}
              disabled={loadingAction === "deactivate"}
              className="px-4 py-2 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition"
            >
              {loadingAction === "deactivate" ? t("Chargement...") : t("Confirmer")}
            </button>
          )}
          {confirmType === "delete" && (
            <button
              type="button"
              onClick={onDelete}
              disabled={loadingAction === "delete" || deleteConfirm !== "SUPPRIMER"}
              className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50"
            >
              {loadingAction === "delete" ? t("Chargement...") : t("Supprimer")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivacyConfirmModal;
