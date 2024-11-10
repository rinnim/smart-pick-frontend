import Link from "next/link";
import { twMerge } from "tailwind-merge";

const TextAndUnderlineLinkText = ({
  text,
  linkText,
  href = "#",
  className,
  onClick = () => {},
}) => {
  const newClassName = twMerge(
    "text-center text-sm leading-6 text-gray-400",
    className,
  );
  return (
    <p className={newClassName}>
      {text}{" "}
      <Link
        onClick={onClick}
        href={href}
        className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
      >
        {linkText}
      </Link>
    </p>
  );
};
export default TextAndUnderlineLinkText;
