"use client";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import Pagination from "@/app/ui/components/Pagination";
import ProductNotFound from "@/app/ui/components/ProductNotFound";
import Title from "@/app/ui/components/Title";
import { formatDateToMonthDayYear } from "@/app/utils/formatDate";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { IoClose, IoSearch } from "react-icons/io5";
import { UserContext } from "../../UserContext";

const UsersList = () => {
  const [state] = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalFilteredUsers, setTotalFilteredUsers] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isSearch, setIsSearch] = useState(false);

  // Remove separate fetch users effect and combine with search functionality
  const fetchUsers = async (search = "") => {
    const isSearching = search.trim() !== "";

    if (isSearching) {
      setSearchLoading(true);
    } else {
      setLoading(true);
    }

    try {
      await toast.promise(
        axios.get(`http://localhost:5000/api/admin-actions/search-users`, {
          params: {
            query: search,
            page: currentPage,
            limit: itemsPerPage,
          },
          headers: { Authorization: `Bearer ${state.token}` },
        }),
        {
          loading: isSearching ? "Searching users" : "Loading users",
          success: (response) => {
            setFilteredUsers(response.data.data.users);
            setTotalPages(response.data.data.totalPages);
            setTotalUsers(response.data.data.totalUsers);
            setIsSearch(isSearching);
            isSearching &&
              setTotalFilteredUsers(response.data.data.totalUsers || 0);

            return response.data.message;
          },
          error: (error) => {
            console.error(error);
            setError(error.response?.data?.message || error.message);
            setFilteredUsers([]);
            isSearching && setTotalFilteredUsers(0);
            setTotalUsers(null);
            setTotalPages(null);
            setCurrentPage(1);
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

  // Effect for initial load and pagination changes
  useEffect(() => {
    if (!state.user) return;
    fetchUsers(searchTerm);
  }, [state.token, state.user, currentPage, itemsPerPage]);

  // Update search handler
  const handleSearch = async (e) => {
    e.preventDefault();
    setCurrentPage(1);
    await fetchUsers(searchTerm);
  };

  const handleDeleteClick = (userId) => {
    setDeleteUserId(userId);
  };

  const confirmDelete = async () => {
    if (!deleteUserId) return;

    try {
      await toast.promise(
        axios.delete(
          `http://localhost:5000/api/admin-actions/delete-user/${deleteUserId}`,
          { headers: { Authorization: `Bearer ${state.token}` } },
        ),
        {
          loading: "Deleting user",
          success: (response) => {
            setFilteredUsers(
              filteredUsers.filter((user) => user._id !== deleteUserId),
            );
            setDeleteUserId(null);
            setTotalUsers(totalUsers - 1);
            isSearch && setTotalFilteredUsers(totalFilteredUsers - 1);
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
        <Title text="Users List" />
        <div className="flex items-center justify-between">
          <p className="mt-2 text-xs tracking-wide text-gray-500 md:text-base">
            These are the users registered in the platform
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
          <form onSubmit={handleSearch} className="relative flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search users by name, username, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 pr-24 focus:border-gray-500 focus:outline-none"
              />
              <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              {!searchLoading && totalFilteredUsers !== null && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
                  Found {totalFilteredUsers} user
                  {totalFilteredUsers > 1 ? "s" : ""}
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
          </form>
        </div>
      </div>

      {/* Users List Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 md:text-base">
            <tr>
              <th className="w-[12%] px-3 py-2">First Name</th>
              <th className="w-[12%] px-3 py-2">Last Name</th>
              <th className="w-[15%] px-3 py-2">Username</th>
              <th className="w-[25%] px-3 py-2">Email</th>
              <th className="w-[8%] px-3 py-2">Favorites</th>
              <th className="w-[8%] px-3 py-2">Compares</th>
              <th className="w-[8%] px-3 py-2">Trackings</th>
              <th className="w-[12%] px-3 py-2">Join Date</th>
              <th className="w-[5%] px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading || searchLoading ? (
              // Loading state with 7 skeleton rows
              [...Array(itemsPerPage)].map((_, index) => (
                <tr key={index} className="animate-pulse border-b bg-white">
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[75%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[70%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[35%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[75%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[25%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[25%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[25%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-[55%] rounded bg-gray-200" />
                  </td>
                  <td className=" px-3 py-3">
                    <div className="h-4 w-4 rounded bg-gray-200" />
                  </td>
                </tr>
              ))
            ) : filteredUsers?.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user?._id}
                  className="border-b bg-white hover:bg-gray-50"
                >
                  <td className="w-[12%] px-3 py-2">{user?.firstName}</td>
                  <td className="w-[12%] px-3 py-2">{user?.lastName}</td>
                  <td className="w-[15%] px-3 py-2">{user?.username}</td>
                  <td className="w-[25%] px-3 py-2">{user?.email}</td>
                  <td className="w-[8%] px-3 py-2">{user?.favorites?.length}</td>
                  <td className="w-[8%] px-3 py-2">{user?.compares?.length}</td>
                  <td className="w-[8%] px-3 py-2">{user?.trackings?.length}</td>
                  <td className="w-[12%] px-3 py-2">
                    {formatDateToMonthDayYear(user?.createdAt)}
                  </td>
                  <td className="w-[5%] px-3 py-2 text-center">
                    <button
                      onClick={() => handleDeleteClick(user?._id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-3 py-4 text-center text-gray-500">
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
        totalItems={isSearch ? totalFilteredUsers : totalUsers}
        onPageChange={handlePageChange}
      />

      {/* Delete Confirmation Popup */}
      {deleteUserId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 text-center">
            <button
              onClick={() => setDeleteUserId(null)}
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
            >
              <IoClose size={24} />
            </button>
            <h3 className="mb-6 text-xl font-bold">Delete User</h3>
            <p className="mb-8 text-gray-600">
              Are you sure you want to delete this user?
              <br />
              <span className="text-red-500">
                This action cannot be undone.
              </span>
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setDeleteUserId(null)}
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

export default UsersList;
