const SocialIcon = ({ name }) => {
  if (name === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M6.94 9.5H4.2v9.3h2.74V9.5zm-1.37-1.3a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2zM20.8 13.5c0-2.5-1.3-3.7-3-3.7-1.4 0-2.1.8-2.4 1.3V9.5h-2.6c.03 1 .03 9.3.03 9.3h2.6v-5.2c0-.3.02-.6.1-.8.2-.6.7-1.2 1.6-1.2 1.1 0 1.6.9 1.6 2.1v5.1h2.6v-5.3z"
        />
      </svg>
    );
  }

  if (name === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7.5 3h9A4.5 4.5 0 0 1 21 7.5v9A4.5 4.5 0 0 1 16.5 21h-9A4.5 4.5 0 0 1 3 16.5v-9A4.5 4.5 0 0 1 7.5 3zm0 1.8A2.7 2.7 0 0 0 4.8 7.5v9a2.7 2.7 0 0 0 2.7 2.7h9a2.7 2.7 0 0 0 2.7-2.7v-9a2.7 2.7 0 0 0-2.7-2.7h-9zm4.5 3.2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 1.8a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4zm4.9-.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3c5 0 9 3.6 9 8.5 0 4-2.5 7.4-6 8.3v-5.2l2.1-1.5-2.1-1.6V9.1c0-1.1-.9-2-2-2H10v2.2H8v2h2v6.4C6.5 17.9 4 14.5 4 10.5 4 6.6 7.9 3 12 3z"
      />
    </svg>
  );
};

const SocialLinks = ({ title, links }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <div className="mt-4 flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-indigo-300 hover:text-indigo-700"
          aria-label={link.name}
        >
          <SocialIcon name={link.name} />
          {link.label || link.name}
        </a>
      ))}
    </div>
  </div>
);

export default SocialLinks;
