import Link from "next/link";
import Image from "next/image";
import PriceTimelineChart from "./PriceTimelineChart";
import { MdClose } from "react-icons/md";

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
        <div className="w-1/2">
          <div className="flex items-center justify-center">
            {/* product big image */}
            <div className="w-full lg:w-auto">
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
            <h2 className="text-3xl font-bold">{product?.name}</h2>
            <div className="flex items-center gap-2">
              <Link
                href={`/product?category=${product?.category}`}
                className="cursor-pointer rounded-full bg-[#f7f7f7] px-4 py-2 text-sm"
              >
                Category:{" "}
                <span className="font-bold">
                  {product?.category?.toUpperCase()}
                </span>
              </Link>
              <Link
                href={`/product?category=${product?.category}&brand=${product?.brand}`}
                className="cursor-pointer rounded-full bg-[#f7f7f7] px-4 py-2 text-sm"
              >
                Brand:{" "}
                <span className="font-bold">
                  {product?.brand.toUpperCase()}
                </span>
              </Link>
              <p className="rounded-full bg-[#f7f7f7] px-4 py-2 text-sm">
                Status:{" "}
                <span className="font-bold">
                  {product?.stockStatus.toUpperCase()}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <p className="text-xl text-gray-500 line-through">
                  {product?.regularPrice === undefined || 0
                    ? ""
                    : "৳" + product?.regularPrice}
                </p>
                <p className="text-xl font-bold">
                  {product?.price === 0 ? "Out of Stock" : "৳" + product?.price}
                </p>
              </div>
              <Link
                href={product?.url}
                className="rounded-full bg-[#f7f7f7] px-4 py-2 text-sm"
              >
                Shop:{" "}
                <span className="font-bold">{product?.shop.toUpperCase()}</span>
              </Link>
            </div>
            <p>
              You are saving{" "}
              <span className="text-base font-bold text-green-500">
                ৳
                {product?.price === 0
                  ? 0
                  : product?.regularPrice - product?.price}
              </span>{" "}
              upon purchase.
            </p>
            {/* Price Timeline */}
            <div className="mt-10">
              <h2 className="rounded-xl bg-[#f7f7f7] py-2 text-center text-xl font-semibold">
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
                  <h2 className="rounded-xl bg-[#f7f7f7] py-2 text-center text-xl font-semibold">
                    Specification
                  </h2>
                  <table className="mt-2 min-w-full overflow-hidden">
                    <tbody>
                      {Object.entries(product.features).map(([key, value]) => (
                        <tr
                          key={key}
                          className={`border-b border-gray-200 duration-200 hover:bg-[#f7f7f7]`}
                        >
                          <td className="p-4 font-bold">{key}</td>
                          <td
                            className="p-4"
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

            <div className="flex w-full items-center justify-between gap-5">
              {/* buy now */}
              <div className="w-11/12 cursor-pointer rounded-full bg-[#f7f7f7] py-3 text-center text-xs font-semibold uppercase duration-200 hover:bg-black hover:text-white">
                <Link href={product?.url || "#"}>buy now</Link>
              </div>
              {/* close button */}
              <div
                onClick={onClose}
                className="ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#f7f7f7] duration-200 hover:bg-red-500 hover:text-white"
              >
                <MdClose />
              </div>
            </div>
          </div>
        </div>
      </>
    );
 }

export default ProductCompareCard;