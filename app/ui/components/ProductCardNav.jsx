"use client";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import "react-toastify/dist/ReactToastify.css";

const ProductCardNav = ({ product }) => {
  const [favoriteProduct, setFavoriteProduct] = useState(false);
  const [compareProduct, setCompareProduct] = useState(false);
  const [trackingProduct, setTrackingProduct] = useState(false);
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

            return trackingProduct
              ? "Product removed from tracking"
              : "Product added to tracking";
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
      setTrackingProduct(state.user?.trackings?.includes(product?._id));
      setCompareProduct(state.user?.compares?.includes(product?._id));
    }
  }, [state.user, product]);
  return (
    <>
      <div className="flex w-full justify-between gap-1">
        <div
          onClick={handleFavorite}
          className="flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
        >
          {favoriteProduct ? <FaHeart /> : <FaRegHeart />}
        </div>
        <div
          onClick={handleTracking}
          className="flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
        >
          {trackingProduct ? <FaBookmark /> : <FaRegBookmark />}
        </div>
        <div
          onClick={handleCompare}
          className="flex h-11 w-11 items-center justify-center rounded-full text-lg duration-200 hover:bg-black hover:text-white"
        >
          {compareProduct ? (
            <div className="rotate-90">
              <LuArrowLeftRight />
            </div>
          ) : (
            <LuArrowLeftRight />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCardNav;
