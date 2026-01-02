import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          À propos d&apos;Elintys
        </h1>
        <p className="text-gray-700 mb-4">
          Elintys est une plateforme dédiée à la promotion et à la gestion
          d&apos;événements culturels, artistiques et communautaires. Notre
          mission est de connecter les organisateurs d&apos;événements avec un
          public passionné, en offrant une expérience utilisateur fluide et
          engageante.
        </p>
        <p className="text-gray-700 mb-4">
          Que vous soyez un artiste cherchant à promouvoir votre prochain
          spectacle, un organisateur d&apos;événements communautaires ou
          simplement un amateur d&apos;événements à la recherche de nouvelles
          expériences, Elintys est là pour vous.
        </p>
        <p className="text-gray-700">
          Merci de faire partie de notre communauté et de contribuer à la
          richesse culturelle de notre société !
        </p>
        <h3 className="text-xl font-semibold text-black mb-2">
          Pour en savoir plus : 
          <a
            href="https://elintys.com"
            className="text-blue-500 hover:underline"
          >
             https://elintys.com
          </a>
        </h3>
      </section>
    </main>
  );
}
