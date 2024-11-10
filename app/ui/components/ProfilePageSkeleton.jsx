const ProfilePageSkeleton = () => {
  return (
    <div>
      <div className="rounded-3xl bg-gray-900 px-6 py-14 shadow-2xl sm:px-16">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-10">
          <div className="h-40 w-40 animate-pulse rounded-full border border-gray-700 bg-gray-200 object-cover p-1" />
          <div className="flex w-full flex-col md:flex-1">
            <div className="h-6 w-4/12 animate-pulse rounded-full bg-gray-200 md:h-10" />
            <div className="mt-5 h-4 w-3/12 animate-pulse rounded-full bg-gray-200 md:h-5" />
            <div className="mt-5 h-4 w-2/12 animate-pulse rounded-full bg-gray-200 md:h-5" />
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <div className="h-7 w-full animate-pulse rounded-full border border-gray-700 bg-gray-200 object-cover p-1 md:h-10" />
          <div className="h-7 w-full animate-pulse rounded-full border border-gray-700 bg-gray-200 object-cover p-1 md:h-10" />
          <div className="h-7 w-full animate-pulse rounded-full border border-gray-700 bg-gray-200 object-cover p-1 md:h-10" />
          <div className="h-7 w-full animate-pulse rounded-full border border-gray-700 bg-gray-200 object-cover p-1 md:h-10" />
        </div>
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
