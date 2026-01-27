const PrivacyHeader = ({ t }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-900">{t("Confidentialite")}</h2>
    <p className="text-sm text-gray-500 mt-2">
      {t("Gerez vos donnees personnelles et vos consentements.")}
    </p>
  </div>
);

export default PrivacyHeader;
