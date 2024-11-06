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
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCompareProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/data`,
          { headers: { Authorization: `Bearer ${state.token}` } },
        );
        setCompareProduct(response.data.compares);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };
    if (state.user) {
      getCompareProducts();
    }
  }, [state.user, state.token]);

  const handleCompare = async (product) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/compares`,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Updating comparison list",
          success: (response) => {
            setState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                compares: response.data.compares,
              },
            }));

            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                compares: response.data.compares,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

            // return product.name + " removed from compares";
            return "Product removed from compares";
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
    <div className="mx-auto max-w-screen-xl px-4 py-10">
      <div>
        <Title text="Compare Products" />
        <p className="compare-wide mt-2 max-w-[500px] text-xs text-gray-500 md:text-base">
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
          <div className="flex justify-between">
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
                  className="mt-2 rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium duration-200 hover:bg-black hover:text-white"
                >
                  Add Products
                </Link>
              </div>
            )}
          </div>
        </div>
      ) : error ? (
        <div className="mx-auto flex flex-col items-center gap-3 text-center">
          <ProductNotFound title={error} />
          <p className="compare-wide text-lg leading-6 text-gray-500">
            Try refreshing the page or contact support.
          </p>
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
              className="mt-2 rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium duration-200 hover:bg-black hover:text-white"
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
