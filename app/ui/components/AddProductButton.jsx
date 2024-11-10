import Link from "next/link";

const AddProductButton = () => {
  return (
    <Link
      href="/product"
      className="mt-2 rounded-md border border-transparent bg-gray-100 px-8 py-3 text-base font-medium duration-200 hover:bg-black hover:text-white"
    >
      Add Products
    </Link>
  );
};

export default AddProductButton;
