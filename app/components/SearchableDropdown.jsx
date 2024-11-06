"use client";

import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";

const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full cursor-default rounded-lg border border-gray-200 bg-white py-2 pl-3 pr-10 text-left uppercase focus:border-gray-500 focus:outline-none disabled:bg-gray-100"
      >
        <span className="block truncate">{value ? value : placeholder}</span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <IoChevronDownOutline
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="sticky top-0 z-10 bg-white px-2 py-1.5">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                className="w-full rounded-md border border-gray-200 py-1 pl-9 pr-3 text-sm focus:border-gray-500 focus:outline-none"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="max-h-48 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <div
              className="cursor-pointer px-3 py-2 text-gray-500 uppercase hover:bg-gray-100"
              onClick={() => {
                onChange("");
                setIsOpen(false);
                setSearchTerm("");
              }}
            >
              {placeholder}
            </div>
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={`cursor-pointer px-3 py-2 uppercase text-gray-900 ${
                  value === option ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
              >
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-3 py-2 text-gray-500 uppercase">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
