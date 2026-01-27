import Link from "next/link";

const PrivacyConsents = ({ termsDate, privacyDate, marketingConsent, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-4 max-w-2xl">
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{t("Conditions d'utilisation")}</span>
      <span className="text-sm text-gray-900 font-semibold">
        {termsDate || t("Non accepte")}
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{t("Politique de confidentialite")}</span>
      <span className="text-sm text-gray-900 font-semibold">
        {privacyDate || t("Non accepte")}
      </span>
    </div>
    <div className="flex items-center justify-between">
      <span className="text-sm text-gray-500">{t("Consentement marketing")}</span>
      <span className="text-sm text-gray-900 font-semibold">
        {marketingConsent ? t("Oui") : t("Non")}
      </span>
    </div>
    <Link href="/profile/preferences" className="text-sm text-indigo-600 hover:underline">
      {t("Modifier mes preferences")}
    </Link>
  </div>
);

export default PrivacyConsents;
