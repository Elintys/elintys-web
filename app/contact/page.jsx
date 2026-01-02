import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact</h1>
        <p className="text-gray-700 mb-4">
          Une question sur un evenement, un partenariat ou un souci technique ?
          Ecris-nous et notre equipe te repondra rapidement.
        </p>
        <div className="bg-white rounded-xl shadow p-6 space-y-2 max-w-xl">
          <p className="text-gray-700">
            Email : <a href="mailto:contact@elyntis.com" className="text-indigo-600 hover:underline">contact@elyntis.com</a>
          </p>
          <p className="text-gray-700">Telephone : +1 514 555 0199</p>
          <p className="text-gray-700">Adresse : 1250 Rue Sainte-Catherine, Montreal</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
