import {
  appleLogo,
  asusLogo,
  gigabyteLogo,
  hpLogo,
  msiLogo,
  samsungLogo,
} from "../../assets/index";

import BrandItemChip from "../components/BrandItemChip";
import Container from "../components/Container";
import Headings from "../components/Headings";
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
    <Container>
      <Headings title="Popular Brands" />
      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
        {popularBrands.map(({ title, link, image }, index) => (
          <BrandItemChip
            key={index}
            title={title}
            href={`/product?limit=10&page=1&brands=${link}`}
            image={image}
          />
        ))}
      </div>
    </Container>
  );
};

export default PopularBrands;
