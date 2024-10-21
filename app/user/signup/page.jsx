"use client";
import Link from "next/link";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Label from "../../ui/components/Label";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://smart-pick-backend.onrender.com/auth/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Registration success: Show success toast and allow login
      setShowModal(true);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div>
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
        <form
          onSubmit={handleRegistration}
          className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
        >
          <div className="border-b border-b-white/10 pb-5">
            <h2 className="text-3xl font-semibold uppercase leading-7">
              SignUp
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
                  value={formData.firstName}
                  onChange={handleChange}
                  className="focus:ring-skyText mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Label title="Last name" htmlFor="lastName" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="focus:ring-skyText mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Label title="Username" htmlFor="username" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="focus:ring-skyText mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
                  required
                />
              </div>
              <div className="sm:col-span-3">
                <Label title="Email address" htmlFor="email" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:ring-skyText mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative sm:col-span-3">
                <Label title="Password" htmlFor="password" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:ring-skyText mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
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
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="focus:ring-skyText mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 sm:text-sm sm:leading-6"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-9 text-gray-400 hover:text-white"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
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
          <Link href="/user/login" className="font-semibold text-indigo-400">
            Log in
          </Link>
        </p>
      </div>

      {/* ToastContainer with provided configuration */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative mx-auto flex max-w-md flex-col items-center rounded-lg bg-white p-6 shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <RxCross2 size={20} />
            </button>

            {/* Modal Content */}
            <h2 className="mb-4 text-2xl font-bold text-green-600">
              Congratulation!
            </h2>
            <p className="mb-4 text-gray-700">
              You have successfully signed up!
            </p>
            <Link href="/user/login">
              <button
                className="flex items-center justify-center rounded-md bg-indigo-700 px-5 py-2 text-base font-bold uppercase tracking-wide text-gray-100 duration-200 hover:bg-indigo-600 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                Go to Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupPage;
