import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const CloseButton = ({ onClose, className }) => {
  const buttonClass = twMerge(
    "absolute right-4 top-4 text-gray-500 hover:text-gray-700",
    className,
  );

  return (
    <button onClick={onClose} className={buttonClass}>
      <IoClose size={24} />
    </button>
  );
};

export default CloseButton;
