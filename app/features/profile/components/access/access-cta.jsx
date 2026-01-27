import Link from "next/link";

const AccessCta = ({ t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{t("Besoin d'un role ?")}</h3>
      <p className="text-sm text-gray-500 mt-1">
        {t("Pour modifier vos acces, contactez le support ou completez votre verification.")}
      </p>
    </div>
    <Link
      href="/contact"
      className="px-5 py-3 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
    >
      {t("Contacter le support")}
    </Link>
  </div>
);

export default AccessCta;
