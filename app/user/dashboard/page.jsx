"use client";
import Container from "@/app/ui/components/Container";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import ProductCardSmall from "@/app/ui/components/ProductCardSmall";
import ProductCardSmallSkeleton from "@/app/ui/components/ProductCardSmallSkeleton";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import Title from "@/app/ui/components/Title";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../UserContext";

const Dashboard = () => {
  const [state] = useContext(UserContext);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const [trackingProduct, setTrackingProduct] = useState([]);
  const [compareProduct, setCompareProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get user products data
  const getUserProductsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user-actions/data",
        { headers: { Authorization: `Bearer ${state.token}` } },
      );
      console.log(response.data.data);
      setFavoriteProduct(response.data.data.favoriteList);
      setTrackingProduct(response.data.data.wishlist);
      setCompareProduct(response.data.data.compares);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    }
    setLoading(false);
  };

  //
  useEffect(() => {
    if (state.user) {
      getUserProductsData();
    }
  }, [state.token, state.user]);

  return (
    <Container>
      {/* favorite products section */}
      <div>
        {/* title and view all link */}
        <div>
          <div className="flex items-center justify-between">
            <Title text="Favorite Products" />
            <Link
              href="/user/favorite"
              className="group relative overflow-hidden text-sm font-medium md:text-base"
            >
              View All Favorite Products
              <span className="absolute bottom-0 left-0 block h-[1px] w-full -translate-x-[100%] bg-gray-600 duration-300 group-hover:translate-x-0" />
            </Link>
          </div>
          <HorizontalBar />
        </div>
        {/* favorite products */}
        {loading ? (
          <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <ProductCardSmallSkeleton />
              </div>
            ))}
          </div>
        ) : favoriteProduct?.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-3 lg:grid-cols-4">
            {favoriteProduct.slice(0, 4).map((product) => (
              <ProductCardSmall product={product} key={product?._id} />
            ))}
          </div>
        ) : error ? (
          <div className="mx-auto my-4 flex max-w-3xl flex-col items-center gap-3 py-12 text-center">
            <ProductNotFound title={error} />
          </div>
        ) : (
          <div className="mx-auto my-4 flex max-w-3xl flex-col items-center gap-3 py-12 text-center">
            <ProductNotFound title="Nothing added to Favorite" />
          </div>
        )}
      </div>
      {/* Wishlist section */}
      <div className="mt-10">
        {/* title and view all link */}
        <div>
          <div className="flex items-center justify-between">
            <Title text="Wishlist" />
            <Link
              href="/user/tracking"
              className="group relative overflow-hidden text-sm font-medium md:text-base"
            >
              View All Wishlist
              <span className="absolute bottom-0 left-0 block h-[1px] w-full -translate-x-[100%] bg-gray-600 duration-300 group-hover:translate-x-0" />
            </Link>
          </div>
          <HorizontalBar />
        </div>
        {/* Wishlist */}
        {loading ? (
          <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <ProductCardSmallSkeleton />
              </div>
            ))}
          </div>
        ) : trackingProduct?.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-3 lg:grid-cols-4">
            {trackingProduct.slice(0, 4).map((product) => (
              <ProductCardSmall product={product} key={product?._id} />
            ))}
          </div>
        ) : error ? (
          <div className="mx-auto my-4 flex max-w-3xl flex-col items-center gap-3 py-12 text-center">
            <ProductNotFound title={error} />
          </div>
        ) : (
          <div className="mx-auto my-4 flex max-w-3xl flex-col items-center gap-3 py-12 text-center">
            <ProductNotFound title="Nothing added to Wishlist" />
          </div>
        )}
      </div>
      {/* compare products section */}
      <div className="mt-10">
        {/* title and view all link */}
        <div>
          <div className="flex items-center justify-between">
            <Title text="Compare Products" />
            <Link
              href="/user/compare"
              className="group relative overflow-hidden text-sm font-medium md:text-base"
            >
              View All Compare Products
              <span className="absolute bottom-0 left-0 block h-[1px] w-full -translate-x-[100%] bg-gray-600 duration-300 group-hover:translate-x-0" />
            </Link>
          </div>
          <HorizontalBar />
        </div>
        {/* compare products */}
        {loading ? (
          <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index}>
                <ProductCardSmallSkeleton />
              </div>
            ))}
          </div>
        ) : compareProduct?.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 pt-10 md:grid-cols-3 lg:grid-cols-4">
            {compareProduct.slice(0, 4).map((product) => (
              <ProductCardSmall product={product} key={product?._id} />
            ))}
          </div>
        ) : error ? (
          <div className="mx-auto my-4 flex max-w-3xl flex-col items-center gap-3 py-12 text-center">
            <ProductNotFound title={error} />
          </div>
        ) : (
          <div className="mx-auto my-4 flex max-w-3xl flex-col items-center gap-3 py-12 text-center">
            <ProductNotFound title="Nothing added to Compare" />
          </div>
        )}
      </div>
    </Container>
  );
};

export default Dashboard;
