import {
  appleLogo,
  asusLogo,
  gigabyteLogo,
  hpLogo,
  msiLogo,
  samsungLogo,
} from "../../assets/index";

import Title from "../components/Title";
import HorizontalBar from "../components/HorizontalBar";
import Image from "next/image";
import Link from "next/link";

const PopularBrands = () => {
  const popularBrands = [
    { title: "Apple", link: "apple", image: appleLogo },
    { title: "Asus", link: "asus", image: asusLogo },
    { title: "Gigabyte", link: "gigabyte", image: gigabyteLogo },
    { title: "HP", link: "hp", image: hpLogo },
    { title: "MSI", link: "msi", image: msiLogo },
    { title: "Samsung", link: "samsung", image: samsungLogo },
  ];

  return (
    <div className="p-0 max-w-screen-xl mx-auto py-10 px-4 lg:px-0">
      <div>
        <Title text="Popular Brands" />
        <HorizontalBar />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mt-7 gap-2">
        {popularBrands.map(({ title, link, image }, index) => (
          <Link href={`/product/${link}`} key={index}>
            <div
              className={`border rounded-lg border-gray-300 hover:bg-black hover:border-black duration-200 flex items-center justify-center px-6 py-5 cursor-pointer group`}
            >
              <Image
                height={100}
                width={100}
                src={image}
                alt={title}
                className="w-36 h-5 object-contain group-hover:filter group-hover:brightness-0 group-hover:invert duration-200"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularBrands;
