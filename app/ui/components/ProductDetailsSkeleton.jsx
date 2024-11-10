const ProductDetailsSkeleton = ({ product }) => {
  const similarProductsLimit = 8;
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="h-full w-full animate-pulse rounded-2xl bg-gray-200" />
          <div className="">
            <div className="">
              <div className="mb-2 mt-1 h-8 w-11/12 animate-pulse rounded-full bg-gray-200" />
              <div className="mb-2 mt-1 h-8 w-8/12 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="mt-4 flex w-full gap-2">
              <div className="mb-2 mt-1 h-8 w-3/12 animate-pulse rounded-full bg-gray-200" />
              <div className="mb-2 mt-1 h-8 w-2/12 animate-pulse rounded-full bg-gray-200" />
              <div className="mb-2 mt-1 h-8 w-3/12 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center gap-2">
                <div className="mb-2 mt-1 h-5 w-2/12 animate-pulse rounded-full bg-gray-200" />
                <div className="mb-2 mt-1 h-5 w-2/12 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="mb-2 mt-6 h-8 w-3/12 animate-pulse rounded-full bg-gray-200" />
            </div>
            <div className="mb-2 mt-1 h-4 w-6/12 animate-pulse rounded-full bg-gray-200" />
            <div className="mt-4 flex flex-col">
              <div className="mb-2 mt-1 h-4 w-4/12 animate-pulse rounded-full bg-gray-200" />
              <div className="flex w-full justify-between">
                <div className="mb-2 h-4 w-2/12 animate-pulse rounded-full bg-gray-200" />
                <div className="mb-2 h-4 w-3/12 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="flex w-full justify-between">
                <div className="mb-2 h-4 w-1/12 animate-pulse rounded-full bg-gray-200" />
                <div className="mb-2 h-4 w-4/12 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="flex w-full justify-between">
                <div className="mb-2 h-4 w-2/12 animate-pulse rounded-full bg-gray-200" />
                <div className="mb-2 h-4 w-3/12 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="mb-2 h-4 w-1/12 animate-pulse self-center rounded-full bg-gray-200" />
              <div className="my-4 flex w-full justify-around">
                <div className="mb-2 h-7 w-7 animate-pulse rounded-full bg-gray-200" />
                <div className="mb-2 h-7 w-7 animate-pulse rounded-full bg-gray-200" />
                <div className="mb-2 h-7 w-7 animate-pulse rounded-full bg-gray-200" />
              </div>
              <div className="mb-2 h-9 w-full animate-pulse self-center rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
