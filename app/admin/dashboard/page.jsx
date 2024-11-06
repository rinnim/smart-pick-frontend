"use client";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import ProductCardSmall from "@/app/ui/components/ProductCardSmall";
import ProductCardSmallSkeleton from "@/app/ui/components/ProductCardSmallSkeleton";
import ProductDoughnutChart from "@/app/ui/components/ProductDoughnutChart";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import StockDoughnutChart from "@/app/ui/components/StockDoughnutChart";
import Title from "@/app/ui/components/Title";
import UserBarChart from "@/app/ui/components/UserBarChart";
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
  const [shopStats, setShopStats] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserProductsData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user-actions/data",
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        );
        console.log(response.data);
        setFavoriteProduct(response.data.favorites);
        setTrackingProduct(response.data.trackings);
        setCompareProduct(response.data.compares);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    if (state.user) {
      getUserProductsData();
    }
  }, [state.token, state.user]);

  useEffect(() => {
    const getShopStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin-actions/shop-stats",
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        );
        console.log(response.data.data);
        setShopStats(response.data.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        setError(error.message);
      }
    };

    if (state.user) {
      getShopStats();
    }
  }, [state.token, state.user]);

  useEffect(() => {
    const getUserStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin-actions/users-by-date",
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };

    if (state.user) {
      getUserStats();
    }
  }, [state.token, state.user]);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      {/* Quick Menu Section */}
      <div className="">
        <Title text="Quick Menu" />
        <HorizontalBar />
        <div className="mt-5">
          <div className="">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
              <button className="bgm-[#f7f7f7] flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-10 text-center text-xs font-semibold uppercase text-black duration-200 hover:bg-black hover:text-white md:h-10 md:text-base">
                <Link href="/admin/users-list">Users List</Link>
              </button>
              <button className="bgm-[#f7f7f7] flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-10 text-center text-xs font-semibold uppercase text-black duration-200 hover:bg-black hover:text-white md:h-10 md:text-base">
                <Link href="/admin/products-list">Products List</Link>
              </button>
              <button className="bgm-[#f7f7f7] flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-10 text-center text-xs font-semibold uppercase text-black duration-200 hover:bg-red-500 hover:text-white md:h-10 md:text-base">
                <Link href="/admin/shops-list">Shops List</Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Stats Section */}
      <div className="mt-10">
        <Title text="Product Stats" />
        <HorizontalBar />
        <div className="mt-5">
          <div className="rounded-lg border border-gray-200 p-4">
            <ProductDoughnutChart
              shops={shopStats?.shops}
              totalProducts={shopStats?.totalProducts}
              totalShops={shopStats?.totalShops}
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <Title text="User Stats" />
          <Link
            href="/admin/users-list"
            className="group relative overflow-hidden text-sm font-medium md:text-base"
          >
            View All Users
            <span className="absolute bottom-0 left-0 block h-[1px] w-full -translate-x-[100%] bg-gray-600 duration-300 group-hover:translate-x-0" />
          </Link>
        </div>
        <HorizontalBar />
        <div className="mt-5 rounded-lg border border-gray-200 p-4">
          <UserBarChart
            totalUsers={userData?.total}
            usersByDate={userData?.usersByDate}
          />
        </div>
      </div>
      {/* Stock Stats Section */}
      <div className="mt-10">
        <Title text="Shop Stock Stats" />
        <HorizontalBar />
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {shopStats?.shops?.map((shop) => (
            <div
              key={shop._id}
              className="rounded-lg border border-gray-200 p-4"
            >
              <StockDoughnutChart
                shop={shop.shop}
                count={shop.count}
                stockStatusCounts={shop.stockStatusCounts}
              />
            </div>
          ))}
        </div>
      </div>
      {/* favorite products section */}
      <div className="mt-10">
        {/* title and view all link */}
        <div>
          <div className="flex items-center justify-between">
            <Title text="Favorite Products" />
            <Link
              href="/admin/favorite"
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
      {/* tracking products section */}
      <div className="mt-10">
        {/* title and view all link */}
        <div>
          <div className="flex items-center justify-between">
            <Title text="Tracking Products" />
            <Link
              href="/admin/tracking"
              className="group relative overflow-hidden text-sm font-medium md:text-base"
            >
              View All Tracking Products
              <span className="absolute bottom-0 left-0 block h-[1px] w-full -translate-x-[100%] bg-gray-600 duration-300 group-hover:translate-x-0" />
            </Link>
          </div>
          <HorizontalBar />
        </div>
        {/* tracking products */}
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
            <ProductNotFound title="Nothing added to Tracking" />
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
              href="/admin/compare"
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
    </div>
  );
};

export default Dashboard;
