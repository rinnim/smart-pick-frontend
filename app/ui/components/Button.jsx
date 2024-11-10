import Link from "next/link";
import { twMerge } from "tailwind-merge";

const Button = ({ text, href = "#", className, onClick = () => {} }) => {
  const newClassName = twMerge(
    "flex h-7 w-full cursor-pointer items-center justify-center rounded-full bg-[#f7f7f7] text-center text-xs font-semibold uppercase duration-200 hover:bg-black hover:text-white md:h-10 md:text-base",
    className,
  );
  return (
    <button className={newClassName} onClick={onClick}>
      <Link href={href}>{text}</Link>
    </button>
  );
};

export default Button;
