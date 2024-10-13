"use client";

import ProductCard from "../components/ProductCard";
import Title from "../components/Title";
import HorizontalBar from "../components/HorizontalBar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductSkeleton from "../components/ProductSkeleton";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await axios.get(
      `http://localhost:5000/api/product/find?limit=12`
    );
    setProducts(response.data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 lg:px-0">
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <Title text="Top Selling Products" />
          <Link
            href="/product"
            className="font-medium relative group overflow-hidden"
          >
            View All Products
            <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
        <HorizontalBar />
      </div>
      <div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index}>
                <ProductSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products?.map((product) => (
              <ProductCard item={product} key={product?._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularProducts;
