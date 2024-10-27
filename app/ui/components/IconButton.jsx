import { twMerge } from "tailwind-merge";

const IconButton = ({ icon, onClick, className }) => {
  const newClassName = twMerge(
    "flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#f7f7f7] duration-200 hover:bg-red-500 hover:text-white md:h-10 md:w-10",
    className,
  );
  return (
    <div className={newClassName} onClick={onClick}>
      {icon}
    </div>
  );
};

export default IconButton;
