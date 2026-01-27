const FilterSection = ({ title, children }) => (
  <div className="space-y-3">
    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    {children}
  </div>
);

export default FilterSection;
