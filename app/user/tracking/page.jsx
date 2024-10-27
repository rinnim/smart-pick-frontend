"use client";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import ProductCardWide from "@/app/ui/components/ProductCardWide";
import ProductCardWideSkeleton from "@/app/ui/components/ProductCardWideSkeleton";
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrackingProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/data`,
          { headers: { Authorization: `Bearer ${state.token}` } },
        );
        setTrackingProduct(response.data.trackings);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    if (state.user) {
      getTrackingProducts();
    }
  }, [state.user, state.token]);

  const handleTracking = async (product) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/trackings`,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Updating tracking list",
          success: (response) => {
            setState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                trackings: response.data.trackings,
              },
            }));

            // Update the entire auth object in local storage with updated trackings
            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                trackings: response.data.trackings,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

            setTrackingProduct((prevProducts) =>
              prevProducts.filter((p) => p._id !== product._id),
            );

            // return product.name + " removed from tracking";
            return "Product removed from tracking";
          },
          error: (error) => {
            console.error(error);
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Tracking Products" />
        <p className="mt-2 max-w-[500px] text-xs tracking-wide text-gray-500 md:text-base">
          These are the products you have added to your tracking list
        </p>
        <HorizontalBar />
      </div>

      {/* tracking products */}
      {loading ? (
        <div className="">
          {[...Array(3)].map((_, index) => (
            <ProductCardWideSkeleton key={index} />
          ))}
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
      ) : error ? (
        <div className="mx-auto my-4 flex max-w-3xl flex-col items-center gap-3 py-12 text-center">
          <ProductNotFound title={error} />
          <p className="text-lg leading-6 tracking-wide text-gray-500">
            Refresh the page to try again or contact support
          </p>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <ProductNotFound title="Nothing added to Tracking" />
          <p className="text-lg leading-6 tracking-wide text-gray-500">
            Add products to your tracking list for them to appear here
          </p>
          <Link
            href="/product"
            className="mt-2 rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium duration-200 hover:bg-black hover:text-white"
          >
            Add Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default Tracking;
