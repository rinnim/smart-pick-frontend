import Link from "next/link";
import { twMerge } from "tailwind-merge";

const SearchItemChip = ({ title, href = "#", className }) => {
  const newClassName = twMerge(
    "group flex cursor-pointer items-center justify-center rounded-full border border-gray-300 px-6 py-4 text-black duration-200 hover:border-black hover:bg-black hover:text-white",
    className,
  );
  return (
    <Link href={href} className={newClassName}>
      <span className="text-center font-medium capitalize">{title}</span>
    </Link>
  );
};

export default SearchItemChip;
