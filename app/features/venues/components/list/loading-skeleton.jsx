export default function LoadingSkeleton({ viewMode }) {
  return (
    <div
      className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${
        viewMode === "list" ? "flex flex-col gap-4 md:flex-row" : ""
      }`}
    >
      <div className="h-40 w-full rounded-xl bg-slate-100 animate-pulse md:w-56" />
      <div className="flex flex-1 flex-col gap-3">
        <div className="h-5 w-2/3 rounded bg-slate-100 animate-pulse" />
        <div className="h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-slate-100 animate-pulse" />
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded-full bg-slate-100 animate-pulse" />
          <div className="h-6 w-20 rounded-full bg-slate-100 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
