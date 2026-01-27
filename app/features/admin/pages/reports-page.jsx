"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import useAdminReports from "../hooks/use-admin-reports";

export default function AdminReportsPage() {
  const { report, setReport, status, handleSubmit } = useAdminReports();

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Signalements</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 space-y-4 max-w-lg"
        >
          <textarea
            value={report}
            onChange={(event) => setReport(event.target.value)}
            placeholder="Decrire le signalement"
            className="w-full border border-gray-300 rounded-md px-4 py-2"
            rows={4}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Enregistrer
          </button>
          {status && <p className="text-sm text-gray-600">{status}</p>}
        </form>
      </section>
      <Footer />
    </main>
  );
}
