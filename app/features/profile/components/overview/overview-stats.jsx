import Link from "next/link";

const OverviewStats = ({ upcomingEvents, visibleTickets, notifications, t }) => (
  <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
      <h3 className="text-sm text-gray-500">{t("Prochains evenements")}</h3>
      <p className="text-2xl font-semibold text-gray-900 mt-2">
        {upcomingEvents.length}
      </p>
      <Link href="/profile/events" className="text-sm text-indigo-600 hover:underline">
        {t("Voir mes evenements")}
      </Link>
    </div>
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
      <h3 className="text-sm text-gray-500">{t("Billets")}</h3>
      <p className="text-2xl font-semibold text-gray-900 mt-2">
        {visibleTickets.length}
      </p>
      <div className="flex items-center justify-between mt-3">
        <Link href="/profile/tickets" className="text-sm text-indigo-600 hover:underline">
          {t("Acceder a mes billets")}
        </Link>
        {visibleTickets.length > 0 && (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
            QR
          </div>
        )}
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
      <h3 className="text-sm text-gray-500">{t("Notifications recentes")}</h3>
      <p className="text-2xl font-semibold text-gray-900 mt-2">
        {notifications.length}
      </p>
      <Link
        href="/profile/notifications"
        className="text-sm text-indigo-600 hover:underline"
      >
        {t("Voir les notifications")}
      </Link>
    </div>
    <div className="bg-white rounded-2xl shadow border border-gray-100 p-5">
      <h3 className="text-sm text-gray-500">{t("Actions rapides")}</h3>
      <div className="flex flex-col gap-2 mt-3 text-sm text-gray-600">
        <Link href="/events" className="hover:text-indigo-600">
          {t("Rechercher un evenement")}
        </Link>
        <Link href="/profile/tickets" className="hover:text-indigo-600">
          {t("Voir mes billets")}
        </Link>
      </div>
    </div>
  </div>
);

export default OverviewStats;
