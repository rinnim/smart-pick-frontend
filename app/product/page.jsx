"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import brands from "../api/data/brands";
import categories from "../api/data/categories";
import HorizontalBar from "../ui/components/HorizontalBar";
import ProductCard from "../ui/components/ProductCard";
import ProductNotFound from "../ui/components/ProductNotFound";
import ProductSkeleton from "../ui/components/ProductSkeleton";

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const ProductsPage = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateQueryParams = () => {
    const query = {
      category: selectedCategory,
      minPrice,
      maxPrice,
      subcategory: selectedSubcategory,
      sortBy,
      sortOrder,
      productsPerPage,
      currentPage,
    };

    // Join selected brands into a comma-separated string
    if (selectedBrands.length > 0) {
      query.brands = selectedBrands.join(",");
    }

    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });

    router.push(`/product?${searchParams}`);
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const filterParams = {
        category: selectedCategory || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
        subcategory: selectedSubcategory || undefined,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
        limit: productsPerPage,
        page: currentPage,
        brands:
          selectedBrands.length > 0 ? selectedBrands.join(",") : undefined,
      };

      const response = await axios.get(
        "http://localhost:5000/api/product/find",
        {
          params: filterParams,
        }
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError("Error fetching products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    updateQueryParams();
  }, [
    selectedCategory,
    selectedBrands,
    minPrice,
    maxPrice,
    selectedSubcategory,
    sortBy,
    sortOrder,
    productsPerPage,
    currentPage,
  ]);

  const handleProductsPerPageChange = (number) => {
    setProductsPerPage(number);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands((prev) => prev.filter((b) => b !== brand));
    } else {
      setSelectedBrands((prev) => [...prev, brand]);
    }
  };

  const removeBrand = (brand) => {
    setSelectedBrands((prev) => prev.filter((b) => b !== brand));
  };
  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4 lg:px-0">
      <h2 className="text-4xl text-center font-semibold">
        {selectedCategory ? toTitleCase(selectedCategory) : "All Products"}
      </h2>
      <HorizontalBar className={"mb-10"} />

      <div className="flex gap-10">
        {/* Left Filters Section */}
        <div className="md:inline-flex flex flex-col gap-6 w-1/4">
          <h2 className="text-3xl font-bold">Filters</h2>

          {/* Products Per Page */}
          <div>
            <p className="text-sm uppercase font-semibold underline mb-2">
              Products Per Page
            </p>
            <div className="flex gap-2 w-full justify-between">
              {[12, 20, 40].map((number) => (
                <button
                  key={number}
                  onClick={() => handleProductsPerPageChange(number)}
                  className={`border text-gray-400 border-gray-300 w-full py-1 rounded-lg font-medium hover:bg-black hover:text-white duration-200 ${
                    productsPerPage === number ? "bg-black text-white" : ""
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <p className="text-sm uppercase font-semibold underline mb-2">
              Sort By
            </p>
            <div className="flex gap-2 w-full justify-between">
              {["default", "price"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option === "default" ? "" : option)}
                  className={`border text-gray-400 border-gray-300 w-full py-1 rounded-lg font-medium hover:bg-black hover:text-white duration-200 ${
                    sortBy === option ? "bg-black text-white" : ""
                  }`}
                >
                  {option === "default" ? "Default" : "Price"}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Order */}
          <div>
            <p className="text-sm uppercase font-semibold underline mb-2">
              Sort Order
            </p>
            <div className="flex gap-2 w-full justify-between">
              {[
                { value: "", label: "Default" },
                { value: "asc", label: "Low to high" },
                { value: "desc", label: "High to low" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortOrder(option.value)}
                  className={`border text-gray-400 border-gray-300 w-full py-1 rounded-lg font-medium hover:bg-black hover:text-white duration-200 ${
                    sortOrder === option.value ? "bg-black text-white" : ""
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <p className="text-sm uppercase font-semibold underline mb-2">
              Price
            </p>
            <div className="flex gap-2 justify-between">
              <input
                type="number"
                value={minPrice || ""}
                min={0}
                onChange={(e) =>
                  setMinPrice(e.target.value ? Number(e.target.value) : null)
                }
                placeholder="Minimum"
                className="mt-2 p-1 border border-gray-300 rounded w-full"
              />
              <input
                type="number"
                value={maxPrice || ""}
                min={0}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? Number(e.target.value) : null)
                }
                placeholder="Maximum"
                className="mt-2 p-1 border border-gray-300 rounded w-full"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="text-sm uppercase font-semibold underline mb-2">
              Categories
            </p>
            {categories.map((category) => (
              <div key={category.name}>
                <h2
                  className={`text-base font-medium text-start hover:underline cursor-pointer ${
                    category.name === selectedCategory
                      ? "text-red-500 underline font-bold"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category.name ? null : category.name
                    );
                    setSelectedSubcategory(null);
                  }}
                >
                  {toTitleCase(category.name)}
                </h2>
                {selectedCategory === category.name && (
                  <div>
                    {category.subcategories.map((subcategory) => (
                      <h3
                        key={subcategory}
                        className={`ml-4 text-base font-medium text-start hover:underline cursor-pointer ${
                          subcategory === selectedSubcategory
                            ? "text-red-500 underline"
                            : "text-gray-400"
                        }`}
                        onClick={() => setSelectedSubcategory(subcategory)}
                      >
                        {toTitleCase(subcategory)}
                      </h3>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Brands */}
          <div>
            <p className="text-sm uppercase font-semibold underline mb-2">
              Brands
            </p>

            {/* Display selected brands at the top */}
            {selectedBrands.map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-between cursor-pointer"
                onClick={() => removeBrand(brand)}
              >
                <h2 className="text-base font-medium text-start text-red-500 underline">
                  {brand.toUpperCase()}
                </h2>
                <button
                  onClick={() => removeBrand(brand)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}

            {/* Display clickable brand names for selection */}
            {brands.map(
              (brand) =>
                !selectedBrands.includes(brand) && ( // Only show brands that are not selected
                  <h2
                    key={brand}
                    className={`text-base font-medium text-start hover:underline cursor-pointer ${
                      selectedBrands.includes(brand)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleBrandChange(brand)}
                  >
                    {brand.toUpperCase()}
                  </h2>
                )
            )}
          </div>
        </div>

        {/* Right Side (Products) */}
        <div className="w-3/4">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <ProductNotFound />
          ) : (
            <div>
              {/* Products */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product) => (
                  <ProductCard item={product} key={product?._id} />
                ))}
              </div>
              {/* Pagination */}
              <div className="flex justify-center items-center flex-wrap mt-6">
                <div className="flex gap-2 mx-4 items-center justify-center flex-wrap">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-12 h-12 flex items-center justify-center border hover:bg-black hover:text-white border-gray-300 rounded disabled:opacity-50"
                  >
                    <FaArrowLeft />
                  </button>

                  {/* First Page Button */}
                  {currentPage > 3 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className="p-2 w-12 h-12 text-center border border-gray-300 rounded hover:bg-black hover:text-white duration-200 text-gray-400"
                    >
                      1
                    </button>
                  )}

                  {/* Ellipsis before current page range */}
                  {currentPage > 4 && (
                    <span className="text-gray-400">...</span>
                  )}

                  {/* Pages around the current page */}
                  {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                    const page = currentPage - 1 + i; // Show up to 3 pages
                    if (page < 1 || page > totalPages - 1) return null; // Skip invalid pages

                    return (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`p-2 w-12 h-12 text-center border border-gray-300 rounded hover:bg-black hover:text-white duration-200 ${
                          page === currentPage
                            ? "bg-black text-white border-black"
                            : "text-gray-400"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* Ellipsis after current page range */}
                  {currentPage < totalPages - 3 && (
                    <span className="text-gray-400">...</span>
                  )}

                  {/* Last Page Button */}
                  {currentPage < totalPages - 2 && (
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      className="p-2 w-12 h-12 text-center border border-gray-300 rounded hover:bg-black hover:text-white duration-200 text-gray-400"
                    >
                      {totalPages}
                    </button>
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-12 h-12 flex items-center justify-center border hover:bg-black hover:text-white border-gray-300 rounded disabled:opacity-50"
                  >
                    <FaArrowRight />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
