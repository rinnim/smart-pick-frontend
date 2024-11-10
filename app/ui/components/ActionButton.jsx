import { twMerge } from "tailwind-merge";

const ActionButton = ({ onClick, children, className }) => {
  const newClassName = twMerge("text-blue-400 hover:text-blue-600", className);
  return (
    <button onClick={onClick} className={newClassName}>
      {children}
    </button>
  );
};

export default ActionButton;
