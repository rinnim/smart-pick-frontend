import { formatDateToMonthDayYear } from "@/app/utils/formatDate";

const UserListPrintReport = ({ pdfRef, allUsers, isSearched, searchTerm }) => {
  return (
    <div ref={pdfRef} className="hidden print:block">
      {/* PDF Header */}
      <div className="mb-4 flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Users List</h1>
          <p className="text-sm text-gray-500">
            Generated on {formatDateToMonthDayYear(new Date())}
          </p>
          {isSearched && (
            <p className="text-sm text-gray-500">
              Search results for: "{searchTerm}" (Found {allUsers.length} users)
            </p>
          )}
        </div>
        <div className="flex flex-col items-end">
          <h1 className="text-xl font-bold">Smart Pick</h1>
          <p className="text-sm text-gray-500">Find the best price</p>
        </div>
      </div>

      {/* PDF Table */}
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">First Name</th>
            <th className="border border-gray-300 p-2">Last Name</th>
            <th className="border border-gray-300 p-2">Username</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Favorites</th>
            <th className="border border-gray-300 p-2">Compares</th>
            <th className="border border-gray-300 p-2">Wishlist</th>
            <th className="border border-gray-300 p-2">Join Date</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user?._id} className="even:bg-gray-50">
              <td className="border border-gray-300 p-2">{user?.firstName}</td>
              <td className="border border-gray-300 p-2">{user?.lastName}</td>
              <td className="border border-gray-300 p-2">{user?.username}</td>
              <td className="border border-gray-300 p-2">{user?.email}</td>
              <td className="border border-gray-300 p-2">
                {user?.favoriteList?.length}
              </td>
              <td className="border border-gray-300 p-2">
                {user?.compares?.length}
              </td>
              <td className="border border-gray-300 p-2">
                {user?.wishlist?.length}
              </td>
              <td className="border border-gray-300 p-2">
                {formatDateToMonthDayYear(user?.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PDF Footer */}
      <div className="mt-4 text-sm text-gray-500">
        Total Users: {allUsers.length}
      </div>
    </div>
  );
};

export default UserListPrintReport;
