const ProviderSummary = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">A propos</h2>
    <p className="mt-3 text-sm text-gray-600">
      {provider.description || "Aucune description disponible."}
    </p>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Langues</p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.languages?.length ? provider.languages.join(", ") : "-"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Tags</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(provider.tags || []).length ? (
            provider.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-500"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-600">-</span>
          )}
        </div>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Evenements realises
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.completedEvents ?? "-"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Taux de reponse
        </p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.responseRate ?? "-"}
        </p>
      </div>
    </div>
  </section>
);

export default ProviderSummary;
