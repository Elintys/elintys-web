export default function ResultsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-5 w-40 rounded-full bg-slate-200" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white"
          >
            <div className="h-40 bg-slate-200" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-2/3 rounded-full bg-slate-200" />
              <div className="h-3 w-1/2 rounded-full bg-slate-200" />
              <div className="h-3 w-4/5 rounded-full bg-slate-200" />
              <div className="h-8 w-28 rounded-full bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
