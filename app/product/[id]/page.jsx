"use client";
import Loading from "@/app/ui/components/Loading";
import PriceTimelineChart from "@/app/ui/components/PriceTimelineChart";
import ProductCard from "@/app/ui/components/ProductCard";
import ProductCardNav from "@/app/ui/components/ProductCardNav";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import ProductSkeleton from "@/app/ui/components/ProductSkeleton";
import ProductDetailsSkeleton from "@/app/ui/components/ProductDetailsSkeleton";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProductDetailsPage = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [similarDifferentShopProducts, setSimilarDifferentShopProducts] =
    useState([]);
  const [similarSameShopProducts, setSimilarSameShopProducts] = useState([]);
  const similarProductsLimit = 8;

  const handleImgClick = (index) => {
    setImgIndex(index);
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/find/${id}`,
      );
      setProduct(response.data.data.product);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };

  const fetchSimilarDifferentShopProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/similar/different-shop`,
        {
          params: {
            id: product._id,
            limit: similarProductsLimit,
          },
        },
      );
      setSimilarDifferentShopProducts(response.data.data.products);
    } catch (error) {
      setSimilarDifferentShopProducts([]);
    }
  };

  const fetchSimilarSameShopProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/similar/same-shop`,
        {
          params: {
            id: product._id,
            limit: similarProductsLimit,
          },
        },
      );
      setSimilarSameShopProducts(response.data.data.products);
    } catch (error) {
      setSimilarSameShopProducts([]);
    }
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      fetchSimilarDifferentShopProducts();
      fetchSimilarSameShopProducts();
      setLoading(false);
    }
  }, [product]);

  return (
    <>
      {loading ? (
        <ProductDetailsSkeleton product={product} />
      ) : error ? (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 py-10 text-center">
          <ProductNotFound title={error} />
          <p className="text-lg leading-6 tracking-wide text-gray-500">
            Try refreshing the page or contact support.
          </p>
        </div>
      ) : (
        <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div className="flex-start flex">
              {/* product small images */}
              <div className="flex flex-col gap-1">
                {product?.images?.map((image, index) => (
                  <Image
                    height={100}
                    width={100}
                    key={index}
                    src={image}
                    alt={product?.name}
                    className={`h-14 w-14 cursor-pointer rounded-xl object-cover opacity-80 duration-300 hover:opacity-100 ${
                      index === imgIndex && "border border-gray-500 opacity-100"
                    }`}
                    onClick={() => handleImgClick(index)}
                  />
                ))}
              </div>

              {/* product big image */}
              <div className="w-full lg:w-auto">
                <Image
                  height={1000}
                  width={1000}
                  priority
                  quality={100}
                  src={product?.images[imgIndex]}
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
                    {product?.regularPrice === 0
                      ? ""
                      : "৳" + product?.regularPrice}
                  </p>
                  <p className="text-xl font-bold">
                    {product?.price === 0
                      ? "Out of Stock"
                      : "৳" + product?.price}
                  </p>
                </div>
                <Link
                  href={product?.url}
                  className="rounded-full bg-[#f7f7f7] px-4 py-2 text-sm"
                >
                  Shop:{" "}
                  <span className="font-bold">
                    {product?.shop.toUpperCase()}
                  </span>
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
              {/* key features */}
              {/* show only if there are features */}
              {product?.features &&
                Object.entries(product?.features).length > 0 && (
                  <div className="flex flex-col">
                    <h3 className="text-lg font-bold">Key Features</h3>
                    {Object?.entries(product?.features)
                      .slice(0, 3) // Only take the first 3 features
                      .map(([key, value]) => {
                        const displayValue = value.split(/<br\s*\/?>/i)[0];
                        return (
                          <div
                            key={key}
                            className="flex items-center justify-between"
                          >
                            <div className="font-semibold">{key}</div>
                            <div
                              className="mr-2"
                              dangerouslySetInnerHTML={{
                                __html: displayValue,
                              }}
                            />
                          </div>
                        );
                      })}
                    {/* Show warranty if it exists */}
                    {product?.features?.Warranty && (
                      <div className="flex items-center justify-between">
                        <div className="font-semibold">Warranty</div>
                        <div
                          className="mr-2"
                          dangerouslySetInnerHTML={{
                            __html: product.features.Warranty,
                          }}
                        />
                      </div>
                    )}
                    <button
                      onClick={() =>
                        document
                          .getElementById("specification")
                          .scrollIntoView({ behavior: "smooth" })
                      }
                      className="text-blue-500 transition duration-300 hover:underline"
                    >
                      View More
                    </button>
                  </div>
                )}
              {/* buy now */}
              <div className="px-10">
                <ProductCardNav product={product} />
              </div>
              <div className="cursor-pointer rounded-full bg-[#f7f7f7] py-3 text-center text-xs font-semibold uppercase duration-200 hover:bg-black hover:text-white">
                <Link href={product?.url}>buy now</Link>
              </div>
            </div>
          </div>
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
          {product?.features &&
            Object.entries(product?.features).length > 0 && (
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
                      {Object.entries(product?.features).map(([key, value]) => (
                        <tr
                          key={key}
                          className={`flex flex-col border-b border-gray-200 duration-200 hover:bg-[#f7f7f7] md:flex-row`}
                        >
                          <td className="flex-1 px-2 pt-2 font-bold md:p-4">
                            {key}
                          </td>
                          <td
                            className="flex-1 px-2 pb-2 md:p-4"
                            dangerouslySetInnerHTML={{ __html: value }}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          <div className="mt-10">
            <h2 className="rounded-xl bg-[#f7f7f7] py-2 text-center text-xl font-semibold">
              Similar Products From Other Shops
            </h2>
            <div className="mt-5">
              {loading ? (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: similarProductsLimit }).map(
                    (_, index) => (
                      <div key={index}>
                        <ProductSkeleton />
                      </div>
                    ),
                  )}
                </div>
              ) : similarDifferentShopProducts.length === 0 ? (
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 py-10 text-center">
                  <ProductNotFound
                    title="No similar products found"
                    className="my-0"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {similarDifferentShopProducts?.map((product) => (
                    <ProductCard product={product} key={product?._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="mt-10">
            <h2 className="rounded-xl bg-[#f7f7f7] py-2 text-center text-xl font-semibold">
              Similar Products From Same Shop
            </h2>
            <div className="mt-5">
              {loading ? (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {Array.from({ length: similarProductsLimit }).map(
                    (_, index) => (
                      <div key={index}>
                        <ProductSkeleton />
                      </div>
                    ),
                  )}
                </div>
              ) : similarSameShopProducts.length === 0 ? (
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 py-10 text-center">
                  <ProductNotFound
                    title="No similar products found"
                    className="my-0"
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                  {similarSameShopProducts?.map((product) => (
                    <ProductCard product={product} key={product?._id} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetailsPage;
