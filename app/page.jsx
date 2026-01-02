// app/page.jsx
import EventList from "./components/EventList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Événements à venir
        </h1>
        <EventList />
      </section>

      <Footer />
    </main>
  );
}
