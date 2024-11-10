import Link from "next/link";
import { twMerge } from "tailwind-merge";
import HorizontalBar from "./HorizontalBar";
import Title from "./Title";

const Headings = ({ title, text = "", href = "#", className }) => {
  const newClassName = twMerge("flex items-center justify-between", className);
  return (
    <>
      <div className={newClassName}>
        <Title text={title} />
        {text && (
          <Link
            href={href}
            className="group relative overflow-hidden font-medium"
          >
            {text}
            <span className="absolute bottom-0 left-0 block h-[1px] w-full -translate-x-[100%] bg-gray-600 duration-300 group-hover:translate-x-0" />
          </Link>
        )}
      </div>
      <HorizontalBar />
    </>
  );
};

export default Headings;
