import Container from "../components/Container";
import Headings from "../components/Headings";
import SearchItemChip from "../components/SearchItemChip";

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
    <Container>
      <Headings title="Popular Search" />
      <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
        {popularSearchItems?.map(({ title, link }, index) => (
          <SearchItemChip key={index} title={title} href={link} />
        ))}
      </div>
    </Container>
  );
};

export default PopularSearch;
