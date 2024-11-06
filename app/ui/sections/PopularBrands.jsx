import {
  appleLogo,
  asusLogo,
  gigabyteLogo,
  hpLogo,
  msiLogo,
  samsungLogo,
} from "../../assets/index";

import Image from "next/image";
import Link from "next/link";
import HorizontalBar from "../components/HorizontalBar";
import Title from "../components/Title";

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
    <div className="mx-auto max-w-screen-xl p-0 px-4 py-10 lg:px-0">
      <div>
        <Title text="Popular Brands" />
        <HorizontalBar />
      </div>
      <div className="mt-7 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {popularBrands.map(({ title, link, image }, index) => (
          <Link href={`/product/${link}`} key={index}>
            <div
              className={`group flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 px-6 py-5 duration-200 hover:border-black hover:bg-black`}
            >
              <Image
                height={100}
                width={100}
                src={image}
                alt={title}
                className="h-5 w-36 object-contain duration-200 group-hover:brightness-0 group-hover:invert group-hover:filter"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PopularBrands;
