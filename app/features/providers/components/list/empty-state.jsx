const EmptyState = ({ hasDateFilter }) => (
  <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center">
    <h3 className="text-lg font-semibold text-gray-900">
      Aucun prestataire disponible
    </h3>
    <p className="mt-2 text-sm text-gray-500">
      {hasDateFilter
        ? "Aucun prestataire disponible a la date choisie."
        : "Essayez d'ajuster vos filtres pour elargir la recherche."}
    </p>
  </div>
);

export default EmptyState;
