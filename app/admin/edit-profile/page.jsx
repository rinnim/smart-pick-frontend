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

const AdminEditProfilePage = () => {
  const [pageState, setPageState] = useState("edit-data");
  const [state, setState] = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // Form field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle next step
  const handleNext = (e) => {
    e.preventDefault();
    setLoading(true);
    setPageState("update-data");
    setLoading(false);
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await toast.promise(
        axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/update-profile`,
          {
            firstName: firstName || state?.user?.firstName,
            lastName: lastName || state?.user?.lastName,
            username: username || state?.user?.username,
            email: email || state?.user?.email,
            password,
          },
          {
            headers: {
              Authorization: `Bearer ${state?.token}`,
              "Content-Type": "application/json",
            },
          },
        ),
        {
          loading: "Updating Profile",
          success: (response) => {
            // Update user context
            setState({
              ...state,
              user: response.data.data.user,
            });

            // Update local storage
            const authData = JSON.parse(localStorage.getItem("auth"));
            localStorage.setItem(
              "auth",
              JSON.stringify({
                ...authData,
                user: response.data.data.user,
              }),
            );

            // Redirect to profile page
            window.location.href = "/admin/profile";
            return response.data.message;
          },
          error: (error) => {
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error("Update profile error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (pageState === "edit-data") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
        <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
          {/* Title and Subtitle */}
          <div>
            <Title text="Edit Profile" className="uppercase text-white" />
            <SubTitle text="Enter your details to update your profile." />
            <HorizontalBar className="bg-white/10" />
          </div>

          {/* Edit Profile Form */}
          <form onSubmit={handleNext}>
            <div className="flex flex-col gap-5">
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* First Name */}
                <FormInputField
                  label="First Name"
                  value={firstName}
                  placeholder={state?.user?.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {/* Last Name */}
                <FormInputField
                  label="Last Name"
                  value={lastName}
                  placeholder={state?.user?.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              {/* Username and Email Fields */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Username */}
                <FormInputField
                  label="Username"
                  value={username}
                  placeholder={state?.user?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {/* Email */}
                <FormInputField
                  label="Email"
                  type="email"
                  value={email}
                  placeholder={state?.user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <HorizontalBar className="bg-white/10" />
            {/* Submit Button */}
            <FormSubmitButton
              loading={loading}
              label="Next"
              disabled={!firstName && !lastName && !username && !email}
            />
          </form>

          {/* Profile Link */}
          <div className="mt-10">
            <TextAndUnderlineLinkText
              text="Already edited your profile?"
              linkText="Profile"
              href="/admin/profile"
            />
          </div>
        </div>
      </div>
    );
  } else if (pageState === "update-data") {
    return (
      <div className="mx-auto my-10 max-w-screen-xl rounded-lg bg-gray-800 px-4 py-10 lg:px-0">
        <div className="mx-auto max-w-5xl px-10 pt-10 text-white lg:px-0">
          {/* Title and Subtitle */}
          <div>
            <Title text="Confirm Update" className="uppercase text-white" />
            <SubTitle text="Enter your password to update your profile." />
            <HorizontalBar className="bg-white/10" />
          </div>

          {/* Password Form */}
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
              label="Update Profile"
              disabled={!password}
            />
          </form>

          {/* Profile Link */}
          <div className="mt-10">
            <TextAndUnderlineLinkText
              text="Already edited your profile?"
              linkText="Profile"
              href="/admin/profile"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>Admin Edit Profile Page</p>
    </div>
  );
};

export default AdminEditProfilePage;
