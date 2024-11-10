"use client";
import FormInputField from "@/app/ui/components/FormInputField";
import FormSubmitButton from "@/app/ui/components/FormSubmitButton";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import SubTitle from "@/app/ui/components/SubTitle";
import TextAndUnderlineLinkText from "@/app/ui/components/TextAndUnderlineLinkText";
import Title from "@/app/ui/components/Title";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const UserForgottenPasswordPage = () => {
  const [pageState, setPageState] = useState("send-otp");
  const [loading, setLoading] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [state, setState] = useContext(UserContext);

  // Redirect to reset password page if token is present
  useEffect(() => {
    if (state.token) {
      setPageState("reset-password");
    }
  }, [state.token]);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/forgot-password/send-otp`,
          {
            email: usernameOrEmail,
            username: usernameOrEmail,
          },
        ),
        {
          loading: "Sending OTP",
          success: (response) => {
            setPageState("verify-otp");
            return response.data.message;
          },
          error: (error) => {
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

  // Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user/forgot-password/verify-otp`,
          {
            username: usernameOrEmail,
            email: usernameOrEmail,
            otp: otp,
          },
        ),
        {
          loading: "Verifying OTP",
          success: (response) => {
            // Save user and token to state
            setState({
              user: response.data.data.user,
              token: response.data.data.token,
            });

            // also save the user to local storage
            window.localStorage.setItem(
              "auth",
              JSON.stringify(response.data.data),
            );

            // Move to reset password page
            setPageState("reset-password");
            return response.data.message;
          },
          error: (error) => {
            console.log(error);
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error("Error verifying OTP:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset Password
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
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Resetting Password",
          success: (response) => {
            // Redirect to profile page after successful reset
            window.location.href = "/user/profile";
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      setLoading(false);
    }
  };

  if (pageState === "send-otp") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
        <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
          {/* Title and Subtitle */}
          <div>
            <Title text="Forgotten Password" className="uppercase text-white" />
            <SubTitle text="Enter your email or username to reset your password." />
            <HorizontalBar className="bg-white/10" />
          </div>

          {/* Send OTP Form */}
          <form onSubmit={handleSendOtp}>
            <div className="flex flex-col gap-5">
              {/* Username or Email Field */}
              <FormInputField
                label="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required={true}
              />
            </div>
            <HorizontalBar className="bg-white/10" />
            {/* Submit Button */}
            <FormSubmitButton loading={loading} label="Proceed" />
          </form>

          {/* Login Link */}
          <div className="mt-10">
            <TextAndUnderlineLinkText
              text="Remember your password?"
              linkText="Login"
              href="/user/login"
            />
          </div>
        </div>
      </div>
    );
  } else if (pageState === "verify-otp") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
        <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
          {/* Title and Subtitle */}
          <div>
            <Title text="Verify OTP" className="uppercase text-white" />
            <SubTitle text="Please enter the OTP to verify your account." />
            <HorizontalBar className="bg-white/10" />
          </div>

          {/* Verify OTP Form */}
          <form onSubmit={handleVerifyOtp}>
            <div className="flex flex-col gap-5">
              {/* OTP Field */}
              <FormInputField
                label="Enter OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                  setOtp(value);
                }}
                required={true}
                maxLength={6}
              />
            </div>
            <HorizontalBar className="bg-white/10" />
            {/* Submit Button */}
            <FormSubmitButton
              loading={loading}
              label="Verify"
              disabled={otp.length !== 6 || loading}
            />
          </form>

          {/* Resend OTP Link */}
          <div className="mt-10">
            <TextAndUnderlineLinkText
              text="Did not receive the OTP?"
              linkText="Resend OTP"
              onClick={handleSendOtp}
            />
          </div>
        </div>
      </div>
    );
  } else if (pageState === "reset-password") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
        <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
          {/* Title and Subtitle */}
          <div>
            <Title text="Reset Password" className="uppercase text-white" />
            <SubTitle text="Create a new password for your account." />
            <HorizontalBar className="bg-white/10" />
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleResetPassword}>
            <div className="flex flex-col gap-5">
              {/* Password Fields */}
              <FormInputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
              {/* Confirm Password Field */}
              <FormInputField
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required={true}
              />
            </div>
            <HorizontalBar className="bg-white/10" />
            {/* Submit Button */}
            <FormSubmitButton loading={loading} label="Reset" />
          </form>

          {/* Login Link */}
          <div className="mt-10">
            <TextAndUnderlineLinkText
              text="Already reset your password?"
              linkText="Login"
              href="/user/login"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>User Forgotten Password Page</p>
    </div>
  );
};

export default UserForgottenPasswordPage;
