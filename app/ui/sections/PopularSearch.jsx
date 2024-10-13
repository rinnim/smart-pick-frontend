import Link from "next/link";
import HorizontalBar from "../components/HorizontalBar";
import Title from "../components/Title";

const PopularSearch = () => {
  const popularSearchItems = [
    { title: "Computer", link: "#" },
    { title: "Laptop", link: "#" },
    { title: "Smartphone", link: "#" },
    { title: "Accessories", link: "#" },
    { title: "Tablet", link: "#" },
    { title: "Headphone", link: "#" },
  ];
  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 lg:px-0">
      <div>
        <Title text="Popular Search" />
        <HorizontalBar />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-7 gap-2">
        {popularSearchItems?.map(({ title, link }, index) => (
          <Link
            key={index}
            href={`/${link}`}
            className={`border rounded-full hover:text-white border-gray-300  hover:border-black hover:bg-black duration-200 flex items-center justify-center px-6 py-4 cursor-pointer group`}
          >
            <span className="text-center font-medium capitalize">{title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularSearch;
