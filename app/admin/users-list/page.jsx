"use client";
import DownloadButton from "@/app/ui/components/DownloadButton";
import HorizontalBar from "@/app/ui/components/HorizontalBar";
import ItemsPerPageSelector from "@/app/ui/components/ItemsPerPageSelector";
import Modal from "@/app/ui/components/Modal";
import Pagination from "@/app/ui/components/Pagination";
import SearchButton from "@/app/ui/components/SearchButton";
import Title from "@/app/ui/components/Title";
import UpdateUserModal from "@/app/ui/components/UpdateUserModal";
import UserListData from "@/app/ui/components/UserListData";
import UserListError from "@/app/ui/components/UserListError";
import UserListPrintReport from "@/app/ui/components/UserListPrintReport";
import UserListSkeleton from "@/app/ui/components/UserListSkeleton";
import { formatDateToMonthDayYear } from "@/app/utils/formatDate";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useReactToPrint } from "react-to-print";
import { UserContext } from "../../UserContext";

const UsersList = () => {
  const [state] = useContext(UserContext);
  const pdfRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [totalUsers, setTotalUsers] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [allUsers, setAllUsers] = useState([]);
  const [isPrintReady, setIsPrintReady] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [updateUserId, setUpdateUserId] = useState(null);
  const [updateUserData, setUpdateUserData] = useState(null);

  // PDF Print Configuration
  const triggerPrint = useReactToPrint({
    contentRef: pdfRef,
    documentTitle: `Users_List_${formatDateToMonthDayYear(new Date())}`,
    pageStyle: `
      @page {
        size: landscape;
        margin: 20mm;
      }
    `,
  });

  // Main Data Fetching
  const fetchUsers = async (search = "") => {
    setLoading(true);

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
          loading: search ? "Searching users" : "Loading users",
          success: (response) => {
            setFilteredUsers(response.data.data.users);
            setTotalPages(response.data.data.totalPages);
            setTotalUsers(response.data.data.totalUsers);
            return response.data.message;
          },
          error: (error) => {
            console.error(error);
            setError(error.response?.data?.message || error.message);
            setFilteredUsers([]);
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
      setLoading(false);
    }
  };

  // Fetch Users Effect
  useEffect(() => {
    if (state.user) {
      fetchUsers(searchTerm);
    }
  }, [state.token, state.user, currentPage, itemsPerPage]);

  // PDF Print Effect
  useEffect(() => {
    if (isPrintReady) {
      triggerPrint();
      setIsPrintReady(false);
    }
  }, [isPrintReady, allUsers]);

  // Search Handler
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm !== "") {
      setIsSearched(true);
      setCurrentPage(1);
      await fetchUsers(searchTerm);
    }
  };
  // Search close handler
  const handleSearchClose = async () => {
    setSearchTerm("");
    setCurrentPage(1);
    await fetchUsers();
    setIsSearched(false);
  };

  // Delete User Handler
  function handleDeleteClick(userId) {
    setDeleteUserId(userId);
  }

  function handlePageChange({ selected }) {
    setCurrentPage(selected + 1);
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleGeneratePDF = async () => {
    setIsPrintReady(false);
    try {
      const response = await toast.promise(
        axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin-actions/search-users`,
          {
            params: { query: searchTerm },
            headers: { Authorization: `Bearer ${state.token}` },
          },
        ),
        {
          loading: "Preparing PDF",
          success: "Your PDF is ready!",
          error: (error) => {
            setIsPrintReady(true);
            setAllUsers([]);
            return error.response?.data?.message || "Failed to prepare PDF";
          },
        },
      );
      setAllUsers(response.data.data.users);
      setIsPrintReady(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteConfirmation = async () => {
    if (deleteUserId) {
      try {
        await toast.promise(
          axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin-actions/delete-user/${deleteUserId}`,
            { headers: { Authorization: `Bearer ${state.token}` } },
          ),
          {
            loading: "Deleting User",
            success: (response) => {
              setFilteredUsers(
                filteredUsers.filter((user) => user._id !== deleteUserId),
              );
              setDeleteUserId(null);
              setTotalUsers(totalUsers - 1);
              return response.data.message;
            },
            error: (error) => error.response?.data?.message || error.message,
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Edit Handler
  function handleUpdateClick(user) {
    setUpdateUserId(user._id);
    setUpdateUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    });
  }

  // Edit Confirmation Handler
  const handleUpdateConfirmation = async () => {
    if (updateUserId && updateUserData) {
      try {
        await toast.promise(
          axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/admin-actions/update-user/${updateUserId}`,
            updateUserData,
            { headers: { Authorization: `Bearer ${state.token}` } },
          ),
          {
            loading: "Updating User",
            success: (response) => {
              setFilteredUsers(
                filteredUsers.map((user) =>
                  user._id === updateUserId
                    ? { ...user, ...updateUserData }
                    : user,
                ),
              );
              setUpdateUserId(null);
              setUpdateUserData(null);
              return response.data.message;
            },
            error: (error) => error.response?.data?.message || error.message,
          },
        );
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-10 lg:px-0">
      {/* Header Section */}
      <Title text="Users List" />
      <div className="flex items-center justify-between">
        <p className="mt-2 text-xs tracking-wide text-gray-500 md:text-base">
          These are the registered users in this platform
        </p>
        {/* Items Per Page Selector */}
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          handleItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <HorizontalBar />

      {/* Search and Actions Section */}
      <form onSubmit={handleSearch} className="relative mb-6 mt-4 flex gap-2">
        <div className="relative flex-1">
          <IoSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name, username, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-4 py-2 pl-10 pr-24 focus:border-gray-500 focus:outline-none"
          />
          {isSearched && (
            <IoIosCloseCircleOutline
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={handleSearchClose}
            />
          )}
        </div>
        <SearchButton onClick={handleSearch} disabled={loading} />
        <DownloadButton onClick={handleGeneratePDF} disabled={loading} />
      </form>

      {/* Users Table */}
      <table className="w-full text-left text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 md:text-base">
          <tr>
            <th className="w-[12%] px-3 py-2">First Name</th>
            <th className="w-[12%] px-3 py-2">Last Name</th>
            <th className="w-[15%] px-3 py-2">Username</th>
            <th className="w-[25%] px-3 py-2">Email</th>
            <th className="w-[8%] px-3 py-2">Favorites</th>
            <th className="w-[8%] px-3 py-2">Compares</th>
            <th className="w-[8%] px-3 py-2">Wishlist</th>
            <th className="w-[12%] px-3 py-2">Join Date</th>
            <th className="w-[5%] px-3 py-2 print:hidden">Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <UserListSkeleton itemsPerPage={itemsPerPage} />
          ) : filteredUsers?.length > 0 ? (
            <UserListData
              filteredUsers={filteredUsers}
              handleUpdateClick={handleUpdateClick}
              handleDeleteClick={handleDeleteClick}
            />
          ) : (
            <UserListError error={error} />
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        totalItems={totalUsers}
        onPageChange={handlePageChange}
      />

      {/* Delete Confirmation Modal */}
      {deleteUserId && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteUserId(null)}
          title="Delete User"
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDeleteConfirmation}
        >
          <p className="text-center text-gray-600">
            Are you sure you want to delete this user?
            <br />
            <span className="text-red-500">This action cannot be undone.</span>
          </p>
        </Modal>
      )}

      {/* PDF Preview (Hidden) */}
      {isPrintReady && (
        <UserListPrintReport
          pdfRef={pdfRef}
          allUsers={allUsers}
          isSearched={isSearched}
          searchTerm={searchTerm}
        />
      )}

      {/* Edit Modal */}
      {updateUserId && (
        <UpdateUserModal
          isOpen={true}
          onClose={() => setUpdateUserId(null)}
          onConfirm={handleUpdateConfirmation}
          updateUserData={updateUserData}
          setUpdateUserData={setUpdateUserData}
        />
      )}
    </div>
  );
};

export default UsersList;
