// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="container mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Elintys</h3>
          <p className="text-sm text-gray-500 mt-2">
            Une plateforme pour decouvrir, organiser et vivre des evenements.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Explorer</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li><a href="/events" className="hover:text-indigo-600">Evenements</a></li>
            <li><a href="/venues" className="hover:text-indigo-600">Lieux</a></li>
            <li><a href="/providers" className="hover:text-indigo-600">Prestataires</a></li>
            <li><a href="/categories" className="hover:text-indigo-600">Categories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Ressources</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li><a href="/about" className="hover:text-indigo-600">A propos</a></li>
            <li><a href="/contact" className="hover:text-indigo-600">Contact</a></li>
            <li><a href="/notifications" className="hover:text-indigo-600">Notifications</a></li>
            <li><a href="/ai" className="hover:text-indigo-600">Assistant IA</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-gray-900">Compte</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li><a href="/login" className="hover:text-indigo-600">Se connecter</a></li>
            <li><a href="/register" className="hover:text-indigo-600">S&apos;inscrire</a></li>
            <li><a href="/profile" className="hover:text-indigo-600">Profil</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between text-xs text-gray-400 gap-2">
          <span>© {new Date().getFullYear()} Elintys — Tous droits reserves.</span>
          <span>Politique de confidentialite · Conditions d&apos;utilisation</span>
        </div>
      </div>
    </footer>
  );
}
