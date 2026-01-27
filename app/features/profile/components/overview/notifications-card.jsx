import Link from "next/link";

const NotificationsCard = ({ notifications, t }) => (
  <div className="bg-white rounded-2xl shadow border border-gray-100 p-6">
    <h3 className="text-lg font-semibold text-gray-900">
      {t("Notifications recentes")}
    </h3>
    <div className="mt-4 space-y-3">
      {notifications.slice(0, 3).map((notification) => (
        <div
          key={notification._id || notification.message}
          className="text-sm"
        >
          <p className="text-gray-700">{notification.message}</p>
          <p className="text-xs text-gray-400">{notification.type || t("Info")}</p>
        </div>
      ))}
      {!notifications.length && (
        <p className="text-sm text-gray-500">
          {t("Aucune notification recente.")}
        </p>
      )}
    </div>
    <Link
      href="/profile/notifications"
      className="text-sm text-indigo-600 hover:underline mt-3 inline-flex"
    >
      {t("Voir toutes les notifications")}
    </Link>
  </div>
);

export default NotificationsCard;
