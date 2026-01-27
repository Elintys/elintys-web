const VerificationForm = ({ docType, docId, status, onDocTypeChange, onDocIdChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg">
    <select
      value={docType}
      onChange={(event) => onDocTypeChange(event.target.value)}
      className="w-full border border-gray-300 rounded-md px-4 py-2"
      required
    >
      <option value="">Type de document</option>
      <option value="passport">Passeport</option>
      <option value="id">Carte nationale</option>
      <option value="license">Permis</option>
    </select>
    <input
      value={docId}
      onChange={(event) => onDocIdChange(event.target.value)}
      placeholder="Numero du document"
      className="w-full border border-gray-300 rounded-md px-4 py-2"
      required
    />
    <button
      type="submit"
      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
    >
      Soumettre
    </button>
    {status && <p className="text-sm text-gray-600">Statut: {status}</p>}
  </form>
);

export default VerificationForm;
