const MultiSelectList = ({ options, selected, onToggle, emptyLabel }) => {
  if (!options.length) {
    return <p className="text-xs text-gray-400">{emptyLabel}</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`rounded-full border px-3 py-1 text-xs transition ${
              isActive
                ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                : "border-gray-200 text-gray-500 hover:border-indigo-300 hover:text-indigo-600"
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default MultiSelectList;
