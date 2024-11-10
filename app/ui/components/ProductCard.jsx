import Image from "next/image";
import Link from "next/link";
import ProductCardNav from "../components/ProductCardNav";
import Button from "./Button";

const ProductCard = ({ product }) => {
  const showDiscountPercentage = (product) => {
    if (product?.regularPrice && product?.price) {
      return (
        ((product?.regularPrice - product?.price) / product?.regularPrice) *
        100
      ).toFixed(0);
    } else {
      return 0;
    }
  };

  return (
    <div className="flex cursor-pointer flex-col justify-between rounded-lg border border-gray-200 p-2 duration-200 hover:border-black">
      <Link href={`/product/${product?._id}`} className="group">
        <div className="relative h-60 w-full p-2">
          <span className="absolute left-0 top-0 z-[02] m-1 rounded-md border bg-white px-1 py-1 text-center text-xs font-semibold uppercase">
            {product?.shop}
          </span>
          {showDiscountPercentage(product) > 0 && (
            <span className="absolute right-0 top-0 z-[02] m-1 w-16 rounded-md border bg-white py-1 text-center text-xs font-semibold">
              {showDiscountPercentage(product)}% OFF
            </span>
          )}
          <Image
            height={1000}
            width={1000}
            src={product?.images[0]}
            alt="productImage"
            className="h-full w-full rounded-md object-cover duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col gap-2 px-2 pb-2">
          <h3 className="text-xs font-semibold uppercase">
            {product?.category}
          </h3>
          <h2 className="line-clamp-2 text-lg font-bold">{product?.name}</h2>
        </div>
      </Link>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="flex gap-2 text-sm md:text-lg">
          {product?.regularPrice !== 0 && (
            <p className="font-medium text-gray-500 line-through">
              {"৳" + product?.regularPrice}
            </p>
          )}
          <p className="font-bold capitalize">
            {product?.price === 0 ? product?.stockStatus : "৳" + product?.price}
          </p>
        </div>
        <ProductCardNav product={product} />
        <Button text="buy now" href={product?.url} />
      </div>
    </div>
  );
};

export default ProductCard;
