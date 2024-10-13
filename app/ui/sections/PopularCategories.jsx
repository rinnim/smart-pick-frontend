"use client";

import Image from "next/image";
import Link from "next/link";
import HorizontalBar from "../components/HorizontalBar";
import Title from "../components/Title";

const PopularCategories = () => {
  const categories = [
    {
      _id: 1001,
      name: "Laptop & Tablet",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1002,
      name: "Components",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1003,
      name: "Accessories",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1004,
      name: "Office Equipment",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1005,
      name: "Gadgets",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1006,
      name: "Router & Network",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1007,
      name: "TV & Speaker",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1008,
      name: "Cameras",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1009,
      name: "Home Appliance",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1010,
      name: "Monitor and Displays",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1011,
      name: "Computers",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
    {
      _id: 1012,
      name: "Smartphone & Tablet",
      image: "https://placehold.co/400@2x.png",
      href: "#",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 lg:px-0">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <Title text="Popular Categories" />
          <Link
            href={"/category/tvAndAudio"}
            className="font-medium relative group overflow-hidden"
          >
            View All Categories
            <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
        <HorizontalBar />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7">
        {categories.map((item, index) => (
          <Link
            href={item?.href}
            key={index}
            className="w-full h-auto relative group overflow-hidden rounded-md"
          >
            <div className="w-full h-full overflow-hidden">
              <Image
                height={400}
                width={400}
                priority
                src={item?.image}
                alt="categoryImage"
                className="w-full h-auto group-hover:scale-110 duration-300 object-cover"
              />
              <div className="absolute bottom-3 w-full text-center">
                <p className="text-sm md:text-base font-bold">{item?.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularCategories;
