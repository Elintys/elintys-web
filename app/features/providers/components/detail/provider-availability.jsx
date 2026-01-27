const ProviderAvailability = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-sm font-semibold text-gray-900">Disponibilite</h2>
      <span
        className={`rounded-full px-3 py-1 text-xs ${
          provider.isAvailable
            ? "bg-emerald-50 text-emerald-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {provider.isAvailable ? "Disponible" : "Indisponible"}
      </span>
    </div>
    <div className="mt-4 grid gap-4 sm:grid-cols-2">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Jours</p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.availability?.days?.length
            ? provider.availability.days.join(", ")
            : "-"}
        </p>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">Horaires</p>
        <p className="mt-2 text-sm text-gray-600">
          {provider.availability?.hours?.from && provider.availability?.hours?.to
            ? `${provider.availability.hours.from} - ${provider.availability.hours.to}`
            : "-"}
        </p>
      </div>
    </div>
  </section>
);

export default ProviderAvailability;
