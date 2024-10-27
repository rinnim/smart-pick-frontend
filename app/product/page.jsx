"use client";

import { Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
};

// Move all the existing component logic into a new component
const ProductsPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);

  useEffect(() => {
    // Read query parameters from URL
    const category = searchParams.get("category");
    const brands = searchParams.get("brands");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const subcategory = searchParams.get("subcategory");
    const sortByParam = searchParams.get("sortBy");
    const sortOrderParam = searchParams.get("sortOrder");
    const productsPerPageParam = searchParams.get("productsPerPage");
    const currentPageParam = searchParams.get("currentPage");
    const search = searchParams.get("search");

    // Set state based on URL parameters
    setSelectedCategory(category || null);
    setSelectedBrands(brands ? brands.split(",") : []);
    setMinPrice(minPriceParam ? Number(minPriceParam) : null);
    setMaxPrice(maxPriceParam ? Number(maxPriceParam) : null);
    setSelectedSubcategory(subcategory || null);
    setSortBy(sortByParam || null);
    setSortOrder(sortOrderParam || null);
    setProductsPerPage(
      productsPerPageParam ? Number(productsPerPageParam) : 12,
    );
    setCurrentPage(currentPageParam ? Number(currentPageParam) : 1);
    setSearch(search || "");

    // Fetch products using the URL parameters
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const filterParams = {
          category: category || undefined,
          minPrice: minPriceParam || undefined,
          maxPrice: maxPriceParam || undefined,
          subcategory: subcategory || undefined,
          sortBy: sortByParam || undefined,
          sortOrder: sortOrderParam || undefined,
          limit: productsPerPageParam || 12,
          page: currentPageParam || 1,
          brands: brands || undefined,
          search: search || undefined,
        };

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/product/find`,
          {
            params: filterParams,
          },
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Error fetching products");
        console.error(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

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
      search,
    };

    if (selectedBrands.length > 0) {
      query.brands = selectedBrands.join(",");
    }

    const searchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        searchParams.append(key, value);
      }
    });

    router.push(`/product?${searchParams}`);
  };

  useEffect(() => {
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
    search,
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
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <h2 className="text-center text-4xl font-semibold">
        {search
          ? `Search results for "${search}"`
          : selectedCategory
            ? toTitleCase(selectedCategory)
            : "All Products"}
      </h2>
      <HorizontalBar className={"mb-10"} />

      <div className="flex gap-10">
        {/* Left Filters Section */}
        <div className="flex w-1/4 flex-col gap-6 md:inline-flex">
          <h2 className="text-3xl font-bold">Filters</h2>

          {/* Products Per Page */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase underline">
              Products Per Page
            </p>
            <div className="flex w-full justify-between gap-2">
              {[12, 20, 40].map((number) => (
                <button
                  key={number}
                  onClick={() => handleProductsPerPageChange(number)}
                  className={`w-full rounded-lg border border-gray-300 py-1 font-medium text-gray-400 duration-200 hover:bg-black hover:text-white ${
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
            <p className="mb-2 text-sm font-semibold uppercase underline">
              Sort By
            </p>
            <div className="flex w-full justify-between gap-2">
              {["default", "price"].map((option) => (
                <button
                  key={option}
                  onClick={() => setSortBy(option === "default" ? "" : option)}
                  className={`w-full rounded-lg border border-gray-300 py-1 font-medium text-gray-400 duration-200 hover:bg-black hover:text-white ${
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
            <p className="mb-2 text-sm font-semibold uppercase underline">
              Sort Order
            </p>
            <div className="flex w-full justify-between gap-2">
              {[
                { value: "", label: "Default" },
                { value: "asc", label: "Low to high" },
                { value: "desc", label: "High to low" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortOrder(option.value)}
                  className={`w-full rounded-lg border border-gray-300 py-1 font-medium text-gray-400 duration-200 hover:bg-black hover:text-white ${
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
            <p className="mb-2 text-sm font-semibold uppercase underline">
              Price
            </p>
            <div className="flex justify-between gap-2">
              <input
                type="number"
                value={minPrice || ""}
                min={0}
                onChange={(e) =>
                  setMinPrice(e.target.value ? Number(e.target.value) : null)
                }
                placeholder="Minimum"
                className="mt-2 w-full rounded border border-gray-300 p-1"
              />
              <input
                type="number"
                value={maxPrice || ""}
                min={0}
                onChange={(e) =>
                  setMaxPrice(e.target.value ? Number(e.target.value) : null)
                }
                placeholder="Maximum"
                className="mt-2 w-full rounded border border-gray-300 p-1"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase underline">
              Categories
            </p>
            {categories.map((category) => (
              <div key={category.name}>
                <h2
                  className={`cursor-pointer text-start text-base font-medium hover:underline ${
                    category.name === selectedCategory
                      ? "font-bold text-red-500 underline"
                      : "text-gray-400"
                  }`}
                  onClick={() => {
                    setSelectedCategory(
                      selectedCategory === category.name ? null : category.name,
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
                        className={`ml-4 cursor-pointer text-start text-base font-medium hover:underline ${
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
            <p className="mb-2 text-sm font-semibold uppercase underline">
              Brands
            </p>

            {/* Display selected brands at the top */}
            {selectedBrands.map((brand) => (
              <div
                key={brand}
                className="flex cursor-pointer items-center justify-between"
                onClick={() => removeBrand(brand)}
              >
                <h2 className="text-start text-base font-medium text-red-500 underline">
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
                    className={`cursor-pointer text-start text-base font-medium hover:underline ${
                      selectedBrands.includes(brand)
                        ? "text-red-500"
                        : "text-gray-400"
                    }`}
                    onClick={() => handleBrandChange(brand)}
                  >
                    {brand.toUpperCase()}
                  </h2>
                ),
            )}
          </div>
        </div>

        {/* Right Side (Products) */}
        <div className="w-3/4">
          {loading ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <ProductNotFound title="No products found" />
          ) : (
            <div>
              {/* Products */}
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard product={product} key={product?._id} />
                ))}
              </div>
              {/* Pagination */}
              <div className="mt-6 flex flex-wrap items-center justify-center">
                <div className="mx-4 flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex h-12 w-12 items-center justify-center rounded border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
                  >
                    <FaArrowLeft />
                  </button>

                  {/* First Page Button */}
                  {currentPage > 3 && (
                    <button
                      onClick={() => handlePageChange(1)}
                      className="h-12 w-12 rounded border border-gray-300 p-2 text-center text-gray-400 duration-200 hover:bg-black hover:text-white"
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
                        className={`h-12 w-12 rounded border border-gray-300 p-2 text-center duration-200 hover:bg-black hover:text-white ${
                          page === currentPage
                            ? "border-black bg-black text-white"
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
                      className="h-12 w-12 rounded border border-gray-300 p-2 text-center text-gray-400 duration-200 hover:bg-black hover:text-white"
                    >
                      {totalPages}
                    </button>
                  )}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex h-12 w-12 items-center justify-center rounded border border-gray-300 hover:bg-black hover:text-white disabled:opacity-50"
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
