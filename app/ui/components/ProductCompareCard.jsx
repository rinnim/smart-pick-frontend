import Image from "next/image";
import Link from "next/link";
import { MdClose } from "react-icons/md";
import Button from "./Button";
import IconButton from "./IconButton";
import PriceTimelineChart from "./PriceTimelineChart";

const ProductCompareCard = ({ product, handleClose }) => {
  const onClose = async () => {
    try {
      await handleClose(product);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="w-[47%]">
        <div className="flex items-center justify-center">
          {/* product big image */}
          <div className="w-full">
            <Image
              height={1000}
              width={1000}
              priority
              quality={100}
              src={product?.images[0]}
              alt={product?.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        {/* product details */}
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold md:text-3xl">{product?.name}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs md:text-base">
            <Link
              href={`/product?category=${product?.category}`}
              className="cursor-pointer rounded-full bg-[#f7f7f7] px-4 py-2"
            >
              Category:{" "}
              <span className="font-bold">
                {product?.category?.toUpperCase()}
              </span>
            </Link>
            <Link
              href={`/product?category=${product?.category}&brand=${product?.brand}`}
              className="cursor-pointer rounded-full bg-[#f7f7f7] px-4 py-2"
            >
              Brand:{" "}
              <span className="font-bold">{product?.brand.toUpperCase()}</span>
            </Link>
            <p className="rounded-full bg-[#f7f7f7] px-4 py-2">
              Status:{" "}
              <span className="font-bold">
                {product?.stockStatus.toUpperCase()}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-base md:text-xl">
              <p className="text-gray-500 line-through">
                {product?.regularPrice === undefined || 0
                  ? ""
                  : "৳" + product?.regularPrice}
              </p>
              <p className="font-bold">
                {product?.price === 0 ? "Out of Stock" : "৳" + product?.price}
              </p>
            </div>
            <Link
              href={product?.url}
              className="rounded-full bg-[#f7f7f7] px-4 py-2 text-xs md:text-base"
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
          {/* Price Timeline */}
          <div className="mt-10">
            <h2 className="rounded-xl bg-[#f7f7f7] py-2 text-center text-sm font-semibold md:text-xl">
              Price Timeline
            </h2>
            <div className="flex w-full justify-center p-4">
              <PriceTimelineChart priceTimeline={product?.priceTimeline} />
            </div>
          </div>
          {/* specification */}
          {/* show only if there are features */}
          {Object.entries(product?.features).length > 0 && (
            <div className="mt-10 flex">
              <div
                className="-mt-40 w-full overflow-hidden pt-40"
                id="specification"
              >
                <h2 className="rounded-xl bg-[#f7f7f7] py-2 text-center text-sm font-semibold md:text-xl">
                  Specification
                </h2>
                <table className="mt-2 min-w-full overflow-hidden">
                  <tbody>
                    {Object.entries(product.features).map(([key, value]) => (
                      <tr
                        key={key}
                        className={`border-b border-gray-200 duration-200 hover:bg-[#f7f7f7]`}
                      >
                        <td className="whitespace-nowrap py-2 text-center md:text-start text-xs font-bold [text-orientation:mixed] [writing-mode:vertical-rl] md:p-4 md:text-base md:[text-orientation:unset] md:[writing-mode:horizontal-tb]">
                          {key}
                        </td>
                        <td
                          className="break-words py-2 pl-2 text-xs md:p-4 md:text-base"
                          dangerouslySetInnerHTML={{
                            __html: value,
                          }}
                        />
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex w-full items-center justify-between gap-1 md:gap-5">
            {/* buy now */}
            <Button text="buy now" href={product?.url} />
            {/* close button */}
            <IconButton icon={<MdClose />} onClick={onClose} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCompareCard;
