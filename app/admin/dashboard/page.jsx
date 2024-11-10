"use client";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import ProductDoughnutChart from "@/app/ui/components/ProductDoughnutChart";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shopStats, setShopStats] = useState(null);
  const [userData, setUserData] = useState(null);

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
      <div>
        <Title text="Quick Menu" />
        <HorizontalBar />
        <div className="mt-5">
          <div>
            <div className="grid grid-cols-2 gap-5">
              <button className="bgm-[#f7f7f7] flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-10 text-center text-xs font-semibold uppercase text-black duration-200 hover:bg-black hover:text-white md:h-10 md:text-base">
                <Link href="/admin/users-list">Manage Users</Link>
              </button>
              <button className="bgm-[#f7f7f7] flex w-full cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-10 text-center text-xs font-semibold uppercase text-black duration-200 hover:bg-black hover:text-white md:h-10 md:text-base">
                <Link href="/admin/product-list">Manage Products</Link>
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
        <div className="flex items-center justify-between">
          <Title text="Shop Stock Stats" />
          
        </div>
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
    </div>
  );
};

export default Dashboard;
