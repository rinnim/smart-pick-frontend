"use client";
import brands from "@/app/api/data/brands";
import menuCategories from "@/app/api/data/menu_categories";
import SearchableDropdown from "@/app/components/SearchableDropdown";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import Pagination from "@/app/ui/components/Pagination";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import Title from "@/app/ui/components/Title";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { IoClose, IoSearch } from "react-icons/io5";
import { UserContext } from "../../UserContext";

const ProductsList = () => {
  const [state] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [totalFilteredProducts, setTotalFilteredProducts] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const shopOptions = ["techland", "startech", "ryans"]; // Add more as needed
  const stockOptions = [
    "Call For Price",
    "Discontinued",
    "In Stock",
    "Out Of Stock",
    "Pre Order",
    "Sold Out",
    "Up Coming",
  ];
  const sortOptions = [
    { value: "date-high", label: "Date: Newest to Oldest" },
    { value: "date-low", label: "Date: Oldest to Newest" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "popularity-high", label: "Popularity: High to Low" },
    { value: "popularity-low", label: "Popularity: Low to High" },
    { value: "views-high", label: "Views: High to Low" },
    { value: "views-low", label: "Views: Low to High" },
  ];

  const categoryOptions = menuCategories.map((category) => category.name);
  const getSubcategoryOptions = (category) => {
    const selectedCat = menuCategories.find((cat) => cat.name === category);
    return selectedCat ? selectedCat.subCategories.map((sub) => sub.name) : [];
  };

  const fetchProducts = async (search = "") => {
    const isSearching = search.trim() !== "";

    if (isSearching) {
      setSearchLoading(true);
    } else {
      setLoading(true);
    }

    try {
      await toast.promise(
        axios.get(`http://localhost:5000/api/product/find`, {
          params: {
            search,
            page: currentPage,
            limit: itemsPerPage,
            category: selectedCategory,
            subcategory: selectedSubcategory,
            brands: selectedBrand,
            shop: selectedShop,
            stockStatus: selectedStockStatus,
            sortBy: selectedSort,
          },
          headers: { Authorization: `Bearer ${state.token}` },
        }),
        {
          loading: isSearching ? "Searching products" : "Loading products",
          success: (response) => {
            setFilteredProducts(response.data.data.products);
            setTotalPages(response.data.data.totalPages);
            setTotalProducts(response.data.data.totalProducts);
            setIsSearch(isSearching);
            isSearching &&
              setTotalFilteredProducts(response.data.data.totalProducts || 0);

            return response.data.message;
          },
          error: (error) => {
            console.error(error);
            setError(error.response?.data?.message || error.message);
            setFilteredProducts([]);
            isSearching && setTotalFilteredProducts(0);
            setTotalProducts(null);
            setTotalPages(null);
            setCurrentPage(1);
            setTotalPages(null);
            return error.response?.data?.message || error.message;
          },
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSearchLoading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state.user) return;
    fetchProducts(searchTerm);
  }, [
    state.token,
    state.user,
    currentPage,
    itemsPerPage,
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedShop,
    selectedStockStatus,
    selectedSort,
  ]);

  useEffect(() => {
    setSelectedSubcategory("");
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedCategory,
    selectedSubcategory,
    selectedBrand,
    selectedShop,
    selectedStockStatus,
    selectedSort,
  ]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchProducts(searchTerm);
  };

  const handleDeleteClick = (productId) => {
    setDeleteProductId(productId);
  };

  const confirmDelete = async () => {
    if (!deleteProductId) return;

    try {
      await toast.promise(
        axios.delete(
          `http://localhost:5000/api/admin-actions/delete-product/${deleteProductId}`,
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Deleting product",
          success: (response) => {
            setFilteredProducts(
              filteredProducts.filter(
                (product) => product._id !== deleteProductId,
              ),
            );
            setDeleteProductId(null);
            setTotalProducts(totalProducts - 1);
            isSearch && setTotalFilteredProducts(totalFilteredProducts - 1);
            console.log(response);
            return response.data.message;
          },
          error: (error) => error.response?.data?.message || error.message,
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Products List" />
        <div className="flex items-center justify-between">
          <p className="mt-2 text-xs tracking-wide text-gray-500 md:text-base">
            These are the products listed in the platform
          </p>
          <div className="flex items-center gap-2">
            <label htmlFor="itemsPerPage" className="text-sm text-gray-500">
              Show
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="rounded-md border border-gray-200 px-2 py-1 text-sm focus:border-gray-500 focus:outline-none"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-gray-500">entries</span>
          </div>
        </div>
        <HorizontalBar />

        {/* Search Box */}
        <div className="mb-6 mt-4">
          <form onSubmit={handleSearch} className="flex flex-col gap-4">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 px-2 py-2 pl-10 pr-24 focus:border-gray-500 focus:outline-none"
                />
                <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                {!searchLoading && totalFilteredProducts !== null && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                    Found {totalFilteredProducts} product
                    {totalFilteredProducts > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              <button
                type="submit"
                disabled={searchLoading}
                className={`flex items-center gap-2 rounded-lg bg-black px-4 py-2 font-medium text-white transition-colors hover:bg-red-500`}
              >
                <IoSearch className="text-lg" />
                Search
              </button>
            </div>

            {/* Filter Dropdowns */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {/* Category Dropdown */}
              <SearchableDropdown
                options={categoryOptions}
                value={selectedCategory}
                onChange={(value) => {
                  setSelectedCategory(value);
                  setSelectedSubcategory("");
                  setCurrentPage(1);
                }}
                placeholder="All Categories"
              />

              {/* Subcategory Dropdown */}
              <SearchableDropdown
                options={getSubcategoryOptions(selectedCategory)}
                value={selectedSubcategory}
                onChange={(value) => {
                  setSelectedSubcategory(value);
                  setCurrentPage(1);
                }}
                placeholder="All Subcategories"
                disabled={!selectedCategory}
              />

              {/* Brand Dropdown */}
              <SearchableDropdown
                options={brands}
                value={selectedBrand}
                onChange={(value) => {
                  setSelectedBrand(value);
                  setCurrentPage(1);
                }}
                placeholder="All Brands"
              />

              {/* Shop Dropdown */}
              <SearchableDropdown
                options={shopOptions}
                value={selectedShop}
                onChange={(value) => {
                  setSelectedShop(value);
                  setCurrentPage(1);
                }}
                placeholder="All Shops"
              />

              {/* Stock Status Dropdown */}
              <SearchableDropdown
                options={stockOptions}
                value={selectedStockStatus}
                onChange={(value) => {
                  setSelectedStockStatus(value);
                  setCurrentPage(1);
                }}
                placeholder="All Stock Status"
              />

              {/* Sort Dropdown */}
              <SearchableDropdown
                options={sortOptions.map((option) => option.label)}
                value={
                  selectedSort
                    ? sortOptions.find((opt) => opt.value === selectedSort)
                        ?.label
                    : ""
                }
                onChange={(label) => {
                  const option = sortOptions.find((opt) => opt.label === label);
                  setSelectedSort(option ? option.value : "");
                  setCurrentPage(1);
                }}
                placeholder="Sort By Default"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Products List Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 md:text-base">
            <tr>
              <th className="w-[5%] px-3 py-2">Image</th>
              <th className="w-[25%] px-3 py-2">Name</th>
              <th className="w-[10%] px-3 py-2">Brand</th>
              <th className="w-[12%] px-3 py-2">Category</th>
              <th className="w-[10%] px-3 py-2">Shop</th>
              <th className="w-[8%] px-3 py-2">Special Price</th>
              <th className="w-[8%] px-3 py-2">Regular Price</th>
              <th className="w-[10%] px-3 py-2">Stock</th>
              <th className="w-[7%] px-3 py-2">Favorite</th>
              <th className="w-[5%] px-3 py-2">Views</th>
              <th className="w-[5%] px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading || searchLoading ? (
              [...Array(itemsPerPage)].map((_, index) => (
                <tr key={index} className="animate-pulse border-b bg-white">
                  <td className="px-3 py-3">
                    <div className="h-10 w-10 rounded bg-gray-200" />
                  </td>
                  <td className="flex flex-col gap-2 px-3 py-3">
                    <div className="h-4 w-[90%] rounded bg-gray-200" />
                    <div className="h-4 w-[75%] rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-[65%] rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-[70%] rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-[50%] rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-[50%] rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-[50%] rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-[50%] rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                  </td>
                  <td className="px-3 py-3">
                    <div className="h-4 w-[50%] rounded bg-gray-200" />
                  </td>
                </tr>
              ))
            ) : filteredProducts?.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product?._id}
                  className="border-b bg-white hover:bg-gray-50"
                >
                  <td className="px-3 py-2">
                    <Link
                      href={`/product/${product?._id}`}
                      className="flex cursor-pointer items-center justify-center"
                    >
                      <Image
                        height={100}
                        width={100}
                        src={product?.images[0]}
                        alt={product?.name}
                        className="h-10 w-10 rounded object-cover"
                      />
                    </Link>
                  </td>
                  <td className="w-[25%] px-3 py-2">{product?.name}</td>
                  <td className="w-[10%] px-3 py-2 uppercase">
                    {product?.brand}
                  </td>
                  <td className="w-[12%] px-3 py-2 capitalize">
                    {product?.category}
                  </td>
                  <td className="w-[10%] px-3 py-2 capitalize">
                    <Link href={product?.url} className="cursor-pointer">
                      {product?.shop}
                    </Link>
                  </td>
                  <td className="w-[8%] px-3 py-2">৳{product?.price}</td>
                  <td className="w-[8%] px-3 py-2">৳{product?.regularPrice}</td>
                  <td className="w-[10%] px-3 py-2 capitalize">
                    {product?.stockStatus}
                  </td>
                  <td className="w-[7%] px-3 py-2">
                    {product?.totalFavorites}
                  </td>
                  <td className="w-[5%] px-3 py-2">{product?.totalClicks}</td>
                  <td className="w-[5%] px-3 py-2 text-center">
                    <button
                      onClick={() => handleDeleteClick(product?._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-3 py-4 text-center text-gray-500">
                  <ProductNotFound title={error} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={isSearch ? totalFilteredProducts : totalProducts}
        onPageChange={handlePageChange}
      />

      {/* Delete Confirmation Modal */}
      {deleteProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 text-center">
            <button
              onClick={() => setDeleteProductId(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>
            <h3 className="mb-6 text-xl font-bold">Delete Product</h3>
            <p className="mb-8 text-gray-600">
              Are you sure you want to delete this product?
              <br />
              <span className="text-red-500">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeleteProductId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsList;
