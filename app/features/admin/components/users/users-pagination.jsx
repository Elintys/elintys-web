const UsersPagination = ({ page, totalPages, onPageChange, t }) => (
  <div className="flex items-center justify-between text-sm text-slate-500">
    <span>
      {t("Page")} {page} / {totalPages}
    </span>
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
      >
        {t("Precedent")}
      </button>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
      >
        {t("Suivant")}
      </button>
    </div>
  </div>
);

export default UsersPagination;
