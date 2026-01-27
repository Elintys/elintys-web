import Footer from "../components/layout/footer";
import Navbar from "../components/layout/navbar";
import AboutPage from "../features/about/pages/about-page";

export const metadata = {
  title: "À propos | Elintys",
  description:
    "Découvrez la mission, la vision et les valeurs d’Elintys, plateforme SaaS qui centralise l’organisation d’événements.",
};

export default function About() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <AboutPage />
      <Footer />
    </main>
  );
}
