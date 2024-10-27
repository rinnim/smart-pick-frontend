import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
const ProductCardSmall = ({ product }) => {
  return (
    <div className="y-200 group flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg border border-gray-200 p-2 duration-200 hover:border-black">
      <Link href={`/product/${product?._id}`}>
        <div className="relative h-60 w-full p-2">
          <Image
            height={500}
            width={500}
            src={product?.images[0]}
            alt="productImage"
            className="h-full w-full rounded-md object-cover duration-300 group-hover:scale-110"
          />
        </div>
        <div className="flex flex-col gap-2 px-2 pb-2">
          <h3 className="text-xs font-semibold uppercase">
            {product?.category}
          </h3>
          <h2 className="line-clamp-2 text-sm font-bold md:text-lg">
            {product?.name}
          </h2>
        </div>
      </Link>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="flex gap-2 text-sm md:text-lg">
          <p className="text-gray-500 line-through">{product?.regularPrice}</p>
          <p className="font-bold">{product?.price}</p>
        </div>
        <Button text="buy now" href={product?.url} />
      </div>
    </div>
  );
};

export default ProductCardSmall;
