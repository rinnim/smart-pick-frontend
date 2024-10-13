"use client";
import {
  Fragment,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { useState } from "react";
import { FiBookmark, FiHeart, FiSearch, FiUser } from "react-icons/fi";
import { LuArrowLeftRight } from "react-icons/lu";

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const Header = () => {
  const [favoriteProduct, setFavoriteProduct] = useState([]);
  const [compareProduct, setCompareProduct] = useState([]);
  const [trackingProduct, setTrackingProduct] = useState([]);
  const [user, setUser] = useState(null);
  const categories = [
    {
      name: "laptop & tablet",
      subCategories: [
        {
          name: "all laptop",
        },
        {
          name: "laptop accessories",
        },
      ],
    },
    {
      name: "components",
      subCategories: [
        {
          name: "computer case",
        },
        {
          name: "ssd",
        },
        {
          name: "motherboard",
        },
        {
          name: "desktop ram",
        },
        {
          name: "cpu cooler",
        },
        {
          name: "casing fan",
        },
        {
          name: "power supply",
        },
        {
          name: "graphics card",
        },
      ],
    },
    {
      name: "accessories",
      subCategories: [
        {
          name: "mouse",
        },
        {
          name: "cable & converter",
        },
        {
          name: "power bank",
        },
        {
          name: "headphone & headsets",
        },
        {
          name: "keyboard",
        },
        {
          name: "barcode scanner",
        },
        {
          name: "pen drive",
        },
        {
          name: "webcam",
        },
      ],
    },
    {
      name: "office equipment",
      subCategories: [
        {
          name: "photocopier",
        },
        {
          name: "ip phone/pabx",
        },
        {
          name: "scanner",
        },
        {
          name: "pos printer",
        },
        {
          name: "printers",
        },
      ],
    },
    {
      name: "gadgets",
      subCategories: [
        {
          name: "smart watch & gadget",
        },
      ],
    },
    {
      name: "router & network",
      subCategories: [
        {
          name: "network adapter",
        },
        {
          name: "router",
        },
        {
          name: "access point",
        },
      ],
    },
    {
      name: "tv & speaker",
      subCategories: [
        {
          name: "speakers",
        },
        {
          name: "portable speaker",
        },
      ],
    },
    {
      name: "cameras",
      subCategories: [
        {
          name: "action camera",
        },
      ],
    },
    {
      name: "monitor and displays",
      subCategories: [
        {
          name: "interactive flat panel",
        },
        {
          name: "monitor",
        },
      ],
    },
    {
      name: "smartphone & tablet",
      subCategories: [
        {
          name: "adapter & charger",
        },
      ],
    },
  ];

  const handleLogin = () => {
    if (user) {
      setUser(null);
    } else {
      setUser("login");
    }
  };
  return (
    <div className="w-full bg-white  md:sticky md:top-0 z-50">
      <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        {/* Logo */}
        <Link href={"/"}>
          {/* <img src={logo} alt="logo" className="w-44" /> */}
          <h1 className="text-2xl font-bold">SmartPick</h1>
        </Link>
        {/* SearchBar */}
        <div className=" md:inline-flex max-w-3xl w-full ">
          {/* Input */}
          <input
            type="text"
            placeholder="Search products..."
            className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-black sm:text-sm px-4 py-2"
          />
          {/* Search Icon */}
          <div
            type="submit"
            className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-full ml-2 hover:bg-red-500 duration-200 cursor-pointer"
          >
            <FiSearch />
          </div>
        </div>

        {/* Menubar */}
        <div className="flex items-center gap-x-6 text-2xl">
          {/* User Icon */}
          <Link href={"/login"}>
            <FiUser className="hover:text-red-500 duration-200 cursor-pointer" />
          </Link>
          {/* Favorite Icon */}
          <Link href={"/favorite"} className="relative block">
            <FiHeart className="hover:text-red-500 duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-red-500 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {favoriteProduct?.length > 0 ? favoriteProduct?.length : "0"}
            </span>
          </Link>
          {/* Tracking Icon */}
          <Link href={"/tracking"} className="relative block">
            <FiBookmark className="hover:text-red-500 duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-red-500 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {trackingProduct?.length > 0 ? trackingProduct?.length : "0"}
            </span>
          </Link>
          {/* Compare Icon */}
          <Link href={"/compare"} className="relative block">
            <LuArrowLeftRight className="hover:text-red-500 duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-red-500 text-white absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {compareProduct?.length > 0 ? compareProduct?.length : "0"}
            </span>
          </Link>
        </div>
      </div>
      {/* Categories */}
      <div className="text-white flex items-center justify-center py-4 ">
        {categories.map((category, index) => (
          <div key={index}>
            <Menu as="div" className="relative flex-shrink-0">
              <div>
                <MenuButton className="inline-flex items-center gap-2 rounded-md  py-1.5 px-1 font-semibold text-gray-900">
                  <span className="px-1">{toTitleCase(category?.name)}</span>
                </MenuButton>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems
                  className={`absolute left-0 mt-2 ${
                    category?.subCategories.length > 8
                      ? "grid w-96 grid-cols-2 "
                      : "w-48"
                  } absolute z-20 origin-top-left rounded-xl p-2 text-sm bg-slate-100 text-black`}
                >
                  <MenuItem className="flex items-center gap-2 rounded-lg py-1 px-3 hover:bg-red-300">
                    <Link href={`/product?category=${category?.name}`}>
                      All {toTitleCase(category?.name)}
                    </Link>
                  </MenuItem>
                  {category?.subCategories.map((subcategory) => (
                    <MenuItem
                      className="flex items-center gap-2 rounded-lg py-1 px-3 hover:bg-red-300"
                      key={category?.name}
                    >
                      <Link
                        href={`/product?category=${category?.name}&subcategory=${subcategory?.name}`}
                      >
                        {toTitleCase(subcategory?.name)}
                      </Link>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Transition>
            </Menu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
