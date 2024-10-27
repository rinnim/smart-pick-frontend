"use client";
import axios from "axios";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import "react-toastify/dist/ReactToastify.css";
import Label from "../../ui/components/Label";
import { UserContext } from "../../UserContext";

const ForgotPasswordPage = () => {
  const [pageState, setPageState] = useState("send-otp");
  const [loading, setLoading] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [state, setState] = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isEmail = usernameOrEmail.includes("@");
    const requestBody = {
      username: isEmail ? "" : usernameOrEmail,
      email: isEmail ? usernameOrEmail : "",
    };

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/forgot-password/send-otp`,
          requestBody,
        ),
        {
          loading: "Sending OTP",
          success: (response) => {
            if (response.status === 200) {
              setPageState("verify-otp");
              return "OTP sent successfully";
            }
          },
          error: (error) => {
            console.error("Error sending OTP:", error);
            return error.response?.data?.message || "Failed to send OTP. Please try again.";
          },
        },
      );
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Prevent more than 1 character
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.querySelector(`input[name=otp-${index + 1}]`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.querySelector(`input[name=otp-${index - 1}]`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const otpString = otp.join("");
    const isEmail = usernameOrEmail.includes("@");
    const requestBody = {
      username: isEmail ? "" : usernameOrEmail,
      email: isEmail ? usernameOrEmail : "",
      otp: otpString,
    };

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/forgot-password/verify-otp`,
          requestBody,
        ),
        {
          loading: "Verifying OTP",
          success: (response) => {
            if (response.status === 200) {
              const { user, token } = response.data;

              // Save user and token to state
              setState({ user, token });

              // also save the user to local storage
              window.localStorage.setItem(
                "auth",
                JSON.stringify(response.data),
              );
              // Move to reset password page
              setPageState("reset-password");
              return "OTP verified successfully";
            }
          },
          error: (error) => {
            return (
              error.response?.data?.message ||
              "Failed to verify OTP. Please try again."
            );
          },
        },
      );
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/reset-password`,
          { newPassword: password },
          {
            headers: { Authorization: `Bearer ${state.token}` },
          },
        ),
        {
          loading: "Resetting password...",
          success: (response) => {
            if (response.status === 200) {
              // Redirect to profile page after successful reset
              window.location.href = "/user/profile";
              return "Password reset successful";
            }
          },
          error: (error) => {
            console.error("Error resetting password:", error);
            const errorMessage =
              error.response?.data?.message ||
              "Failed to reset password. Please try again.";
            return errorMessage;
          },
        },
      );
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle pasting OTP code
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Validate pasted content is exactly 6 digits
    if (!/^\d{6}$/.test(pastedData)) {
      toast.error("Please paste a valid 6-digit code");
      return;
    }

    // Update OTP state with individual digits
    const pastedArray = pastedData.split("");
    setOtp(pastedArray);

    // Focus last input after successful paste
    const inputs = document.querySelectorAll('input[name^="otp-"]');
    const lastInput = inputs[inputs.length - 1];
    lastInput?.focus();

    // Trigger form submission if auto-submit is desired
    if (pastedArray.length === 6) {
      setTimeout(() => {
        handleVerifyOtp(e);
      }, 500);
    }
  };

  if (pageState === "send-otp") {
    return (
      <>
        <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
          <form
            onSubmit={handleSendOtp}
            className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-3xl font-semibold uppercase leading-7">
                Forgot Password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Enter your email or username to reset your password.
              </p>
            </div>
            <div className="border-b border-b-white/10 pb-5">
              <div className="relative mt-5 sm:col-span-3">
                <Label title="Username or Email" htmlFor="usernameOrEmail" />
                <input
                  required
                  type="text"
                  name="usernameOrEmail"
                  value={usernameOrEmail}
                  onChange={(e) => setUsernameOrEmail(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-white/5 px-4 py-1.5 text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className={`mt-5 flex w-full items-center justify-center rounded-md py-2 text-base font-bold uppercase tracking-wide text-gray-300 duration-200 hover:bg-indigo-600 hover:text-white ${
                loading ? "bg-gray-500 hover:bg-gray-500" : "bg-indigo-700"
              }`}
            >
              {loading ? (
                <FaSpinner className="my-1 animate-spin" />
              ) : (
                "proceed"
              )}
            </button>
          </form>
          <p className="-mt-2 py-10 text-center text-sm leading-6 text-gray-400">
            Remember your password?{" "}
            <Link
              href="/user/forgot-password/login"
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              Login
            </Link>
          </p>
        </div>
      </>
    );
  } else if (pageState === "verify-otp") {
    return (
      <>
        <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
          <form
            onSubmit={handleVerifyOtp}
            className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-3xl font-semibold uppercase leading-7">
                Verify OTP
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                An OTP has been sent to your email. Please enter the OTP to
                verify your account.
              </p>
            </div>
            <div className="border-b border-b-white/10 pb-5">
              <div className="relative mt-5">
                <div className="mt-2 flex justify-center gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      required
                      type="text"
                      name={`otp-${index}`}
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste} 
                      className="block w-10 rounded-md border-0 bg-white/5 py-1.5 text-center text-white shadow-sm outline-none ring-1 ring-inset ring-white/10 focus:ring-white sm:text-lg sm:leading-6"
                      maxLength={1}
                    />
                  ))}
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
              {loading ? <FaSpinner className="my-1 animate-spin" /> : "verify"}
            </button>
          </form>
          <p className="-mt-2 py-10 text-center text-sm leading-6 text-gray-400">
            Do not received the OTP?{" "}
            <button
              onClick={handleSendOtp}
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </>
    );
  } else if (pageState === "reset-password") {
    return (
      <>
        <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-950 px-4 py-10 lg:px-0">
          <form
            onSubmit={handleResetPassword}
            className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0"
          >
            <div className="border-b border-b-white/10 pb-5">
              <h2 className="text-3xl font-semibold uppercase leading-7">
                Reset Password
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Create a new password for your account.
              </p>
            </div>
            <div className="border-b border-b-white/10 pb-5">
              <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6">
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
              {loading ? <FaSpinner className="my-1 animate-spin" /> : "reset"}
            </button>
          </form>
          <p className="-mt-2 py-10 text-center text-sm leading-6 text-gray-400">
            Already reset your password?{" "}
            <Link
              href="/user/forgot-password/login"
              className="font-semibold text-gray-200 underline decoration-[1px] underline-offset-2 duration-200 hover:text-white"
            >
              Login
            </Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <div>
      <h1>Forgot Password</h1>
    </div>
  );
};

export default ForgotPasswordPage;
