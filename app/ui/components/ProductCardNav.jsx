"use client";
import { useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";

const ProductCardNav = ({ product }) => {
  const [favoriteProduct, setFavoriteProduct] = useState(false);
  const [compareProduct, setCompareProduct] = useState(false);
  const [trackingProduct, setTrackingProduct] = useState(false);

  const handleFavorite = () => {
    setFavoriteProduct(!favoriteProduct);
  };

  const handleCompare = () => {
    setCompareProduct(!compareProduct);
  };

  const handleTracking = () => {
    setTrackingProduct(!trackingProduct);
  };

  return (
    <div className="w-full flex gap-1 justify-between">
      <div
        onClick={handleFavorite}
        className="w-11 h-11 flex text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
      >
        {favoriteProduct ? <FaHeart /> : <FaRegHeart />}
      </div>
      <div
        onClick={handleTracking}
        className="w-11 h-11 flex text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
      >
        {trackingProduct ? <FaBookmark /> : <FaRegBookmark />}
      </div>
      <div
        onClick={handleCompare}
        className="w-11 h-11 flex text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200"
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
  );
};

export default ProductCardNav;
