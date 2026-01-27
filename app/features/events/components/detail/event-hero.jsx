"use client";

const statusLabel = (event) => {
  if (!event) return "";
  const status = String(event.status || "").toUpperCase();
  if (status === "DRAFT") return "Brouillon";
  if (status === "CANCELLED" || status === "CANCELED") return "Annule";
  if (event.isPublic === false) return "Prive";
  return "Public";
};

export default function EventHero({ event, formattedDate, locationLabel }) {
  const coverImage = event.imageUrl || "/images/image.png";
  const badge = statusLabel(event);

  return (
    <section className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden">
      <img
        src={coverImage}
        alt={event.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide">
          <span className="px-3 py-1 rounded-full bg-white/20 border border-white/30">
            {badge}
          </span>
          <span>{formattedDate}</span>
          <span>•</span>
          <span>{locationLabel}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold mt-4">{event.title}</h1>
      </div>
    </section>
  );
}
