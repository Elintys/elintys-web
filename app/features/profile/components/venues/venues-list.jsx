import Link from "next/link";

const VenuesList = ({ venues }) => (
  <div className="grid gap-4">
    {venues.map((venue) => (
      <div
        key={venue._id || venue.title}
        className="bg-white rounded-2xl shadow border border-gray-100 p-5"
      >
        <h3 className="text-lg font-semibold text-gray-900">
          {venue.title || "Lieu"}
        </h3>
        <p className="text-sm text-gray-500">
          {venue?.location?.city || ""} {venue?.location?.country || ""}
        </p>
        <Link href={`/venues/${venue._id}`} className="text-sm text-indigo-600 hover:underline">
          Voir le lieu
        </Link>
      </div>
    ))}
    {!venues.length && (
      <p className="text-sm text-gray-500">Aucun espace liste pour le moment.</p>
    )}
  </div>
);

export default VenuesList;
