import Navbar from "../components/Navbar";
import T from "../i18n/T";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <section className="flex-1 container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          <T k="A propos d'Elintys" />
        </h1>
        <p className="text-gray-700 mb-4">
          <T k="Elintys est une plateforme dediee a la promotion et a la gestion d'evenements culturels, artistiques et communautaires. Notre mission est de connecter les organisateurs d'evenements avec un public passionne, en offrant une experience utilisateur fluide et engageante." />
        </p>
        <p className="text-gray-700 mb-4">
          <T k="Que vous soyez un artiste cherchant a promouvoir votre prochain spectacle, un organisateur d'evenements communautaires ou simplement un amateur d'evenements a la recherche de nouvelles experiences, Elintys est la pour vous." />
        </p>
        <p className="text-gray-700">
          <T k="Merci de faire partie de notre communaute et de contribuer a la richesse culturelle de notre societe !" />
        </p>
        <h3 className="text-xl font-semibold text-black mb-2">
          <T k="Pour en savoir plus :" />{" "}
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
