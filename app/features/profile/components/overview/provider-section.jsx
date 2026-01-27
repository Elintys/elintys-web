import Link from "next/link";

const ProviderSection = ({ t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900">{t("Prestataire")}</h3>
    <p className="text-sm text-gray-500 mt-2">
      {t("Gerer vos services et repondre aux demandes.")}
    </p>
    <Link
      href="/profile/services"
      className="mt-4 inline-flex text-sm text-indigo-600 hover:underline"
    >
      {t("Voir mes services")}
    </Link>
  </div>
);

export default ProviderSection;
