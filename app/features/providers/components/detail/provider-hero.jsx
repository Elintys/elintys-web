import Link from "next/link";

const ProviderHero = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <div className="h-20 w-20 overflow-hidden rounded-2xl bg-slate-100">
        {provider.avatarUrl ? (
          <img
            src={provider.avatarUrl}
            alt={provider.displayName}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
            Aucun visuel
          </div>
        )}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            {provider.displayName}
          </h1>
          {provider.isVerified && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-700">
              Verifie
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">{provider.mainCategory || "-"}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span>{provider.location?.city || "-"}</span>
          <span>
            {provider.rating?.average ?? "-"} / 5
            {provider.rating?.count ? ` (${provider.rating.count} avis)` : ""}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:items-end">
        <Link
          href={`/providers/${provider.id}/quote`}
          className="rounded-full bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
        >
          Demander un devis
        </Link>
        <Link
          href={`/providers/${provider.id}/contact`}
          className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          Contacter
        </Link>
      </div>
    </div>
  </section>
);

export default ProviderHero;
