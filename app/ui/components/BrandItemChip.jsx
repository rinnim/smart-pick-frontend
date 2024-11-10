import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const BrandItemChip = ({
  image,
  title = "Brand Logo",
  href = "#",
  className,
}) => {
  const newClassName = twMerge(
    "group flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-6 py-5 duration-200 hover:border-black hover:bg-black",
    className,
  );
  return (
    <Link href={href} className={newClassName}>
      <Image
        height={100}
        width={100}
        src={image}
        alt={title}
        className="h-5 w-36 object-contain duration-200 group-hover:brightness-0 group-hover:invert group-hover:filter"
      />
    </Link>
  );
};

export default BrandItemChip;
