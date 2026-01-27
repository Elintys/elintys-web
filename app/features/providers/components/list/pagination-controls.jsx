const PaginationControls = ({ page, total, limit, onPageChange }) => {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).slice(
    Math.max(0, page - 3),
    page + 2
  );

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 disabled:opacity-50"
      >
        Precedent
      </button>
      {pages.map((pageNumber) => (
        <button
          key={`page-${pageNumber}`}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={`h-8 w-8 rounded-full text-xs font-semibold ${
            pageNumber === page
              ? "bg-indigo-600 text-white"
              : "border border-gray-200 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
          }`}
        >
          {pageNumber}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-600 disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};

export default PaginationControls;
