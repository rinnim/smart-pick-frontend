// ProductSkeleton.js
const ProductSkeleton = () => {
  return (
    <div className="border border-gray-200 rounded-lg p-2 overflow-hidden hover:border-black duration-200 cursor-pointer">
      <div className="w-full h-60 relative p-2">
        <div className="animate-pulse bg-gray-200 rounded-md w-full h-full" />
      </div>
      <div className="flex flex-col gap-2 px-2 pb-2">
        <div className="animate-pulse bg-gray-200 rounded-md h-4 w-2/5 mb-2 mt-1" />
        <div className="animate-pulse bg-gray-200 rounded-md h-5 w-10/12 mb-1" />
        <div className="animate-pulse bg-gray-200 rounded-md h-5 w-8/12 mb-1" />
        <div className="flex items-center gap-2">
          <div className="animate-pulse bg-gray-200 rounded-md h-4 w-1/6" />
          <div className="animate-pulse bg-gray-200 rounded-md h-4 w-1/6" />
        </div>
        <div className="flex justify-between p-2">
          <div className="animate-pulse bg-gray-200 rounded-full h-6 w-6" />
          <div className="animate-pulse bg-gray-200 rounded-full h-6 w-6" />
          <div className="animate-pulse bg-gray-200 rounded-full h-6 w-6" />
        </div>
        <div className="animate-pulse bg-gray-200 rounded-full h-10 w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
