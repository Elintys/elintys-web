import Link from "next/link";
import { ROLES, hasRole } from "../../../../store/roleUtils";

const EventsHeader = ({ currentUser, t }) => (
  <div className="flex items-center justify-between flex-wrap gap-4">
    <h2 className="text-xl font-semibold text-gray-900">{t("Mes evenements")}</h2>
    {hasRole(currentUser, ROLES.ORGANIZER) && (
      <Link
        href="/events/new"
        className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition"
      >
        {t("Creer un evenement")}
      </Link>
    )}
  </div>
);

export default EventsHeader;
