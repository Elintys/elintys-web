"use client";

export default function ProvidersList({ providers, onRemove }) {
  if (!providers.length) {
    return <p className="text-sm text-gray-500">Aucun prestataire ajoute.</p>;
  }

  return (
    <div className="space-y-3">
      {providers.map((provider) => (
        <div
          key={provider._id || provider.id}
          className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-sm font-semibold text-gray-900">{provider.name}</p>
            <p className="text-xs text-gray-500">{provider.role}</p>
            <p className="text-xs text-gray-500">
              {provider.pricing?.model} · {provider.pricing?.amount}{" "}
              {provider.pricing?.currency}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onRemove(provider._id || provider.id)}
            className="text-sm text-red-600 hover:underline"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
}
