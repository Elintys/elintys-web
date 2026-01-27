const ErrorState = ({ message, onRetry }) => (
  <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center">
    <p className="text-sm text-red-600">
      {message || "Une erreur est survenue lors du chargement."}
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-4 rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
    >
      Reessayer
    </button>
  </div>
);

export default ErrorState;
