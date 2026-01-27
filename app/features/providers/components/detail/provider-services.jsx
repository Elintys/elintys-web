import { formatDetailPrice } from "../../utils/provider-formatters";

const ProviderServices = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <h2 className="text-sm font-semibold text-gray-900">Services</h2>
      <p className="text-xs text-gray-400">
        {provider.services?.length || 0} service(s)
      </p>
    </div>
    <div className="mt-4 grid gap-4">
      {(provider.services || []).map((service) => (
        <div
          key={service.id}
          className="rounded-2xl border border-gray-100 bg-slate-50 p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">{service.title}</h3>
              <p className="text-xs text-gray-500">{service.category}</p>
            </div>
            <div className="text-sm font-semibold text-gray-900">
              {formatDetailPrice(service.pricing?.amount, service.pricing?.currency)}
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            {service.description || "Aucune description."}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span className="rounded-full bg-white px-3 py-1">
              {service.pricing?.model || "-"}
            </span>
            {(service.options || []).map((option) => (
              <span
                key={option.label}
                className="rounded-full border border-gray-200 bg-white px-3 py-1"
              >
                {option.label}: {formatDetailPrice(option.price, service.pricing?.currency)}
              </span>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold text-white hover:bg-gray-800"
          >
            Choisir ce service
          </button>
        </div>
      ))}
      {!provider.services?.length && (
        <p className="text-sm text-gray-500">Aucun service disponible.</p>
      )}
    </div>
  </section>
);

export default ProviderServices;
