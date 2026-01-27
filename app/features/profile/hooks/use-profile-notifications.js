import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
} from "../../../store/slices/notificationsSlice";

export default function useProfileNotifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);

  useEffect(() => {
    console.log("[profile] GET /notifications");
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkRead = (id) => {
    console.log(`[profile] POST /notifications/${id}/read`);
    dispatch(markNotificationRead(id));
  };

  return {
    notifications,
    handleMarkRead,
  };
}
