const PrivacyActions = ({ onConfirm, message, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-2xl">
    <h3 className="text-lg font-semibold text-gray-900">{t("Actions sur les donnees")}</h3>
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={() => onConfirm("export")}
        className="px-5 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
      >
        {t("Telecharger mes donnees")}
      </button>
      <button
        type="button"
        onClick={() => onConfirm("deactivate")}
        className="px-5 py-3 rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition"
      >
        {t("Desactiver mon compte")}
      </button>
      <button
        type="button"
        onClick={() => onConfirm("delete")}
        className="px-5 py-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
      >
        {t("Supprimer mon compte")}
      </button>
    </div>
    {message && (
      <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
        {message.text}
      </p>
    )}
  </div>
);

export default PrivacyActions;
