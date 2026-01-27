const NotificationsList = ({ notifications, onMarkRead, t }) => (
  <div className="space-y-3">
    {notifications.map((notification) => (
      <div
        key={notification._id || notification.message}
        className="bg-white rounded-2xl shadow border border-gray-100 p-5 flex items-center justify-between gap-4"
      >
        <div>
          <p className="text-sm text-gray-700">{notification.message}</p>
          <p className="text-xs text-gray-400 mt-1">
            {notification.type || t("Info")}
          </p>
        </div>
        {!notification.read && (
          <button
            type="button"
            onClick={() => onMarkRead(notification._id)}
            className="text-sm text-indigo-600 hover:underline"
          >
            {t("Marquer comme lu")}
          </button>
        )}
      </div>
    ))}
    {!notifications.length && (
      <p className="text-sm text-gray-500">{t("Aucune notification.")}</p>
    )}
  </div>
);

export default NotificationsList;
