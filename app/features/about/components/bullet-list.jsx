const BulletList = ({ items }) => (
  <ul className="space-y-3 text-sm sm:text-base text-gray-600">
    {items.map(({ key, label }) => (
      <li key={key} className="flex gap-3">
        <span className="mt-1 h-2 w-2 rounded-full bg-indigo-700" />
        <span>{label}</span>
      </li>
    ))}
  </ul>
);

export default BulletList;
