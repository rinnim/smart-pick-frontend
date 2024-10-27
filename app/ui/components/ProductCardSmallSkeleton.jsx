// ProductSkeleton.js
const ProductCardSmallSkeleton = () => {
  return (
    <div className="cursor-pointer overflow-hidden rounded-lg border border-gray-200 p-2 duration-200 hover:border-black">
      <div className="relative h-60 w-full p-2">
        <div className="h-full w-full animate-pulse rounded-md bg-gray-200" />
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="mb-2 mt-1 h-4 w-2/5 animate-pulse rounded-md bg-gray-200" />
        <div className="mb-1 h-5 w-10/12 animate-pulse rounded-md bg-gray-200" />
        <div className="mb-1 h-5 w-8/12 animate-pulse rounded-md bg-gray-200" />
        <div className="flex items-center gap-2">
          <div className="h-4 w-1/6 animate-pulse rounded-md bg-gray-200" />
          <div className="h-4 w-1/6 animate-pulse rounded-md bg-gray-200" />
        </div>
        
        <div className="h-10 w-full animate-pulse rounded-full bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductCardSmallSkeleton;
