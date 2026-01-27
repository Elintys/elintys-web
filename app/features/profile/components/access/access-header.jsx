const AccessHeader = ({ t }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900">{t("Roles et acces")}</h2>
    <p className="text-sm text-gray-500 mt-2">
      {t("Consultez vos roles actifs et les capacites associees.")}
    </p>
  </div>
);

export default AccessHeader;
