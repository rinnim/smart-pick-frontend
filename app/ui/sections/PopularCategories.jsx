"use client";

import CategoryCard from "@/app/ui/components/CategoryCard";
import Container from "@/app/ui/components/Container";
import Headings from "@/app/ui/components/Headings";
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
    <Container>
      <Headings
        title="Popular Categories"
        text="View All Categories"
        href="/product?limit=10&page=1"
      />
      <div className="grid grid-cols-2 gap-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((item, index) => (
          <CategoryCard
            key={index}
            href={item?.href}
            image={item?.image}
            name={item?.name}
          />
        ))}
      </div>
    </Container>
  );
};

export default PopularCategories;
