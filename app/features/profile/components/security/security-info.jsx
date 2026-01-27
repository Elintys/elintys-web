const SecurityInfo = ({ lastLogin, authProvider, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4">
    <div>
      <p className="text-sm text-gray-500">{t("Derniere connexion")}</p>
      <p className="text-base text-gray-900 font-semibold">
        {lastLogin || t("Non disponible")}
      </p>
    </div>
    <div>
      <p className="text-sm text-gray-500">{t("Fournisseur d'authentification")}</p>
      <p className="text-base text-gray-900 font-semibold">
        {authProvider || "Firebase"}
      </p>
    </div>
    <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
      {t("Les parametres de connexion sont geres via Firebase.")}
    </div>
  </div>
);

export default SecurityInfo;
