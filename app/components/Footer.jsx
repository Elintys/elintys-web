// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-10">
      <div className="container mx-auto text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} Elintys — Tous droits réservés.
      </div>
    </footer>
  );
}
