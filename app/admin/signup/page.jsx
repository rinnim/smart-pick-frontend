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

const AdminSignUpPage = () => {
  const [pageState, setPageState] = useState("get-data");
  const [loading, setLoading] = useState(false);
  const [state] = useContext(UserContext);

  // Redirect to dashboard if user is logged in
  useEffect(() => {
    if (state.user) {
      window.location.href = "/admin/dashboard";
    }
  }, [state.user]);

  // Form field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [secretKey, setSecretKey] = useState("");

  // Handle next step (send OTP)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Check if password is at least 6 characters long
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    // Send OTP
    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/signup/send-otp`,
          { email },
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

  // Handle registration
  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin/register`, {
          firstName,
          lastName,
          username,
          email,
          password,
          otp,
          secretKey,
        }),
        {
          loading: "Registering Admin",
          success: (response) => {
            window.location.href = "/admin/login";
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (pageState === "get-data") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
        <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
          {/* Title and Subtitle */}
          <div>
            <Title text="Admin SignUp" className="uppercase text-white" />
            <SubTitle text="SignUp to get started." />
            <HorizontalBar className="bg-white/10" />
          </div>

          {/* SignUp Form */}
          <form onSubmit={handleSendOtp}>
            <div className="flex flex-col gap-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* First Name */}
                <FormInputField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required={true}
                />
                {/* Last Name */}
                <FormInputField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required={true}
                />
              </div>

              {/* Username and Email Fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Username */}
                <FormInputField
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={true}
                />
                {/* Email */}
                <FormInputField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required={true}
                />
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Password */}
                <FormInputField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required={true}
                />
                {/* Confirm Password */}
                <FormInputField
                  label="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <HorizontalBar className="bg-white/10" />
            {/* Submit Button */}
            <FormSubmitButton loading={loading} label="SignUp" />
          </form>

          {/* Login Link */}
          <div className="mt-10">
            <TextAndUnderlineLinkText
              text="Already have an account?"
              linkText="Login"
              href="/admin/login"
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
            <SubTitle text="Verify OTP to complete your registration." />
            <HorizontalBar className="bg-white/10" />
          </div>

          {/* Verify OTP Form */}
          <form onSubmit={handleRegistration}>
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
              {/* Secret Key Field */}
              <FormInputField
                label="Secret Key"
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                required={true}
              />
            </div>
            <HorizontalBar className="bg-white/10" />
            {/* Submit Button */}
            <FormSubmitButton
              loading={loading}
              label="Verify"
              disabled={otp.length !== 6}
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
  }

  return (
    <div>
      <p>Admin SignUp Page</p>
    </div>
  );
};

export default AdminSignUpPage;
