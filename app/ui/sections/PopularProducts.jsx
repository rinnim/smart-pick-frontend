"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import HorizontalBar from "../components/HorizontalBar";
import ProductCard from "../components/ProductCard";
import ProductNotFound from "../components/ProductNotFound";
import ProductSkeleton from "../components/ProductSkeleton";
import Title from "../components/Title";
import toast from "react-hot-toast";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPopularProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/find?sortBy=popularity-high&limit=12`,
      );
      setProducts(response.data.data.products);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <Title text="Popular Products" />
          <Link
            href="/product"
            className="group relative overflow-hidden font-medium"
          >
            View All Products
            <span className="absolute bottom-0 left-0 block h-[1px] w-full -translate-x-[100%] bg-gray-600 duration-300 group-hover:translate-x-0" />
          </Link>
        </div>
        <HorizontalBar />
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>
                <ProductSkeleton />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 py-10 text-center">
            <ProductNotFound title={error} />
            <p className="text-lg leading-6 tracking-wide text-gray-500">
              Try refreshing the page or contact support.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products?.map((product) => (
              <ProductCard product={product} key={product?._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularProducts;
