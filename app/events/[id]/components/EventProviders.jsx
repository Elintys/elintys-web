"use client";

export default function EventProviders({ providers }) {
  if (!providers || !providers.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Prestataires</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {providers.map((provider, index) => (
          <div
            key={`${provider.name}-${index}`}
            className="bg-white rounded-2xl border border-gray-100 shadow p-5 space-y-2"
          >
            <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
            <p className="text-xs text-gray-500">{provider.role}</p>
            {provider.notes && <p className="text-sm text-gray-600">{provider.notes}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
