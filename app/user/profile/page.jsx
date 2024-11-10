"use client";
import Button from "@/app/ui/components/Button";
import Container from "@/app/ui/components/Container";
import ProfileImage from "@/app/ui/components/ProfileImage";
import ProfilePageSkeleton from "@/app/ui/components/ProfilePageSkeleton";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../../UserContext";

const UserProfilePage = () => {
  const [state, setState] = useContext(UserContext);

  // handle logout
  const handleLogout = async () => {
    toast.promise(
      new Promise((resolve, reject) => {
        try {
          window.localStorage.removeItem("auth");
          setState({ user: null, token: null });
          window.location.href = "/";
          resolve();
        } catch (error) {
          reject(error);
        }
      }),
      {
        loading: "Logging out",
        success: "Logout successful",
        error: "Failed to logout",
      },
    );
  };

  return (
    <Container className="my-[5%]">
      {!state.user ? (
        <ProfilePageSkeleton />
      ) : (
        <div className="relative isolate overflow-hidden rounded-3xl bg-gray-900 px-6 py-14 text-white shadow-2xl sm:px-16">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-10">
            <ProfileImage src="https://i.ibb.co/mJRkRRV/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png" />
            <div className="flex-1 text-start">
              <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
                Hello,{" "}
                <span className="font-medium underline decoration-[1px] underline-offset-2">
                  {state?.user?.firstName} {state?.user?.lastName}
                </span>
              </h2>
              <p className="mt-3 max-w-3xl text-start text-base leading-6 text-gray-300 *:mt-6">
                @{state?.user?.username}
              </p>
              <p className="mt-3 max-w-3xl text-start text-base leading-6 text-gray-300 *:mt-6">
                {state?.user?.email}
              </p>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            <Button
              className="bg-gray-800 hover:bg-black"
              text="Edit Profile"
              href="/user/edit-profile"
            />
            <Button
              className="bg-gray-800 hover:bg-black"
              text="Change Password"
              href="/user/change-password"
            />
            <Button
              className="bg-gray-800 hover:bg-red-500"
              text="Delete Account"
              href="/user/delete-account"
            />
            <Button
              className="bg-gray-800 hover:bg-red-500"
              text="Logout"
              onClick={handleLogout}
            />
          </div>
        </div>
      )}
    </Container>
  );
};

export default UserProfilePage;
