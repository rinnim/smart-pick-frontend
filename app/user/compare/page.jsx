"use client";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import Loading from "@/app/ui/components/Loading";
import ProductCompareCard from "@/app/ui/components/ProductCompareCard";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import Title from "@/app/ui/components/Title";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../UserContext";
const Compare = () => {
  const [state, setState] = useContext(UserContext);
  const [compareProduct, setCompareProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompareProducts = async () => {
      const response = await axios.get(
        "https://smart-pick-backend.onrender.com/api/user-actions/data",
        {
          headers: { Authorization: `Bearer ${state.token}` },
        },
      );
      setCompareProduct(response.data.compares);
      setLoading(false);
    };
    if (state.user) {
      getCompareProducts();
    }
  }, [state.user]);

  const handleCompare = async (product) => {
    try {
      const response = await axios.post(
        "https://smart-pick-backend.onrender.com/api/user-actions/compares",
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
          compares: response.data.compares,
        },
      }));
      // Also update the entire auth object in local storage with updated compares
      const updatedAuth = {
        ...JSON.parse(window.localStorage.getItem("auth")),
        user: {
          ...state.user,
          compares: response.data.compares,
        },
      };

      window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

      toast.success(product.name + " removed from compares");
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Compare Products" />
        <p className="compare-wide mt-2 max-w-[500px] text-sm text-gray-500">
          These are the products you have added to your compare list
        </p>
        <HorizontalBar />
      </div>

      {/* compare products */}
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <Loading />
        </div>
      ) : compareProduct?.length > 0 ? (
        <div className="px-4 sm:px-0">
          <div className="flex gap-10">
            {compareProduct?.map((product) => (
              <ProductCompareCard
                key={product._id}
                product={product}
                handleClose={handleCompare}
              />
            ))}

            {compareProduct?.length !== 2 && (
              <div className="mx-auto flex flex-col items-center gap-3 text-center">
                <ProductNotFound title="Add Another Product" />
                <p className="compare-wide text-lg leading-6 text-gray-500">
                  Add products to your compare list for them to appear here
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
        </div>
      ) : (
        <>
          <div className="mx-auto flex flex-col items-center gap-3 text-center">
            <ProductNotFound title="Add Two Products" />
            <p className="compare-wide text-lg leading-6 text-gray-500">
              Add two products to your compare list for them to appear here
            </p>
            <Link
              href="/product"
              className="mt-2 w-full rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium duration-200 hover:bg-black hover:text-white sm:w-auto"
            >
              Add Products
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Compare;
