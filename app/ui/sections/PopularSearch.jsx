import Link from "next/link";
import HorizontalBar from "../components/HorizontalBar";
import Title from "../components/Title";

const PopularSearch = () => {
  const popularSearchItems = [
    { title: "Computer", link: "/product?category=computer" },
    { title: "Laptop", link: "/product?category=laptop" },
    { title: "Smartphone", link: "/product?category=smartphone" },
    { title: "Accessories", link: "/product?category=accessories" },
    { title: "Tablet", link: "/product?category=tablet" },
    { title: "Headphone", link: "/product?category=headphone" },
  ];
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Popular Search" />
        <HorizontalBar />
      </div>
      <div className="mt-7 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {popularSearchItems?.map(({ title, link }, index) => (
          <Link
            key={index}
            href={`${link}`}
            className={`group flex cursor-pointer items-center justify-center rounded-full border border-gray-300 px-6 py-4 text-black duration-200 hover:border-black hover:bg-black hover:text-white`}
          >
            <span className="text-center font-medium capitalize">{title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularSearch;
