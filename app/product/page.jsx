"use client";
import brands from "@/app/api/data/brands";
import menuCategories from "@/app/api/data/menu_categories";
import shopOptions from "@/app/api/data/shop_options";
import sortOptions from "@/app/api/data/sort_options";
import stockOptions from "@/app/api/data/stock_options";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import Pagination from "@/app/ui/components/Pagination";
import ProductCard from "@/app/ui/components/ProductCard";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import ProductSkeleton from "@/app/ui/components/ProductSkeleton";
import SearchableDropdown from "@/app/ui/components/SearchableDropdown";
import Title from "@/app/ui/components/Title";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalProducts, setTotalProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedShop, setSelectedShop] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [selectedMinPrice, setSelectedMinPrice] = useState("");
  const [selectedMaxPrice, setSelectedMaxPrice] = useState("");

  const categoryOptions = menuCategories.map((category) => category.name);
  const getSubcategoryOptions = (category) => {
    const selectedCat = menuCategories.find((cat) => cat.name === category);
    return selectedCat ? selectedCat.subCategories.map((sub) => sub.name) : [];
  };

  const getQueryParams = () => {
    const querySearchTerm = searchParams.get("search");
    if (querySearchTerm) {
      setSearchTerm(querySearchTerm);
    }
    const queryPage = searchParams.get("page") || 1;
    if (queryPage) {
      setCurrentPage(Number(queryPage));
    }
    const queryItemsPerPage = searchParams.get("limit") || 10;
    if (queryItemsPerPage) {
      setItemsPerPage(Number(queryItemsPerPage));
    }
    const queryCategory = searchParams.get("category");
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    }
    const querySubcategory = searchParams.get("subcategory");
    if (querySubcategory) {
      setSelectedSubcategory(querySubcategory);
    }
    const queryBrand = searchParams.get("brands");
    if (queryBrand) {
      setSelectedBrand(queryBrand);
    }
    const queryShop = searchParams.get("shop");
    if (queryShop) {
      setSelectedShop(queryShop);
    }
    const queryStockStatus = searchParams.get("stockStatus");
    if (queryStockStatus) {
      setSelectedStockStatus(queryStockStatus);
    }
    const querySortOption = searchParams.get("sortBy");
    if (querySortOption) {
      setSelectedSortOption(querySortOption);
    }
    const queryMinPrice = searchParams.get("minPrice");
    if (queryMinPrice) {
      setSelectedMinPrice(queryMinPrice);
    }
    const queryMaxPrice = searchParams.get("maxPrice");
    if (queryMaxPrice) {
      setSelectedMaxPrice(queryMaxPrice);
    }
  };

  useEffect(() => {
    getQueryParams();
    fetchProducts(searchTerm);
  }, [searchParams]);

  const fetchProducts = async (search = "") => {
    const isSearching = search.trim() !== "";

    try {
      setLoading(true);
      await toast.promise(
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/product/find`, {
          params: {
            search: searchTerm,
            page: currentPage,
            limit: itemsPerPage,
            category: selectedCategory,
            subcategory: selectedSubcategory,
            brands: selectedBrand,
            shop: selectedShop,
            stockStatus: selectedStockStatus,
            sortBy: selectedSortOption,
            minPrice: selectedMinPrice,
            maxPrice: selectedMaxPrice,
          },
        }),
        {
          loading: isSearching ? "Searching products" : "Loading products",
          success: (response) => {
            setFilteredProducts(response.data.data.products);
            setTotalPages(response.data.data.totalPages);
            setTotalProducts(response.data.data.totalProducts);
            return response.data.message;
          },
          error: (error) => {
            console.error(error);
            setError(error.response?.data?.message || error.message);
            setFilteredProducts([]);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    updateQueryParams();
  }, [
    itemsPerPage,
    currentPage,
    selectedSubcategory,
    selectedBrand,
    selectedShop,
    selectedStockStatus,
    selectedSortOption,
    selectedMinPrice,
    selectedMaxPrice,
  ]);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedSubcategory("");
    updateQueryParams();
  }, [selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
    updateQueryParams();
  }, [searchTerm]);

  const updateQueryParams = () => {
    const query = {
      category: selectedCategory,
      subcategory: selectedSubcategory,
      brands: selectedBrand,
      shop: selectedShop,
      stockStatus: selectedStockStatus,
      sortBy: selectedSortOption,
      limit: itemsPerPage,
      page: currentPage,
      search: searchTerm,
    };

    const updatedSearchParams = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        updatedSearchParams.append(key, value);
      }
    });

    router.push(`/product?${updatedSearchParams}`);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    updateQueryParams();
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    updateQueryParams();
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      <div>
        <Title text="Product List" />
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
                selectedSortOption
                  ? sortOptions.find((opt) => opt.value === selectedSortOption)
                      ?.label
                  : ""
              }
              onChange={(label) => {
                const option = sortOptions.find((opt) => opt.label === label);
                setSelectedSortOption(option ? option.value : "");
                setCurrentPage(1);
              }}
              placeholder="Sort By Default"
            />
          </div>
        </div>
      </div>

      {/* Product List */}
      <div className="">
        {loading ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: itemsPerPage }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <ProductNotFound title={error || "No products found"} />
        ) : (
          <div>
            {/* Products Grid */}
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard product={product} key={product?._id} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={totalProducts}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductPage;
