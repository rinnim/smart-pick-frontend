"use client";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "../../UserContext";

const ProfilePage = () => {
  const [state] = useContext(UserContext);
  const currentUser = state.user;
  console.log(currentUser);

  return (
    <div className="lg:px-0py-5 mx-auto max-w-screen-xl px-4 py-10 text-white">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 shadow-2xl sm:rounded-3xl sm:px-16">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-10">
          <Image
            src="https://i.ibb.co/mJRkRRV/png-clipart-profile-logo-computer-icons-user-user-blue-heroes-thumbnail.png"
            width={100}
            height={100}
            className="h-40 w-40 rounded-full border border-gray-700 object-cover p-1"
          />
          <div className="flex-1 text-start">
            <h2 className="text-xl font-bold tracking-tight sm:text-4xl">
              Welcome back,{" "}
              <span className="font-medium underline decoration-[1px] underline-offset-2">
                {currentUser?.firstName} {currentUser?.lastName}
              </span>
            </h2>
            <p className="mt-3 max-w-3xl text-start text-base leading-6 text-gray-300 *:mt-6">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Suscipit, minus rem. Quaerat natus in sit cupiditate expedita odio
              at sed saepe quos? Maiores, labore suscipit rerum ipsa iste eius
              voluptates. Dolore laboriosam aut alias iusto quidem
              necessitatibus quibusdam soluta in enim veritatis, commodi
              voluptatem inventore iste harum est id autem.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
