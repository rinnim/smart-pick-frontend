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
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [state, setState] = useContext(UserContext);

  // redirect to profile page if user is already logged in
  useEffect(() => {
    if (state.user) {
      window.location.href = "/user/profile";
    }
  }, [state.user]);

  // handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/login`, {
          email: usernameOrEmail,
          username: usernameOrEmail,
          password,
        }),
        {
          loading: "Logging in",
          success: (response) => {
            // set the user in the context
            setState({
              user: response.data.data.user,
              token: response.data.data.token,
            });

            // also save the user to local storage
            window.localStorage.setItem(
              "auth",
              JSON.stringify(response.data.data),
            );

            // redirect to profile page
            window.location.href = "/user/profile";
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
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
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
        <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
          {/* Title and Subtitle */}
          <div>
            <Title text="User Login" className="uppercase text-white" />
            <SubTitle text="Login to access your account." />
            <HorizontalBar className="bg-white/10" />
          </div>
          {/* Login Form */}
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-5">
              {/* Username or Email Field */}
              <FormInputField
                label="Username or Email"
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                required={true}
              />
              {/* Password Field */}
              <FormInputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            <HorizontalBar className="bg-white/10" />
            {/* Submit Button */}
            <FormSubmitButton loading={loading} label="Login" />
          </form>

          {/* Forgot Password and SignUp Section */}
          <div className="mt-10 flex flex-col gap-2">
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              {/* Forgot Password Link */}
              <TextAndUnderlineLinkText
                text="Forgot your password?"
                linkText="Reset Password"
                href="/user/forgot-password"
              />
              {/* SignUp Link */}
              <TextAndUnderlineLinkText
                text="Don't have an account?"
                linkText="SignUp"
                href="/user/signup"
              />
            </div>
            {/* Admin Login Link */}
            <TextAndUnderlineLinkText
              text="Are you an admin?"
              linkText="Login Here"
              href="/admin/login"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
