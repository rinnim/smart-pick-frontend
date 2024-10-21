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
    } else {
      try {
        const response = await axios.post(
          "https://smart-pick-backend.onrender.com/api/user-actions/favorites",
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
            favorites: response.data.favorites,
          },
        }));

        toast.success(
          favoriteProduct
            ? product.name + " removed from favorites"
            : product.name + " added to favorites",
        );

        const updatedAuth = {
          ...JSON.parse(window.localStorage.getItem("auth")),
          user: {
            ...state.user,
            favorites: response.data.favorites,
          },
        };

        window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

        console.log(response);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const handleTracking = async () => {
    if (!state.user) {
      window.location.href = "/user/login";
      return;
    } else {
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

        toast.success(
          trackingProduct
            ? product.name + " removed from tracking"
            : product.name + " added to tracking",
        );
        const updatedAuth = {
          ...JSON.parse(window.localStorage.getItem("auth")),
          user: {
            ...state.user,
            trackings: response.data.trackings,
          },
        };

        window.localStorage.setItem("auth", JSON.stringify(updatedAuth));
        console.log(response);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const handleCompare = async () => {
    if (!state.user) {
      window.location.href = "/user/login";
      return;
    } else {
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
        if (response.status === 200) {
          setState((prev) => ({
            ...prev,
            user: {
              ...prev.user,
              compares: response.data.compares,
            },
          }));

          toast.success(
            compareProduct
              ? product.name + " removed from compares"
              : product.name + " added to compares",
          );
          const updatedAuth = {
            ...JSON.parse(window.localStorage.getItem("auth")),
            user: {
              ...state.user,
              compares: response.data.compares,
            },
          };

          window.localStorage.setItem("auth", JSON.stringify(updatedAuth));
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (state.user) {
      setFavoriteProduct(state.user?.favorites?.includes(product._id));
      setTrackingProduct(state.user?.trackings?.includes(product._id));
      setCompareProduct(state.user?.compares?.includes(product._id));
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
