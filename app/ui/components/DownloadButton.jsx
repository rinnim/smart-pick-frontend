import { IoDownload } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

const DownloadButton = ({ onClick, disabled, className }) => {
  const newClassName = twMerge(
    "flex items-center gap-2 rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-red-500 disabled:cursor-not-allowed",
    className,
  );
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={newClassName}
    >
      <IoDownload className="text-lg" />
      Download PDF
    </button>
  );
};

export default DownloadButton;
