// app/events/[id]/page.jsx
import { notFound } from "next/navigation";
import { getEventById } from "../../components/lib/api";
import Navbar from "../../components/Navbar";

export default async function EventDetailPage({ params }) {
  const event = await getEventById(params.id);
  console.log("Fetched event:", event);
  if (!event) return notFound();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="container mx-auto px-4 py-10">
        <img
          src={event.image || "/images/image.png"}
          alt={event.title}
          className="rounded-lg shadow-md w-full h-80 object-cover mb-6"
        />
        <h1 className="text-4xl font-bold text-black mb-2">{event.title}</h1>
        <p className="text-gray-600 font-semibold mb-4">{event.category}</p>

        <div className="text-gray-700 leading-relaxed mb-6">
          {event.description}
        </div>

        <div className="space-y-2 text-gray-800">
          <p>
            <strong>Date :</strong>{" "}
            {new Date(event.startDate).toLocaleString("fr-FR", {
              dateStyle: "full",
              timeStyle: "short",
            })}
          </p>
          <p>
            <strong>Lieu :</strong> {event?.venue?.name || "Non spécifié"}
            <br />
            <strong>Adresse :</strong> {event?.venue?.address || "Non spécifiée"}{" "}
            {event?.venue?.country}
          </p>
          <p>
            <strong>Organisateur :</strong> {event?.organizer?.firstName + " " + event?.organizer?.lastName || "Anonyme"}
          </p>
        </div>

        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition">
          Obtenir un billet
        </button>
      </section>
    </main>
  );
}
