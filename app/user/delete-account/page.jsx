"use client";
import FormInputField from "@/app/ui/components/FormInputField";
import FormSubmitButton from "@/app/ui/components/FormSubmitButton";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import SubTitle from "@/app/ui/components/SubTitle";
import Title from "@/app/ui/components/Title";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const UserDeleteAccountPage = () => {
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  // Handle delete account
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
          loading: "Deleting Account",
          success: (response) => {
            // Reset user context
            setState({
              user: null,
              token: null,
            });

            // Remove auth from local storage
            localStorage.removeItem("auth");

            // Redirect to home page
            window.location.href = "/";
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error("Delete account error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
      <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
        {/* Title and Subtitle */}
        <div>
          <Title text="Delete Account" className="uppercase text-white" />
          <SubTitle text="Enter your password to delete your account." />
          <SubTitle
            text="This action is irreversible and will permanently delete your account."
            className="text-red-400"
          />
          <HorizontalBar className="bg-white/10" />
        </div>

        {/* Delete Account Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
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
          <FormSubmitButton
            loading={loading}
            label="Delete Account"
            disabled={!password || loading}
          />
        </form>
      </div>
    </div>
  );
};

export default UserDeleteAccountPage;
