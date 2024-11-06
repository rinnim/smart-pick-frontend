"use client";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import Label from "../../ui/components/Label";

const SignupPage = () => {
  const [pageState, setPageState] = useState("get-data");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Individual state variables for each form field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const handleNext = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/signup/send-otp`,
          {
            email,
          },
        ),
        {
          loading: "Sending OTP",
          success: (response) => {
            setPageState("verify-otp");
            return response.data.message;
          },
          error: (error) => {
            console.error("Error sending OTP:", error);
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registerResponse = await toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/register`, {
          firstName,
          lastName,
          username,
          email,
          password,
          otp,
        }),
        {
          loading: "Registering user",
          success: (response) => {
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );

      if (registerResponse.status === 200) {
        setTimeout(() => {
          window.location.href = "/user/login";
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  if (pageState === "get-data") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
        <form
          onSubmit={handleNext}
          className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
        >
          <div className="border-b border-b-white/10 pb-5">
            <h2 className="text-3xl font-semibold uppercase leading-7">
              User SignUp
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              SignUp to get started.
            </p>
          </div>
          <div className="border-b border-b-white/10 pb-5">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label title="First name" htmlFor="firstName" />
                <input
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Label title="Last name" htmlFor="lastName" />
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Label title="Username" htmlFor="username" />
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Label title="Email address" htmlFor="email" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative sm:col-span-3">
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

              {/* Confirm Password Field */}
              <div className="relative sm:col-span-3">
                <Label title="Confirm Password" htmlFor="confirmPassword" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
            disabled={loading}
            type="submit"
            className={`mt-5 flex w-full items-center justify-center rounded-md py-2 text-base font-bold uppercase tracking-wide text-gray-300 duration-200 hover:bg-indigo-600 hover:text-white ${
              loading ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-700"
            }`}
          >
            {loading ? <FaSpinner className="my-1 animate-spin" /> : "signup"}
          </button>
        </form>

        <p className="pt-5 text-center text-sm leading-6 text-white">
          Already have an account?{" "}
          <Link
            href="/user/login"
            className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
          >
            Log in
          </Link>
        </p>
      </div>
    );
  } else if (pageState === "verify-otp") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
        <form
          onSubmit={handleRegistration}
          className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
        >
          <div className="border-b border-b-white/10 pb-5">
            <h2 className="text-3xl font-semibold uppercase leading-7">
              Verify OTP
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Verify OTP to complete your registration.
            </p>
          </div>
          <div className="border-b border-b-white/10 pb-5">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="relative sm:col-span-6">
                <Label title="OTP" htmlFor="otp" />
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                  required
                  maxLength={6}
                />
              </div>
            </div>
          </div>
          <button
            disabled={loading || otp.length !== 6}
            type="submit"
            className={`mt-5 flex w-full items-center justify-center rounded-md py-2 text-base font-bold uppercase tracking-wide text-gray-300 duration-200 hover:bg-indigo-600 hover:text-white ${
              loading ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-700"
            }`}
          >
            {loading ? <FaSpinner className="my-1 animate-spin" /> : "signup"}
          </button>
        </form>

        <p className="pt-5 text-center text-sm leading-6 text-white">
          Do not received the OTP?{" "}
          <button
            onClick={handleNext}
            className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
          >
            Resend OTP
          </button>
        </p>
      </div>
    );
  }
};

export default SignupPage;
