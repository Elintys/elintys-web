import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Breadcrumbs from "../components/Breadcrumbs";
import ResultsSkeleton from "./components/ResultsSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Breadcrumbs />
      <section className="container mx-auto px-4 py-10">
        <div className="h-32 rounded-3xl border border-slate-200 bg-white" />
        <div className="mt-8 grid gap-6 lg:grid-cols-[320px,1fr]">
          <div className="h-[560px] rounded-3xl border border-slate-200 bg-white" />
          <ResultsSkeleton />
        </div>
      </section>
      <Footer />
    </main>
  );
}
