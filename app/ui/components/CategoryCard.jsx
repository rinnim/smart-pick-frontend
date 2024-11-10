import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const CategoryCard = ({ href, image, name, className }) => {
  const newClassName = twMerge(
    "group relative h-auto w-full overflow-hidden rounded-md",
    className,
  );
  return (
    <>
      <Link href={href} className={newClassName}>
        <div className="h-full w-full overflow-hidden">
          <Image
            height={400}
            width={400}
            priority
            src={image}
            alt="categoryImage"
            className="h-auto w-full object-cover duration-300 group-hover:scale-110"
          />
          <div className="absolute bottom-3 w-full text-center">
            <p className="text-sm font-bold md:text-base">{name}</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
