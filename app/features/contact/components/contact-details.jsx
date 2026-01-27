const ContactDetails = ({ title, items }) => (
  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <dl className="mt-4 space-y-4 text-sm text-gray-600">
      {items.map((item) => (
        <div key={item.key}>
          <dt className="font-medium text-gray-800">{item.label}</dt>
          <dd className="mt-1">{item.value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

export default ContactDetails;
