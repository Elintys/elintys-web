const InfoCard = ({ title, description }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
  </div>
);

export default InfoCard;
