import { IoSearch } from "react-icons/io5";

const SearchInput = ({ 
  value, 
  onChange, 
  placeholder, 
  totalResults = null,
  loading = false 
}) => {
  return (
    <div className="relative flex-1">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-gray-200 px-2 py-2 pl-10 pr-24 focus:border-gray-500 focus:outline-none"
      />
      <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      {!loading && totalResults !== null && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          Found {totalResults} item{totalResults !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
};

export default SearchInput; 