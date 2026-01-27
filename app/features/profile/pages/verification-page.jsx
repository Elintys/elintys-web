"use client";

import Navbar from "../../../components/layout/navbar";
import Footer from "../../../components/layout/footer";
import useProfileVerification from "../hooks/use-profile-verification";
import VerificationForm from "../components/verification/verification-form";

export default function VerificationPage() {
  const { docType, setDocType, docId, setDocId, status, handleSubmit } =
    useProfileVerification();

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Verification identite</h1>
        <VerificationForm
          docType={docType}
          docId={docId}
          status={status}
          onDocTypeChange={setDocType}
          onDocIdChange={setDocId}
          onSubmit={handleSubmit}
        />
      </section>
      <Footer />
    </main>
  );
}
