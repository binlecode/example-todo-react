import React from "react";
import { FilterButtonProps } from "../types";

const FilterButton: React.FC<FilterButtonProps> = ({
  name,
  currentFilter,
  setFilter,
}) => {
  const isActive = name === currentFilter;

  return (
    <button
      type="button"
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-primary-500 text-white shadow-md scale-105"
          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:shadow-sm"
      }`}
      aria-pressed={isActive}
      onClick={() => setFilter(name)}
    >
      {name}
    </button>
  );
};

export default FilterButton;
