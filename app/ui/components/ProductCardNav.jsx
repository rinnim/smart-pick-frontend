"use client";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";

const ProductCardNav = ({ product }) => {
  const [isFavoriteProduct, setIsFavoriteProduct] = useState(false);
  const [isCompareProduct, setIsCompareProduct] = useState(false);
  const [isWishlistedProduct, setIsWishlistedProduct] = useState(false);
  const [wishlistExpectedPrice, setWishlistExpectedPrice] = useState(null);
  const [isOpenExpectedPriceModal, setIsOpenExpectedPriceModal] =
    useState(false);
  const [state, setState] = useContext(UserContext);

  const handleFavorite = async () => {
    if (!state.user) {
      window.location.href = "/user/login";
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/favoriteList`,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Updating Favorite List",
          success: (response) => {
            setState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                favoriteList: response.data.data.favoriteList,
              },
            }));

            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                favoriteList: response.data.data.favoriteList,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

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

  const handleAddOrRemoveFromWishlist = (e) => {
    e.preventDefault();
    if (isWishlistedProduct) {
      handleWishlist();
    } else {
      setIsOpenExpectedPriceModal(true);
    }
  };

  const handleWishlist = async () => {
    if (!state.user) {
      window.location.href = "/user/login";
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/wishlist`,
          {
            productId: product._id,
            expectedPrice: wishlistExpectedPrice,
          },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        ),
        {
          loading: "Updating Wishlist",
          success: (response) => {
            setState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                wishlist: response.data.data.wishlist,
              },
            }));

            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                wishlist: response.data.data.wishlist,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));
            setIsOpenExpectedPriceModal(false);
            setWishlistExpectedPrice(0);
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
          { productId: product._id },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Updating Comparison List",
          success: (response) => {
            console.log(response.data);
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
      // check if product is in favorite list
      setIsFavoriteProduct(state.user?.favoriteList?.includes(product?._id));
      // check if product is in wishlist
      setIsWishlistedProduct(
        state.user?.wishlist?.some((track) => track.product === product?._id),
      );
      // check if product is in comparison list
      setIsCompareProduct(state.user?.compares?.includes(product?._id));
    }
  }, [state.user, product]);

  return (
    <>
      <div className="flex w-full justify-between gap-1">
        {/* Favorite Button */}
        <div className="group relative">
          <button
            onClick={handleFavorite}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
          >
            {isFavoriteProduct ? <FaHeart /> : <FaRegHeart />}
          </button>
          <span className="invisible absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white transition-all duration-100 group-hover:visible">
            {isFavoriteProduct ? "Remove from favorite" : "Add to favorite"}
          </span>
        </div>

        {/* Wishlist Button */}
        <div className="group relative">
          <button
            onClick={handleAddOrRemoveFromWishlist}
            className="flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
          >
            {isWishlistedProduct ? <FaBookmark /> : <FaRegBookmark />}
          </button>
          <span className="invisible absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white transition-all duration-100 group-hover:visible">
            {isWishlistedProduct ? "Remove from wishlist" : "Add to wishlist"}
          </span>
        </div>

        {/* Compare Button */}
        <div className="group relative">
          <button
            onClick={handleCompare}
            className="group flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
          >
            {isCompareProduct ? (
              <div className="rotate-90">
                <LuArrowLeftRight />
              </div>
            ) : (
              <LuArrowLeftRight />
            )}
          </button>
          <span className="invisible absolute -top-10 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-xs text-white transition-all duration-100 group-hover:visible">
            {isCompareProduct ? "Remove from compare" : "Add to compare"}
          </span>
        </div>
      </div>

      {/* Expected Price Modal */}
      {isOpenExpectedPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="mb-2 text-lg font-bold">Set Your Expected Price</h3>
            <input
              type="number"
              value={wishlistExpectedPrice}
              placeholder="Expected Price"
              min={0}
              onChange={(e) => setWishlistExpectedPrice(e.target.value)}
              className="mb-4 w-full rounded-lg border border-gray-300 p-2 focus:border-black focus:outline-none"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpenExpectedPriceModal(false)}
                className="rounded-full bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleWishlist}
                className="rounded-full bg-black px-4 py-2 text-white hover:bg-gray-800"
              >
                Set Price
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCardNav;
