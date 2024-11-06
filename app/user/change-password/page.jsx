"use client";
import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import Label from "../../ui/components/Label";
import { UserContext } from "../../UserContext";

const ChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [state, setState] = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/change-password`,
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Changing password",
          success: (response) => {
            if (response.status === 200) {
              setTimeout(() => {
                window.location.href = "/user/profile";
              }, 1000);
              return "Password changed successfully";
            }
          },
          error: (error) => {
            const errorMessage =
              error.response?.data?.message ||
              "Failed to change password. Please try again.";
            return errorMessage;
          },
        },
      );
    } catch (error) {
      console.error("Error changing password:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
          <form
            onSubmit={handleChangePassword}
            className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-3xl font-semibold uppercase leading-7">
                Change Password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Enter your old password and new password.
              </p>
            </div>
            <div className="border-b border-b-white/10 pb-5">
              <div className="mt-5 flex flex-col gap-x-6 gap-y-5">
                {/* Old Password Field */}
                <div className="relative">
                  <Label title="Old Password" htmlFor="oldPassword" />
                  <input
                    type={oldPasswordVisible ? "text" : "password"}
                    name="oldPassword"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleOldPasswordVisibility}
                    className="absolute right-3 top-9 text-gray-400 hover:text-white"
                  >
                    {oldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>

                {/* New Password Field */}
                <div className="relative">
                  <Label title="New Password" htmlFor="newPassword" />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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

                {/* Confirm New Password Field */}
                <div className="relative">
                  <Label
                    title="Confirm New Password"
                    htmlFor="confirmNewPassword"
                  />
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="confirmNewPassword"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
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
              {loading ? <FaSpinner className="my-1 animate-spin" /> : "reset"}
            </button>
          </form>
          <p className="-mt-2 py-10 text-center text-sm leading-6 text-gray-400">
            Already changed your password?{" "}
            <Link
              href="/user/profile"
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              Profile
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
