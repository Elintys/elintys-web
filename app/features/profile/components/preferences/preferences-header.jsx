const PreferencesHeader = ({ t }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900">{t("Preferences")}</h2>
    <p className="text-sm text-gray-500 mt-2">
      {t("Ajustez la langue, le fuseau horaire et vos choix marketing.")}
    </p>
  </div>
);

export default PreferencesHeader;
