"use client";

import { UserContext } from "@/app/UserContext";
import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import Label from "../../ui/components/label";

const EditProfile = () => {
  const [pageState, setPageState] = useState("edit-data");
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);


  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setLoading(true);
    setPageState("update-data");
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/update-profile`,
          {
            firstName,
            lastName,
            username,
            email,
            password,
          },
          {
            headers: {
              'Authorization': `Bearer ${state?.token}`,
              'Content-Type': 'application/json',
            }
          }
        ),
        {
          loading: "Updating profile...",
          success: (response) => {
            setState({ ...state, user: response.data.user });
            const authData = JSON.parse(localStorage.getItem("auth"));
            localStorage.setItem(
              "auth",
              JSON.stringify({ ...authData, user: response.data.user })
            );

            setTimeout(() => {
              window.location.href = "/user/profile";
            }, 2000);
            return "Profile updated successfully!";
          },
          error: (error) => {
            console.error("Full error response:", error.response);
            return error.response?.data?.message || "Failed to update profile";
          },
        }
      );
    } catch (error) {
      console.error("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (pageState === "edit-data") {
    return (
      <>
        <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
          <form
            onSubmit={handleNext}
            className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-3xl font-semibold uppercase leading-7">
                Edit Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Enter your details to update your profile.
              </p>
            </div>
            <div className="border-b border-b-white/10 pb-5">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
                {/* First Name Field */}
                <div className="sm:col-span-3">
                  <Label title="First name" htmlFor="firstName" />
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    placeholder={state?.user?.firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  />
                </div>

                {/* Last Name Field */}
                <div className="sm:col-span-3">
                  <Label title="Last name" htmlFor="lastName" />
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    placeholder={state?.user?.lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  />
                </div>

                {/* Username Field */}
                <div className="sm:col-span-3">
                  <Label title="Username" htmlFor="username" />
                  <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder={state?.user?.username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  />
                </div>

                {/* Email Field */}
                <div className="sm:col-span-3">
                  <Label title="Email address" htmlFor="email" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    placeholder={state?.user?.email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <button
              disabled={
                loading || (!firstName && !lastName && !username && !email)
              }
              type="submit"
              className={`mt-5 flex w-full items-center justify-center rounded-md py-2 text-base font-bold uppercase tracking-wide text-gray-300 duration-200 hover:bg-indigo-600 hover:text-white ${
                loading ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-700"
              }`}
            >
              {loading ? <FaSpinner className="my-1 animate-spin" /> : "Next"}
            </button>
          </form>

          <p className="pt-5 text-center text-sm leading-6 text-white">
            Already edited your profile?{" "}
            <Link
              href="/user/profile"
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              Profile
            </Link>
          </p>
        </div>
      </>
    );
  } else if (pageState === "update-data") {
    return (
      <>
        <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
          <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-3xl font-semibold uppercase leading-7">
                Edit Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Enter your password to update your profile.
              </p>
            </div>
            <div className="border-b border-b-white/10 pb-5">
              <div className="mt-5 flex flex-col">
                {/* Password Field */}
                <div className="relative">
                  <Label title="Password" htmlFor="password" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-9 text-gray-400 hover:text-white"
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            <button
              disabled={loading || !password}
              type="submit"
              className={`mt-5 flex w-full items-center justify-center rounded-md py-2 text-base font-bold uppercase tracking-wide text-gray-300 duration-200 hover:bg-indigo-600 hover:text-white ${
                loading ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-700"
              }`}
            >
              {loading ? (
                <FaSpinner className="my-1 animate-spin" />
              ) : (
                "Update Profile"
              )}
            </button>
          </form>

          <p className="pt-5 text-center text-sm leading-6 text-white">
            Already edited your profile?{" "}
            <Link
              href="/user/profile"
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              Profile
            </Link>
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div>
        <p>Profile Update Page</p>
      </div>
    </>
  );
};

export default EditProfile;
