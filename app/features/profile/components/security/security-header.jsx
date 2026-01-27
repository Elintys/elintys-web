const SecurityHeader = ({ t }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900">{t("Securite")}</h2>
    <p className="text-sm text-gray-500 mt-2">
      {t("Gerez les informations de connexion et la securite du compte.")}
    </p>
  </div>
);

export default SecurityHeader;
