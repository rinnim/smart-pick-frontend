"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import ProfilePageSkeleton from "@/app/ui/components/ProfilePageSkeleton";
const ProfilePage = () => {
  const [state] = useContext(UserContext);

  const handleLogout = async () => {
    toast.success("Logout successful");
    window.localStorage.removeItem("auth");
    setState({ user: null, token: "" });
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  if (!state.user) {
    return <ProfilePageSkeleton />;
  }

  return (
      <div className="mx-auto max-w-screen-xl px-4 py-10 text-white lg:px-0">
        <div className="relative isolate overflow-hidden rounded-3xl bg-gray-900 px-6 py-14 shadow-2xl sm:px-16">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-10">
            <Image
              alt="profile"
              src="https://i.ibb.co/mJRkRRV/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
              width={100}
              height={100}
              className="h-40 w-40 rounded-full border border-gray-700 object-cover p-1"
            />
            <div className="flex-1 text-start ">
              <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
                Hello,{" "}
                <span className="font-medium underline decoration-[1px] underline-offset-2">
                  {state?.user?.firstName} {state?.user?.lastName}
                </span>
              </h2>
              <p className="mt-3 max-w-3xl text-start text-base leading-6 text-gray-300 *:mt-6">
                @{state?.user?.username}
              </p>
              <p className="mt-3 max-w-3xl text-start text-base leading-6 text-gray-300 *:mt-6">
                {state?.user?.email}
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <button className="bgm-[#f7f7f7] flex h-7 w-full cursor-pointer items-center justify-center rounded-full bg-gray-800 text-center text-xs font-semibold uppercase text-white duration-200 hover:bg-black hover:text-white md:h-10 md:text-base">
              <Link href="/user/edit-profile">Edit Profile</Link>
            </button>
            <button className="bgm-[#f7f7f7] flex h-7 w-full cursor-pointer items-center justify-center rounded-full bg-gray-800 text-center text-xs font-semibold uppercase text-white duration-200 hover:bg-black hover:text-white md:h-10 md:text-base">
              <Link href="/user/change-password">Change Password</Link>
            </button>
            <button className="bgm-[#f7f7f7] flex h-7 w-full cursor-pointer items-center justify-center rounded-full bg-gray-800 text-center text-xs font-semibold uppercase text-white duration-200 hover:bg-red-500 hover:text-white md:h-10 md:text-base">
              <Link href="/user/delete-account">Delete Account</Link>
            </button>
            <button onClick={handleLogout} className="bgm-[#f7f7f7] flex h-7 w-full cursor-pointer items-center justify-center rounded-full bg-gray-800 text-center text-xs font-semibold uppercase text-white duration-200 hover:bg-red-500 hover:text-white md:h-10 md:text-base">
              Logout
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
