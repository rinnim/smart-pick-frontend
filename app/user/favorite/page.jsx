"use client";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import Loading from "@/app/ui/components/Loading";
import ProductCardWide from "@/app/ui/components/ProductCardWide";
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

  useEffect(() => {
    const getFavoriteProducts = async () => {
      const response = await axios.get(
        "https://smart-pick-backend.onrender.com/api/user-actions/data",
        {
          headers: { Authorization: `Bearer ${state.token}` },
        },
      );
      setFavoriteProduct(response.data.favorites);
      setLoading(false);
    };
    if (state.user) {
      getFavoriteProducts();
    }
  }, [state.user]);

  const handleFavorite = async (product) => {
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
      // Also update the entire auth object in local storage with updated favorites
      const updatedAuth = {
        ...JSON.parse(window.localStorage.getItem("auth")),
        user: {
          ...state.user,
          favorites: response.data.favorites,
        },
      };

      window.localStorage.setItem("auth", JSON.stringify(updatedAuth));

      toast.success(product.name + " removed from favorites");
      console.log(response);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Favorite Products" />
        <p className="mt-2 max-w-[500px] text-sm tracking-wide text-gray-500">
          These are the products you have added to your favorite list
        </p>
        <HorizontalBar />
      </div>

      {/* favorite products */}
      {loading ? (
        <div className="flex h-[500px] items-center justify-center">
          <Loading />
        </div>
      ) : favoriteProduct?.length > 0 ? (
        <div className="px-4 sm:px-0">
          <div className="">
            {favoriteProduct?.map((product) => (
              <ProductCardWide
                key={product?._id}
                product={product}
                handleClose={handleFavorite}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Nothing added to Favorite
          </h2> */}
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
