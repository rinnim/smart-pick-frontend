import { twMerge } from "tailwind-merge";

const SubTitle = ({ text, className }) => {
  const newClassName = twMerge(
    "text-sm leading-6 text-gray-400 md:mt-1 md:text-base",
    className,
  );
  return <h3 className={newClassName}>{text}</h3>;
};

export default SubTitle;
