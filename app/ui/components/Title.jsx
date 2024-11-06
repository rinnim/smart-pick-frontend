import { twMerge } from "tailwind-merge";

const Title = ({ text, className }) => {
  const newClassName = twMerge(
    "text-2xl md:text-4xl text-foreground font-bold",
    className,
  );
  return <h2 className={newClassName}>{text}</h2>;
};

export default Title;
