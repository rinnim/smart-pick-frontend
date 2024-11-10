import { twMerge } from "tailwind-merge";
const HorizontalBar = ({ className }) => {
  const newClasses = twMerge("w-full h-[1px] bg-gray-200 my-3", className);
  return <div className={newClasses} />;
};

export default HorizontalBar;
