"use client";
import FormInputField from "@/app/ui/components/FormInputField";
import FormSubmitButton from "@/app/ui/components/FormSubmitButton";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import SubTitle from "@/app/ui/components/SubTitle";
import TextAndUnderlineLinkText from "@/app/ui/components/TextAndUnderlineLinkText";
import Title from "@/app/ui/components/Title";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";

const AdminChangePasswordPage = () => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [state] = useContext(UserContext);

  // Handle change password
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if passwords match
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    // Check if password is at least 6 characters long
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      await toast.promise(
        axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/change-password`,
          { oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Changing password",
          success: (response) => {
            window.location.href = "/admin/profile";
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
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
    <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
      <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
        {/* Title and Subtitle */}
        <div>
          <Title text="Change Password" className="uppercase text-white" />
          <SubTitle text="Enter your old password and new password." />
          <HorizontalBar className="bg-white/10" />
        </div>

        {/* Change Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            {/* Old Password */}
            <FormInputField
              label="Old Password"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required={true}
            />
            {/* New Password */}
            <FormInputField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required={true}
            />
            {/* Confirm New Password */}
            <FormInputField
              label="Confirm New Password"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required={true}
            />
          </div>
          <HorizontalBar className="bg-white/10" />
          {/* Submit Button */}
          <FormSubmitButton
            loading={loading}
            label="Change Password"
            disabled={
              !oldPassword || !newPassword || !confirmNewPassword || loading
            }
          />
        </form>

        {/* Profile Link */}
        <div className="mt-10">
          <TextAndUnderlineLinkText
            text="Already changed your password?"
            linkText="Profile"
            href="/admin/profile"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminChangePasswordPage;
