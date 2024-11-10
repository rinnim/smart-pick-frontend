"use client";
import AddProductButton from "@/app/ui/components/AddProductButton";
import Container from "@/app/ui/components/Container";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import Loading from "@/app/ui/components/Loading";
import ProductCompareCard from "@/app/ui/components/ProductCompareCard";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import SubTitle from "@/app/ui/components/SubTitle";
import Title from "@/app/ui/components/Title";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../UserContext";

const Compare = () => {
  const [state, setState] = useContext(UserContext);
  const [compareProduct, setCompareProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // get compare products
  const getCompareProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/data`,
        { headers: { Authorization: `Bearer ${state.token}` } },
      );
      setCompareProduct(response.data.data.compares);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
                compares: response.data.data.compares,
              },
            }));

            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                compares: response.data.data.compares,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

            return response.data.message;
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
    <Container>
      <div>
        <Title text="Compare Products" />
        <SubTitle text="These are the products you have added to your compare list" />
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
                <AddProductButton />
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
            <AddProductButton />
          </div>
        </>
      )}
    </Container>
  );
};

export default Compare;
