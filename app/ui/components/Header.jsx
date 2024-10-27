"use client";
import { UserContext } from "@/app/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FiBookmark, FiHeart, FiSearch, FiUser } from "react-icons/fi";
import { LuArrowLeftRight, LuLogIn, LuLogOut } from "react-icons/lu";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const Header = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const redirect = (url) => {
    if (!state.user) {
      window.location.href = "/user/login";
    } else {
      window.location.href = url;
    }
  };

  const handleLogout = async () => {
    toast.success("Logout successful");
    window.localStorage.removeItem("auth");
    setState({ user: null, token: "" });
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchTerm = searchTerm.trim();
    if (newSearchTerm) {
      router.push(`/product?search=${encodeURIComponent(newSearchTerm)}`);
    }
  };

  return (
    <div>
      <div className="z-50 w-full bg-[#f7f7f7] pb-2 md:sticky md:top-0">
        {/* Header */}
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-5 px-4 py-4 md:flex-row lg:px-0">
          {/* Logo */}
          <Link href={"/"}>
            <h1 className="text-2xl font-bold">SmartPick</h1>
          </Link>
          {/* SearchBar */}
          <form onSubmit={handleSearch} className="flex w-full max-w-3xl">
            {/* Input */}
            <input
              name="search"
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-11/12 rounded-full px-5 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-lg placeholder:font-normal placeholder:tracking-wide placeholder:text-gray-400 focus:ring-1 focus:ring-black md:text-lg"
            />
            {/* Search Icon */}
            <button
              type="submit"
              className="ml-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black text-white duration-200 hover:bg-red-500"
            >
              <FiSearch />
            </button>
          </form>
          {/* Menubar */}
          <div className="flex items-center gap-x-6 text-2xl">
            {/* User Icon */}
            <div
              onClick={() => redirect("/user/profile")}
              className="relative block"
            >
              <FiUser className="cursor-pointer duration-200 hover:text-red-500" />
            </div>
            {/* Dashboard Icon */}
            <div
              onClick={() => redirect("/user/dashboard")}
              className="relative block"
            >
              <MdOutlineSpaceDashboard className="cursor-pointer duration-200 hover:text-red-500" />
            </div>
            {/* Favorite Icon */}
            <div
              onClick={() => redirect("/user/favorite")}
              className="relative block"
            >
              <FiHeart className="cursor-pointer duration-200 hover:text-red-500" />
              <span className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                {state.user?.favorites?.length > 0
                  ? state.user?.favorites?.length
                  : "0"}
              </span>
            </div>
            {/* Tracking Icon */}
            <div
              onClick={() => redirect("/user/tracking")}
              className="relative block"
            >
              <FiBookmark className="cursor-pointer duration-200 hover:text-red-500" />
              <span className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                {state.user?.trackings?.length > 0
                  ? state.user?.trackings?.length
                  : "0"}
              </span>
            </div>
            {/* Compare Icon */}
            <div
              onClick={() => redirect("/user/compare")}
              className="relative block"
            >
              <LuArrowLeftRight className="cursor-pointer duration-200 hover:text-red-500" />
              <span className="absolute -right-2 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white">
                {state.user?.compares?.length > 0
                  ? state.user?.compares?.length
                  : "0"}
              </span>
            </div>
            {/* Logout Icon */}
            {state.user ? (
              <div onClick={handleLogout} className="relative block">
                <LuLogOut className="cursor-pointer duration-200 hover:text-red-500" />
              </div>
            ) : (
              <Link href="/user/login" className="relative block">
                <LuLogIn className="cursor-pointer duration-200 hover:text-red-500" />
              </Link>
            )}
          </div>
        </div>
        {/* Categories */}
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-center text-gray-950">
          {menuCategories.map((category, index) => (
            <div key={index} class="group relative cursor-pointer py-1">
              <div class="flex items-center justify-between px-1">
                <Link
                  href={`/product?category=${category?.name}`}
                  class="menu-hover py-1 text-base font-medium text-black lg:mx-4"
                >
                  {toTitleCase(category?.name)}
                </Link>
              </div>
              <div
                class={`${category?.subCategories.length > 8 ? "grid grid-cols-2" : "w-48"} invisible absolute left-1/2 z-50 flex -translate-x-1/2 transform flex-col bg-slate-100 px-4 py-1 text-gray-800 group-hover:visible`}
              >
                {category?.subCategories.map((subcategory) => (
                  <Link
                    href={`/product?category=${category?.name}&subcategory=${subcategory?.name}`}
                    key={subcategory?.name}
                    class="block w-full py-1 text-gray-500 hover:text-black md:mx-2"
                  >
                    {toTitleCase(subcategory?.name)}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
