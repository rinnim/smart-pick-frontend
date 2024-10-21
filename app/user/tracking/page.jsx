"use client";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import Loading from "@/app/ui/components/Loading";
import ProductCardWide from "@/app/ui/components/ProductCardWide";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import Title from "@/app/ui/components/Title";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../UserContext";
const Tracking = () => {
  const [state, setState] = useContext(UserContext);
  const [trackingProduct, setTrackingProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrackingProducts = async () => {
      const response = await axios.get(
        "https://smart-pick-backend.onrender.com/api/user-actions/data",
        {
          headers: { Authorization: `Bearer ${state.token}` },
        },
      );
      setTrackingProduct(response.data.trackings);
      setLoading(false);
    };
    if (state.user) {
      getTrackingProducts();
    }
  }, [state.user]);

  const handleTracking = async (product) => {
    try {
      const response = await axios.post(
        "https://smart-pick-backend.onrender.com/api/user-actions/trackings",
        {
          productId: product._id,
        },
        {
          headers: { Authorization: `Bearer ${state.token}` },
        },
      );

      setState((prev) => ({
        ...prev,
        user: {
          ...prev.user,
          trackings: response.data.trackings,
        },
      }));
      // Also update the entire auth object in local storage with updated trackings
      const updatedAuth = {
        ...JSON.parse(window.localStorage.getItem("auth")),
        user: {
          ...state.user,
          trackings: response.data.trackings,
        },
      };

      window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

      toast.success(product.name + " removed from trackings");
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Tracking Products" />
        <p className="mt-2 max-w-[500px] text-sm tracking-wide text-gray-500">
          These are the products you have added to your tracking list
        </p>
        <HorizontalBar />
      </div>

      {/* tracking products */}
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <Loading />
        </div>
      ) : trackingProduct?.length > 0 ? (
        <div className="px-4 sm:px-0">
          <div className="">
            {trackingProduct?.map((product) => (
              <ProductCardWide
                key={product?._id}
                product={product}
                handleClose={handleTracking}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Nothing added to Tracking
          </h2> */}
          <ProductNotFound title="Nothing added to Tracking" />
          <p className="text-lg leading-6 tracking-wide text-gray-500">
            Add products to your tracking list for them to appear here
          </p>
          <Link
            href="/product"
            className="mt-2 w-full rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium duration-200 hover:bg-black hover:text-white sm:w-auto"
          >
            Add Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Tracking;
