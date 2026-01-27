const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="h-20 w-20 rounded-2xl bg-slate-100 animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-2/3 rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-1/2 rounded bg-slate-100 animate-pulse" />
          <div className="h-4 w-1/3 rounded bg-slate-100 animate-pulse" />
        </div>
      </div>
    </div>
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={`section-skeleton-${index}`}
        className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm"
      >
        <div className="h-4 w-1/4 rounded bg-slate-100 animate-pulse" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-slate-100 animate-pulse" />
          <div className="h-3 w-5/6 rounded bg-slate-100 animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
