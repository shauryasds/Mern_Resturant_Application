
import React, { useState } from "react";

function Filter({ onFilterChange }) {
  const [filterOptions, setFilterOptions] = useState({
    price: "",
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions(() => ({ [name]: value }));
    onFilterChange({ [name]: value });
  };

  return (
    <div
      className="sticky hidden sm:block md:block lg:block xl:block top-32 border border-blue-200 rounded p-4 my-16 max-h-48 w-full mx-2 bg-white shadow-md" // Tailwind CSS styling
    >
      <div className="font-bold text-md  text-center mb-4">FILTERS</div>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col items-center">
          <div className="text-gray-700  mr-2">Price:</div>
          <select
            name="price"
            value={filterOptions.price}
            onChange={handleFilterChange}
            className="border border-gray-300 w-[50%] rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          >
            <option value="">All</option>
            <option value="500">500 or LESS</option>
            <option value="400">400 or LESS</option>
            <option value="300">300 or LESS</option>
            <option value="200">200 or LESS</option>
            <option value="100">100 or LESS</option>
          </select>
        </div>

       
      </div>
    </div>
  );
}

export default Filter;
