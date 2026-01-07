"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../../store/slices/notificationsSlice";

export default function ProfileNotificationsPage() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification._id || notification.message}
            className="bg-white rounded-2xl shadow border border-gray-100 p-5 flex items-center justify-between gap-4"
          >
            <div>
              <p className="text-sm text-gray-700">{notification.message}</p>
              <p className="text-xs text-gray-400 mt-1">
                {notification.type || "Info"}
              </p>
            </div>
            {!notification.read && (
              <button
                type="button"
                onClick={() => handleMarkRead(notification._id)}
                className="text-sm text-indigo-600 hover:underline"
              >
                Marquer comme lu
              </button>
            )}
          </div>
        ))}
        {!notifications.length && (
          <p className="text-sm text-gray-500">Aucune notification.</p>
        )}
      </div>
    </div>
  );
}
