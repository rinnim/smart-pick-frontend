import { twMerge } from "tailwind-merge";

const Container = ({ children, className }) => {
  const newClassName = twMerge(
    "mx-auto max-w-screen-xl px-4 py-10 lg:px-0",
    className,
  );
  return <div className={newClassName}>{children}</div>;
};

export default Container;
