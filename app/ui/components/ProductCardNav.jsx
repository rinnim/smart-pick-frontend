"use client";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";

const ProductCardNav = ({ product }) => {
  const [favoriteProduct, setFavoriteProduct] = useState(false);
  const [compareProduct, setCompareProduct] = useState(false);
  const [trackingProduct, setTrackingProduct] = useState(false);
  const [trackingPrice, setTrackingPrice] = useState(0);
  const [isTrackingClicked, setIsTrackingClicked] = useState(false);
  const [state, setState] = useContext(UserContext);

  const handleFavorite = async () => {
    if (!state.user) {
      window.location.href = "/user/login";
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/favorites`,
          {
            productId: product._id,
          },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        ),
        {
          loading: "Updating favorites",
          success: (response) => {
            setState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                favorites: response.data.favorites,
              },
            }));

            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                favorites: response.data.favorites,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

            return favoriteProduct
              ? "Product removed from favorites"
              : "Product added to favorites";
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetTrackingPrice = (e) => {
    e.preventDefault();
    setIsTrackingClicked(true);
  };

  const handleTracking = async () => {
    if (!state.user) {
      window.location.href = "/user/login";
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/trackings`,
          {
            productId: product._id,
            expectedPrice: trackingPrice,
          },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
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

            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                trackings: response.data.trackings,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));
            setIsTrackingClicked(false);
            setTrackingPrice(0);
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompare = async () => {
    if (!state.user) {
      window.location.href = "/user/login";
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/compares`,
          {
            productId: product._id,
          },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        ),
        {
          loading: "Updating comparison list",
          success: (response) => {
            console.log(response.data);
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

            return compareProduct
              ? "Product removed from compares"
              : "Product added to compares";
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (state.user) {
      setFavoriteProduct(state.user?.favorites?.includes(product?._id));
      setTrackingProduct(
        state.user?.trackings?.some((track) => track.product === product?._id),
      );
      setCompareProduct(state.user?.compares?.includes(product?._id));
    }
  }, [state.user, product]);

  return (
    <>
      {isTrackingClicked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold">Set Your Expected Price</h3>
            <input
              type="text"
              value={trackingPrice}
              onChange={(e) => setTrackingPrice(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsTrackingClicked(false)}
                className="rounded-full bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleTracking}
                className="rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Set Price
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full justify-between gap-1">
        {/* Favorite Button */}
        <div className="group relative">
          <button
            onClick={handleFavorite}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
          >
            {favoriteProduct ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white invisible transition-all duration-100 group-hover:visible">
            {favoriteProduct ? "Remove from favorite" : "Add to favorite"}
          </span>
        </div>

        {/* Tracking Button */}
        <div className="group relative">
          <button
            onClick={handleGetTrackingPrice}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
          >
            {trackingProduct ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          <span className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white invisible transition-all duration-100 group-hover:visible">
            {trackingProduct ? "Remove from ---" : "Add to ---"}
          </span>
        </div>

        {/* Compare Button */}
        <div className="group relative">
          <button
            onClick={handleCompare}
            className="group flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
          >
            {compareProduct ? (
              <div className="rotate-90">
                <LuArrowLeftRight />
              </div>
            ) : (
              <LuArrowLeftRight />
            )}
          </button>
          <span className="absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white invisible transition-all duration-100 group-hover:visible">
            {compareProduct ? "Remove from compare" : "Add to compare"}
          </span>
        </div>
      </div>
    </>
  );
};

export default ProductCardNav;
