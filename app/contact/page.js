import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import ContactPage from "../features/contact/pages/contact-page";

export const metadata = {
  title: "Contact | Elintys",
  description:
    "Contactez l’équipe Elintys pour toute question, collaboration ou besoin spécifique.",
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <ContactPage />
      <Footer />
    </main>
  );
}
