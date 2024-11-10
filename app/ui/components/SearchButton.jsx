import { IoSearch } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const SearchButton = ({ disabled, className }) => {
  const newClassName = twMerge(
    "flex items-center gap-2 rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed",
    className,
  );
  return (
    <button type="submit" disabled={disabled} className={newClassName}>
      <IoSearch className="text-lg" />
      Search
    </button>
  );
};

export default SearchButton;
