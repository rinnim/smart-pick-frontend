import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Button from "./Button";
import IconButton from "./IconButton";
import PriceTimelineChart from "./PriceTimelineChart";

const ProductCardWide = ({ product, handleClose }) => {
  const onClose = async () => {
    try {
      await handleClose(product);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="mx-auto max-w-screen-xl rounded-md border-b py-10 lg:px-0">
      <div className="flex flex-col gap-5 md:flex-row md:gap-10">
        <div className="flex items-center justify-center overflow-hidden rounded-xl border lg:w-auto">
          {/* product big image */}
          <Link href={`/product/${product?._id}`} className="cursor-pointer">
            <Image
              height={500}
              width={500}
              priority
              quality={100}
              src={product?.images[0]}
              alt={product?.name}
              className="object-cover"
            />
          </Link>
        </div>
        {/* product details */}
        <div className="flex w-full flex-col gap-1">
          <h2 className="text-base font-bold md:text-2xl">{product?.name}</h2>
          {/* product tags */}
          <div className="mt-2 flex items-center gap-2 text-xs md:text-base">
            <Link
              href={`/product?category=${product?.category}`}
              className="cursor-pointer rounded-full bg-[#f7f7f7] px-2 py-1 md:px-4 md:py-2"
            >
              Category:{" "}
              <span className="font-bold">
                {product?.category?.toUpperCase()}
              </span>
            </Link>
            <Link
              href={`/product?category=${product?.category}&brand=${product?.brand}`}
              className="cursor-pointer rounded-full bg-[#f7f7f7] px-2 py-1 md:px-4 md:py-2"
            >
              Brand:{" "}
              <span className="font-bold">{product?.brand.toUpperCase()}</span>
            </Link>
            <p className="rounded-full bg-[#f7f7f7] px-2 py-1 md:px-4 md:py-2">
              Status:{" "}
              <span className="font-bold">
                {product?.stockStatus.toUpperCase()}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-base md:text-xl">
              <p className="text-md text-gray-500 line-through">
                {product?.regularPrice === undefined || 0
                  ? ""
                  : "৳" + product?.regularPrice}
              </p>
              <p className="text-md font-bold">
                {product?.price === 0 ? "Out of Stock" : "৳" + product?.price}
              </p>
            </div>
            <Link
              href={product?.url}
              className="rounded-full bg-[#f7f7f7] px-2 py-1 text-xs md:px-4 md:py-2 md:text-base"
            >
              Shop:{" "}
              <span className="font-bold">{product?.shop.toUpperCase()}</span>
            </Link>
          </div>
          <p className="text-xs md:text-base">
            You are saving{" "}
            <span className="font-bold text-green-500">
              ৳
              {product?.price === 0
                ? 0
                : product?.regularPrice - product?.price}
            </span>{" "}
            upon purchase.
          </p>
          {/* price timeline */}
          <div className="flex w-full justify-center p-4">
            <PriceTimelineChart priceTimeline={product?.priceTimeline} />
          </div>

          <div className="flex w-full items-center justify-between gap-5">
            {/* buy now */}
            <Button className="w-11/12" text="buy now" href={product?.url} />
            {/* close button */}
            <IconButton icon={<MdClose />} onClick={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWide;
