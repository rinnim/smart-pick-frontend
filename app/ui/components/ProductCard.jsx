import Image from "next/image";
import Link from "next/link";
import ProductCardNav from "../components/ProductCardNav";

const ProductCard = ({ item }) => {
  const showDiscountPercentage = (item) => {
    if (item?.regularPrice && item?.price) {
      return (
        ((item?.regularPrice - item?.price) / item?.regularPrice) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };

  return (
    <div className="border group border-gray-200 rounded-lg p-2 overflow-hidden flex flex-col justify-between hover:border-black duration-200 cursor-pointer">
      <Link href={`/product/${item?._id}`}>
        <div className="w-full h-60 relative p-2">
          {showDiscountPercentage(item) > 0 && (
            <span className="absolute right-0 top-0 m-1 z-10 w-16 text-xs text-center py-1 rounded-md font-semibold border">
              {showDiscountPercentage(item)}% OFF
            </span>
          )}
          <Image
            height={1000}
            width={1000}
            src={item?.images[0]}
            alt="productImage"
            className="w-full h-full rounded-md object-cover group-hover:scale-110 duration-300"
          />
        </div>
        <div className="px-2 flex flex-col gap-2 pb-2">
          <h3 className="text-xs uppercase font-semibold text-lightText">
            {item?.category}
          </h3>
          <h2 className="text-lg font-bold line-clamp-2">{item?.name}</h2>
        </div>
      </Link>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="flex items-center gap-2">
          <p className="font-bold text-skyText">{item?.price}</p>
          <p className="line-through text-gray-500 font-medium">
            {item?.regularPrice}
          </p>
        </div>
        <ProductCardNav product={item} />
        <div className="bg-[#f7f7f7] uppercase text-xs py-3 text-center rounded-full font-semibold hover:bg-black hover:text-white duration-200 cursor-pointer">
          <Link href={item?.url}>buy now</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
