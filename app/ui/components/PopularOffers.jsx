"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
const PopularOffers = () => {
  const images = [
    "https://www.techlandbd.com/image/cache/wp/gj/AAA-Offer/Daily-content-banner/slider-01-1024x476w.webp",
    "https://www.techlandbd.com/image/cache/wp/ge/AAA-Offer/Daily-content-banner/xiaomi-tv-offer-1024x476.webp",
    "https://www.techlandbd.com/image/cache/wp/gj/AAA-Offer/Daily-content-banner/Ultra%20series%20laptop%20banner-640x300.webp",
    "https://www.techlandbd.com/image/cache/wp/gj/AAA-Offer/Daily-content-banner/asus%20creator%20-%20laptop%20deals-1500x400w.webp",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((index) => {
        const nextIndex = index + 1;
        return nextIndex >= images.length ? 0 : nextIndex;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleNext = () => {
    setCurrentIndex((index) => {
      const nextIndex = index + 1;
      return nextIndex >= images.length ? 0 : nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((index) => {
      const prevIndex = index - 1;
      return prevIndex < 0 ? images.length - 1 : prevIndex;
    });
  };

  return (
    <>
      <div className="relative mx-auto h-[50vh] max-w-screen-xl overflow-hidden rounded-xl">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`offer-${index + 1}`}
            width={1000}
            height={1000}
            className={`absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          />
        ))}

        <div className="absolute bottom-8 flex w-full justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`z-10 block h-5 w-5 transform cursor-pointer rounded-full bg-white duration-300 ease-in-out hover:opacity-100 ${currentIndex === index ? "scale-125 opacity-100" : "opacity-50"}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>

        <button
          onClick={handlePrev}
          className="absolute left-5 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 opacity-50 duration-300 hover:opacity-100"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-5 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 opacity-50 duration-300 hover:opacity-100"
        >
          <FaChevronRight />
        </button>
      </div>
    </>
  );
};

export default PopularOffers;
