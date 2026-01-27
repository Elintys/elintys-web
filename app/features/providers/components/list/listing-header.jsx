const ListingHeader = ({ title, subtitle, totalCount, viewMode, onViewChange }) => (
  <section className="bg-white border-b border-gray-100">
    <div className="container mx-auto px-4 py-8 space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Catalogue
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-gray-600">
            {totalCount} prestataire{totalCount > 1 ? "s" : ""} disponible
            {totalCount > 1 ? "s" : ""}
          </div>
          <div className="inline-flex rounded-full border border-gray-200 bg-white p-1 shadow-sm">
            <button
              type="button"
              onClick={() => onViewChange("grid")}
              className={`rounded-full px-4 py-1 text-sm ${
                viewMode === "grid"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Grille
            </button>
            <button
              type="button"
              onClick={() => onViewChange("list")}
              className={`rounded-full px-4 py-1 text-sm ${
                viewMode === "list"
                  ? "bg-indigo-600 text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Liste
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ListingHeader;
