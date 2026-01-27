import Link from "next/link";
import T from "../../../../i18n/t";

const getPageUrl = (baseQuery, page) => {
  const params = new URLSearchParams(baseQuery.toString());
  params.set("page", String(page));
  return `?${params.toString()}`;
};

export default function Pagination({ meta, baseQuery }) {
  const currentPage = Number(meta.page || 1);
  const totalPages = Number(meta.totalPages || 1);

  if (totalPages <= 1) return null;

  const previousPage = Math.max(1, currentPage - 1);
  const nextPage = Math.min(totalPages, currentPage + 1);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
      <Link
        href={getPageUrl(baseQuery, previousPage)}
        className={`rounded-full px-4 py-2 font-semibold transition ${
          currentPage === 1
            ? "pointer-events-none text-slate-300"
            : "text-slate-700 hover:bg-slate-100"
        }`}
        aria-disabled={currentPage === 1}
      >
        <T k="venues.pagination.previous" />
      </Link>

      <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
        <T k="venues.pagination.page" /> {currentPage} <T k="venues.pagination.of" /> {totalPages}
      </span>

      <Link
        href={getPageUrl(baseQuery, nextPage)}
        className={`rounded-full px-4 py-2 font-semibold transition ${
          currentPage === totalPages
            ? "pointer-events-none text-slate-300"
            : "text-slate-700 hover:bg-slate-100"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <T k="venues.pagination.next" />
      </Link>
    </nav>
  );
}
