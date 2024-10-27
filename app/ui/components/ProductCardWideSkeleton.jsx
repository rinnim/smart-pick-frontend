const ProductCardWideSkeleton = () => {
  return (
    <div className="mx-auto max-w-screen-xl rounded-md border-b py-10 lg:px-0">
      <div className="flex flex-col gap-5 md:flex-row md:gap-10">
        <div className="aspect-square border border-gray-200 w-full animate-pulse rounded-2xl bg-gray-200 md:aspect-auto md:h-auto md:w-[500px]" />

        {/* product details */}
        <div className="flex w-full flex-col gap-1">
          <div className="h-7 w-10/12 animate-pulse rounded-full bg-gray-200" />
          <div className="mt-2 h-7 w-8/12 animate-pulse rounded-full bg-gray-200" />
          {/* product tags */}
          <div className="mt-2 flex items-center gap-2 text-xs md:text-base">
            <div className="h-9 w-3/12 animate-pulse rounded-full bg-gray-200" />
            <div className="h-9 w-2/12 animate-pulse rounded-full bg-gray-200" />
            <div className="h-9 w-1/12 animate-pulse rounded-full bg-gray-200" />
          </div>
          {/* price  */}
          <div className="flex items-center justify-between gap-3">
            <div className="mt-2 flex w-full items-center gap-3">
              <div className="h-6 w-2/12 animate-pulse rounded-full bg-gray-200" />
              <div className="h-6 w-2/12 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="mt-2 h-9 w-2/12 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="h-4 w-4/12 animate-pulse rounded-full bg-gray-200" />
          <div className="my-3 h-40 w-full animate-pulse rounded-2xl bg-gray-200" />

          <div className="flex w-full items-center justify-between gap-5">
            <div className="h-7 w-full animate-pulse rounded-full bg-gray-200 md:h-10" />
            <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200 md:h-10 md:w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardWideSkeleton;
