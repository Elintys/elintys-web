"use client";

export default function AdminTable({
  columns,
  rows,
  isLoading = false,
  emptyMessage = "Aucune donnee disponible.",
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left font-semibold">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 text-slate-700">
          {/* Keep a single-row message for loading or empty states. */}
          {isLoading && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                Chargement en cours...
              </td>
            </tr>
          )}
          {!isLoading && rows.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          )}
          {!isLoading &&
            rows.map((row) => (
              <tr key={row.id || row.key}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-middle">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
