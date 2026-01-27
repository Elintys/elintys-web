"use client";

import { useLanguage } from "../../../i18n/language-provider";
import useProfileNotifications from "../hooks/use-profile-notifications";
import NotificationsList from "../components/notifications/notifications-list";

export default function ProfileNotificationsPage() {
  const { t } = useLanguage();
  const { notifications, handleMarkRead } = useProfileNotifications();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">{t("Notifications")}</h2>
      <NotificationsList notifications={notifications} onMarkRead={handleMarkRead} t={t} />
    </div>
  );
}
