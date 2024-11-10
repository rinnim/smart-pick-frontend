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

const FavoriteListPage = () => {
  const [state, setState] = useContext(UserContext);
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productCount = 4;

  // get favorite products
  const getFavoriteProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/data`,
        { headers: { Authorization: `Bearer ${state.token}` } },
      );
      setFavoriteProduct(response.data.data.favoriteList);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.user) {
      getFavoriteProducts();
    }
  }, [state.token, state.user]);

  // handle favorite
  const handleFavorite = async (product) => {
    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user-actions/favoriteList`,
          { productId: product._id },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Updating favorite list",
          success: (response) => {
            // update user state
            setState((prev) => ({
              ...prev,
              user: {
                ...prev.user,
                favoriteList: response.data.data.favoriteList,
              },
            }));

            // update favorite product state
            setFavoriteProduct((prevProducts) =>
              prevProducts.filter((p) => p._id !== product._id),
            );

            // update auth object in local storage
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

  return (
    <Container>
      {/* title and subtitle */}
      <div>
        <Title text="Favorite Products" />
        <SubTitle text="These are the products you have added to your favorite list" />
        <HorizontalBar />
      </div>

      {/* favorite products */}
      {loading ? (
        Array.from({ length: productCount }).map((_, index) => (
          <ProductCardWideSkeleton key={index} />
        ))
      ) : favoriteProduct?.length > 0 ? (
        <div>
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
    </Container>
  );
};

export default FavoriteListPage;
