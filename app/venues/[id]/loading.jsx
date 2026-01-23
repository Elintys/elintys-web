export default function LoadingVenueDetails() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="container mx-auto px-4 pb-24 pt-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="h-56 w-full rounded-3xl bg-slate-100 animate-pulse" />
              <div className="mt-6 space-y-3">
                <div className="h-5 w-1/2 rounded bg-slate-100 animate-pulse" />
                <div className="h-4 w-1/3 rounded bg-slate-100 animate-pulse" />
                <div className="h-4 w-1/4 rounded bg-slate-100 animate-pulse" />
              </div>
            </div>
            {Array.from({ length: 6 }).map((_, index) => (
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
          <div className="hidden lg:block">
            <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
              <div className="h-6 w-1/2 rounded bg-slate-100 animate-pulse" />
              <div className="mt-4 h-10 w-full rounded-full bg-slate-100 animate-pulse" />
              <div className="mt-2 h-10 w-full rounded-full bg-slate-100 animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
