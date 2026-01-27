const ProviderTrust = ({ provider }) => (
  <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
    <h2 className="text-sm font-semibold text-gray-900">Confiance</h2>
    <div className="mt-4 grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Prestataire verifie</span>
        <span>{provider.isVerified ? "Oui" : "Non"}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Assurance</span>
        <span>{provider.insuranceProvided ?? "-"}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Licence</span>
        <span>{provider.licenseProvided ?? "-"}</span>
      </div>
      <div className="flex items-center justify-between rounded-2xl border border-gray-100 bg-slate-50 px-4 py-3">
        <span>Politique d'annulation</span>
        <span>{provider.cancellationPolicy ?? "-"}</span>
      </div>
    </div>
  </section>
);

export default ProviderTrust;
