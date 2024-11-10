import Container from "@/app/ui/components/Container";
import PopularOffers from "@/app/ui/components/PopularOffers";
import MostViewedProducts from "@/app/ui/sections/MostViewedProducts";
import PopularBrands from "@/app/ui/sections/PopularBrands";
import PopularCategories from "@/app/ui/sections/PopularCategories";
import PopularProducts from "@/app/ui/sections/PopularProducts";
import PopularSearch from "@/app/ui/sections/PopularSearch";

export default function Home() {
  return (
    <>
      <Container>
        <PopularOffers />
        <PopularCategories />
        <PopularProducts />
        <MostViewedProducts />
        <PopularSearch />
        <PopularBrands />
      </Container>
    </>
  );
}
