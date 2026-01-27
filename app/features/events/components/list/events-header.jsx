import Link from "next/link";

export default function EventsHeader({ t, onBecomeOrganizer, isOrganizer }) {
  return (
    <>
      <div className="flex items-center gap-3 text-gray-500 text-sm mb-6">
        <Link href="/" className="inline-flex items-center gap-2 hover:text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {t("Retour")}
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t("Evenements interessants")}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {t("Rechercher, filtrer et sauvegarder vos evenements preferes.")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/favorites"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
          >
            {t("Favoris")}
          </Link>
          <Link
            href="/recommendations"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
          >
            {t("Recommandations")}
          </Link>
          {isOrganizer ? (
            <Link
              href="/events/new"
              className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
            >
              {t("Creer un evenement")}
            </Link>
          ) : (
            <button
              type="button"
              onClick={onBecomeOrganizer}
              className="px-4 py-2 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-300 transition"
            >
              {t("Devenir organisateur")}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
