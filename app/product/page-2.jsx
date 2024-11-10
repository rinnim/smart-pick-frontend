"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

import Pagination from "@/app/ui/components/Pagination";
import brands from "../api/data/brands";
import categories from "../api/data/categories";
import HorizontalBar from "../ui/components/HorizontalBar";
import ProductCard from "../ui/components/ProductCard";
import ProductNotFound from "../ui/components/ProductNotFound";
import ProductSkeleton from "../ui/components/ProductSkeleton";

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
  const [selectedBrand, setSelectedBrand] = useState([]);
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
  const [totalProducts, setTotalProducts] = useState(0);

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
    setSelectedBrand(brands ? brands.split(",") : []);
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
        setProducts(response.data.data.products);
        setTotalProducts(response.data.data.totalProducts);
        setTotalPages(response.data.data.totalPages);
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

    if (selectedBrand.length > 0) {
      query.brands = selectedBrand.join(",");
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
    selectedBrand,
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

  const handlePageChange = ({ selected }) => {
    const page = selected + 1;
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleBrandChange = (brand) => {
    if (selectedBrand.includes(brand)) {
      setSelectedBrand((prev) => prev.filter((b) => b !== brand));
    } else {
      setSelectedBrand((prev) => [...prev, brand]);
    }
  };

  const removeBrand = (brand) => {
    setSelectedBrand((prev) => prev.filter((b) => b !== brand));
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <h2 className="text-center text-4xl font-semibold capitalize">
        {search
          ? `Search results for "${search}"`
          : selectedCategory
            ? selectedCategory
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
                  className={`cursor-pointer text-start text-base font-medium capitalize hover:underline ${
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
                  {category.name}
                </h2>
                {selectedCategory === category.name && (
                  <div>
                    {category.subcategories.map((subcategory) => (
                      <h3
                        key={subcategory}
                        className={`ml-4 cursor-pointer text-start text-base font-medium capitalize hover:underline ${
                          subcategory === selectedSubcategory
                            ? "text-red-500 underline"
                            : "text-gray-400"
                        }`}
                        onClick={() => setSelectedSubcategory(subcategory)}
                      >
                        {subcategory}
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
            {selectedBrand.map((brand) => (
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
                !selectedBrand.includes(brand) && ( // Only show brands that are not selected
                  <h2
                    key={brand}
                    className={`cursor-pointer text-start text-base font-medium hover:underline ${
                      selectedBrand.includes(brand)
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
              {/* Products Grid */}
              <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard product={product} key={product?._id} />
                ))}
              </div>

              {/* Replace old pagination with new component */}
              {!loading && products.length > 0 && (
                <div className="mt-6">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    itemsPerPage={productsPerPage}
                    totalItems={totalProducts} // Make sure you have this state
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
