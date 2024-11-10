"use client";

import Container from "@/app/ui/components/Container";
import Headings from "@/app/ui/components/Headings";
import ProductCard from "@/app/ui/components/ProductCard";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import ProductSkeleton from "@/app/ui/components/ProductSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productCount = 8;

  // Fetch popular products
  const fetchPopularProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/find`,
        {
          params: {
            sortBy: "popularity-high",
            page: 1,
            limit: productCount,
          },
        },
      );
      setProducts(response.data.data.products);
    } catch (error) {
      setError(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularProducts();
  }, []);

  return (
    <Container>
      <Headings
        title="Popular Products"
        text="View All Products"
        href="/product?limit=10&page=1"
      />
      <div className="mt-5">
        {loading ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: productCount }).map((_, index) => (
              <ProductSkeleton key={index} />
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
    </Container>
  );
};

export default PopularProducts;
