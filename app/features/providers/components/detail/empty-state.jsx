import Link from "next/link";

const EmptyState = () => (
  <div className="rounded-3xl border border-dashed border-gray-200 bg-white p-8 text-center">
    <h2 className="text-lg font-semibold text-gray-900">Prestataire introuvable</h2>
    <p className="mt-2 text-sm text-gray-500">
      Verifiez l'identifiant ou revenez au listing.
    </p>
    <Link
      href="/providers"
      className="mt-4 inline-flex rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
    >
      Retour aux prestataires
    </Link>
  </div>
);

export default EmptyState;
