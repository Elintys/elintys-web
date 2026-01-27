const SecurityActions = ({ onLogout, onRelogin, t }) => (
  <div className="flex flex-wrap gap-3">
    <button
      type="button"
      onClick={onLogout}
      className="px-5 py-3 rounded-full bg-gray-900 text-white font-semibold hover:bg-gray-800 transition"
    >
      {t("Se deconnecter")}
    </button>
    <button
      type="button"
      onClick={onRelogin}
      className="px-5 py-3 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
    >
      {t("Se reconnecter")}
    </button>
  </div>
);

export default SecurityActions;
