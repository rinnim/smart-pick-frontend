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

const Favorite = () => {
  const [state, setState] = useContext(UserContext);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFavoriteProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user-actions/data",
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        );
        setFavoriteProduct(response.data.favorites);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || error.message);
        setError(error.response?.data?.message || error.message);
        setLoading(false);
      }
    };
    if (state.user) {
      getFavoriteProducts();
    }
  }, [state.token, state.user]);

  const handleFavorite = async (product) => {
    try {
      await toast.promise(
        axios.post(
          "http://localhost:5000/api/user-actions/favorites",
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

            setFavoriteProduct((prevProducts) =>
              prevProducts.filter((p) => p._id !== product._id)
            );

            // Update the entire auth object in local storage with updated favorites
            const updatedAuth = {
              ...JSON.parse(window.localStorage.getItem("auth")),
              user: {
                ...state.user,
                favorites: response.data.favorites,
              },
            };

            window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

            // return product.name + " removed from favorites";
            return "Product removed from favorites";
          },
          error: (error) => {
            console.error(error);
            return error.response?.data?.message || error.message;
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Favorite Products" />
        <p className="mt-2 text-xs tracking-wide text-gray-500 md:text-base">
          These are the products you have added to your favorite list
        </p>
        <HorizontalBar />
      </div>

      {/* favorite products */}
      {loading ? (
        <div className="">
          {[...Array(4)].map((_, index) => (
            <ProductCardWideSkeleton key={index} />
          ))}
        </div>
      ) : favoriteProduct?.length > 0 ? (
        <div className="">
          {favoriteProduct?.map((product) => (
            <ProductCardWide 
              key={product?._id} 
              product={product} 
              handleClose={handleFavorite} 
            />
          ))}
        </div>
      ) : error ? (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 py-10 text-center">
          <ProductNotFound title={error} />
          <p className="text-lg leading-6 tracking-wide text-gray-500">
            Try refreshing the page or contact support.
          </p>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 py-5 text-center">
          <ProductNotFound title="Nothing added to Favorite" />
          <p className="text-lg leading-6 tracking-wide text-gray-500">
            Add products to your favorite list for them to appear here
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

export default Favorite;
