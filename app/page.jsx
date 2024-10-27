// import BannerCategories from "./ui/BannerCategories";
import PopularBrands from "./ui/sections/PopularBrands";
import PopularCategories from "./ui/sections/PopularCategories";
import PopularProducts from "./ui/sections/PopularProducts";
import PopularSearch from "./ui/sections/PopularSearch";
import PopularOffers from "./ui/components/PopularOffers";
export default function Home() {
  return (
    <>
      <div className="max-w-screen-xl mx-auto py-10 px-4 lg:px-0">
        <PopularOffers /> 
        <PopularCategories />
        <PopularProducts />
        <PopularSearch />
        <PopularBrands />
      </div>
    </>
  );
}
