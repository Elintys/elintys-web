const TeamCard = ({ name, role, description, avatarUrl }) => {
  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((n) => n[0].toUpperCase())
        .join("")
    : "EL";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-sm font-medium text-indigo-700">{role}</p>
        </div>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
            {initials}
          </div>
        )}
      </div>
      {description ? (
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{description}</p>
      ) : null}
    </div>
  );
};

export default TeamCard;
