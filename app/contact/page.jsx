import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import T from "../i18n/T";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-500 mb-2"><T k="Support" /></p>
          <h1 className="text-3xl font-bold text-gray-900"><T k="Contact" /></h1>
          <p className="text-gray-600 mt-2">
            <T k="Une question sur un evenement, un partenariat ou un souci technique ? Ecris-nous et notre equipe te repondra rapidement." />
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow border border-gray-100 p-6 space-y-3 max-w-xl">
          <p className="text-gray-700">
            <T k="Email :" />{" "}
            <a
              href="mailto:contact@elyntis.com"
              className="text-indigo-600 hover:underline"
            >
              contact@elyntis.com
            </a>
          </p>
          <p className="text-gray-700"><T k="Telephone : +1 514 555 0199" /></p>
          <p className="text-gray-700"><T k="Adresse : 1250 Rue Sainte-Catherine, Montreal" /></p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
