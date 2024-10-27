"use client";
import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import Label from "../../ui/components/Label";
import { UserContext } from "../../UserContext";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [state, setState] = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Determine if input is email or username
    const isEmail = usernameOrEmail.includes("@");
    const requestBody = {
      username: isEmail ? "" : usernameOrEmail, // If it's not an email, it's a username
      email: isEmail ? usernameOrEmail : "", // If it is an email, use it here
      password,
    };

    try {
      await toast.promise(
        axios.post("http://localhost:5000/auth/user/login", requestBody),
        {
          loading: "Logging in",
          success: (response) => {
            // set the user in the context
            setState({
              user: response.data.user,
              token: response.data.token,
            });
            // also save the user to local storage
            window.localStorage.setItem("auth", JSON.stringify(response.data));

            setTimeout(() => {
              window.location.href = "/user/profile";
            }, 1000);

            return "Login successful";
          },
          error: (error) => {
            console.log("login error", error);
            return (
              error.response?.data?.message ||
              "Login failed. Please check your credentials."
            );
          },
        },
      );
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
        <form
          onSubmit={handleLogin}
          className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
        >
          <div className="border-b border-b-white/10 pb-5">
            <h2 className="text-3xl font-semibold uppercase leading-7">
              Login
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Login to access your account.
            </p>
          </div>
          <div className="border-b border-b-white/10 pb-5">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label title="Username or Email" htmlFor="usernameOrEmail" />
                <input
                  required
                  type="text"
                  name="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
              <div className="relative sm:col-span-3">
                <Label title="Password" htmlFor="password" />
                <input
                  required
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-10 text-gray-400"
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
            {loading ? <FaSpinner className="my-1 animate-spin" /> : "login"}
          </button>
        </form>
        <div className="flex flex-col justify-center gap-2 py-10 sm:flex-row">
          <p className="text-center text-sm leading-6 text-gray-400">
            Forgot your password?{" "}
            <Link
              href="/user/forgot-password"
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              Reset Password
            </Link>
          </p>
          <p className="text-center text-sm leading-6 text-gray-400">
            Don{"'"}t have an account?{" "}
            <Link
              href="/user/signup"
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
