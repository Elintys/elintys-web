import Link from "next/link";

const LandlordSection = ({ venues, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900">
      {t("Proprietaire d'espaces")}
    </h3>
    <p className="text-sm text-gray-500 mt-2">
      {t("Vos espaces listes")} : {venues.length}
    </p>
    <Link
      href="/profile/venues"
      className="mt-4 inline-flex text-sm text-indigo-600 hover:underline"
    >
      {t("Voir mes espaces")}
    </Link>
  </div>
);

export default LandlordSection;
