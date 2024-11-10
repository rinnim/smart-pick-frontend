"use client";
import Container from "@/app/ui/components/Container";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import ProductCardWide from "@/app/ui/components/ProductCardWide";
import ProductCardWideSkeleton from "@/app/ui/components/ProductCardWideSkeleton";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import SubTitle from "@/app/ui/components/SubTitle";
import Title from "@/app/ui/components/Title";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserContext } from "../../UserContext";

const Wishlist = () => {
  const [state, setState] = useContext(UserContext);
  const [trackingProduct, setTrackingProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productCount = 4;

  // get tracking products
  const getTrackingProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/data`,
        { headers: { Authorization: `Bearer ${state.token}` } },
      );
      setTrackingProduct(response.data.data.wishlist);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user) {
      getTrackingProducts();
    }
  }, [state.user, state.token]);

  // handle tracking
  const handleTracking = async (trackingItem) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/wishlist`,
          { productId: trackingItem.product._id },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Updating Wishlist",
          success: (response) => {
            console.log(response.data.data.wishlist);
            setState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                wishlist: response.data.data.wishlist,
              },
            }));

            // Update the entire auth object in local storage with updated wishlist
            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                wishlist: response.data.data.wishlist,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

            setTrackingProduct((prevProducts) =>
              prevProducts.filter((p) => p._id !== trackingItem._id),
            );

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
        <Title text="Wishlist" />
        <SubTitle text="These are the products you have added to your wishlist" />
        <HorizontalBar />
      </div>

      {/* Wishlist */}
      {loading ? (
        <div className="">
          {Array.from({ length: productCount }).map((_, index) => (
            <ProductCardWideSkeleton key={index} />
          ))}
        </div>
      ) : trackingProduct?.length > 0 ? (
        <div className="px-4 sm:px-0">
          {trackingProduct?.map((tracking) => (
            <ProductCardWide
              key={tracking._id}
              product={tracking.product}
              expectedPrice={tracking.expectedPrice}
              handleClose={() => handleTracking(tracking)}
            />
          ))}
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
          <ProductNotFound title="Nothing added to Wishlist" />
          <p className="text-lg leading-6 tracking-wide text-gray-500">
            Add products to your wishlist for them to appear here
          </p>
          <Link
            href="/product"
            className="mt-2 rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium duration-200 hover:bg-black hover:text-white"
          >
            Add Products
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Wishlist;
