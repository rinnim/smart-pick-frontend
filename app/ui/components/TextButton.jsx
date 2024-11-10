import { twMerge } from "tailwind-merge";

const TextButton = ({ text, onClick, className }) => {
  const newClassName = twMerge(
    "rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-red-600",
    className,
  );
  return (
    <button onClick={onClick} className={newClassName}>
      {text}
    </button>
  );
};

export default TextButton;
