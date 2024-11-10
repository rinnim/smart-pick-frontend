import { formatDateToMonthDayYear } from "@/app/utils/formatDate";
import { FaEdit, FaTrash } from "react-icons/fa";
import ActionButton from "./ActionButton";

const UsersTable = ({
  filteredUsers,
  handleUpdateClick,
  handleDeleteClick,
}) => {
  return (
    <>
      {filteredUsers.map((user) => (
        <tr key={user?._id} className="border-b bg-white hover:bg-gray-50">
          <td className="w-[12%] px-3 py-2">{user?.firstName}</td>
          <td className="w-[12%] px-3 py-2">{user?.lastName}</td>
          <td className="w-[15%] px-3 py-2">{user?.username}</td>
          <td className="w-[25%] px-3 py-2">{user?.email}</td>
          <td className="w-[8%] px-3 py-2">{user?.favoriteList?.length}</td>
          <td className="w-[8%] px-3 py-2">{user?.compares?.length}</td>
          <td className="w-[8%] px-3 py-2">{user?.wishlist?.length}</td>
          <td className="w-[12%] px-3 py-2">
            {formatDateToMonthDayYear(user?.createdAt)}
          </td>
          <td className="w-[5%] px-3 py-2 text-center print:hidden">
            <div className="flex justify-center gap-2">
              <ActionButton
                onClick={() => handleUpdateClick(user)}
                className="text-blue-400 hover:text-blue-600"
              >
                <FaEdit />
              </ActionButton>
              <ActionButton
                onClick={() => handleDeleteClick(user?._id)}
                className="text-red-400 hover:text-red-600"
              >
                <FaTrash />
              </ActionButton>
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default UsersTable;
