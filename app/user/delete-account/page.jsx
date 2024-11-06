"use client";

import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import Label from "../../ui/components/label";

const DeleteAccount = () => {
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/delete-profile`,
          {
            headers: {
              Authorization: `Bearer ${state?.token}`,
              "Content-Type": "application/json",
            },
            data: { password },
          },
        ),
        {
          loading: "Deleting account",
          success: () => {
            setState({ user: null, token: null });
            localStorage.removeItem("auth");
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
            return "Account deleted successfully!";
          },
          error: (error) =>
            error.response?.data?.message || "Failed to delete account",
        },
      );
    } catch (error) {
      console.error("Delete account error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
      >
        <div className="border-b border-b-white/10 pb-5">
          <h2 className="text-3xl font-semibold uppercase leading-7">
            Delete Account
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Enter your password to delete your account.
          </p>
          <p className="text-sm leading-6 text-red-400">
            This action is irreversible and will permanently delete your
            account.
          </p>
        </div>
        <div className="border-b border-b-white/10 pb-5">
          <div className="mt-5 flex flex-col">
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
            "Delete Account"
          )}
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
