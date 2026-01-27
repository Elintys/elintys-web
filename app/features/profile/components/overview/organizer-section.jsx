import Link from "next/link";

const OrganizerSection = ({ organizerEvents, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">
          {t("Espace organisateur")}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {t("Suivez vos evenements et publiez de nouvelles experiences.")}
        </p>
      </div>
      <Link
        href="/events/new"
        className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
      >
        {t("Creer un evenement")}
      </Link>
    </div>
    <div className="grid gap-4 md:grid-cols-4 mt-6">
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">{t("Evenements crees")}</p>
        <p className="text-xl font-semibold text-gray-900 mt-2">
          {organizerEvents.length}
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">{t("Evenements a venir")}</p>
        <p className="text-xl font-semibold text-gray-900 mt-2">
          {
            organizerEvents.filter(
              (event) => event.startDate && new Date(event.startDate) >= new Date()
            ).length
          }
        </p>
      </div>
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">{t("Participants aujourd'hui")}</p>
        <p className="text-xl font-semibold text-gray-900 mt-2">-</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-4">
        <p className="text-sm text-gray-500">{t("Revenus")}</p>
        <p className="text-xl font-semibold text-gray-900 mt-2">-</p>
      </div>
    </div>
  </div>
);

export default OrganizerSection;
