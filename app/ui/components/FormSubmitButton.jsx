import { FaSpinner } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

const FormSubmitButton = ({ loading, label, className, disabled }) => {
  const newClassName = twMerge(
    `mt-5 flex w-full items-center justify-center rounded-md py-2 text-base font-bold uppercase tracking-wide text-gray-300 duration-200 hover:bg-indigo-600 hover:text-white disabled:bg-gray-500 disabled:hover:bg-gray-500 ${
      loading ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-700"
    }`,
    className,
  );
  return (
    <button
      disabled={disabled || loading}
      type="submit"
      className={newClassName}
    >
      {loading ? <FaSpinner className="my-1 animate-spin" /> : label}
    </button>
  );
};

export default FormSubmitButton;
