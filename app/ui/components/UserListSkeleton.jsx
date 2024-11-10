const UserListSkeleton = ({ itemsPerPage }) => {
  return (
    <>
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <tr key={index} className="animate-pulse border-b bg-white">
          <td className="px-3 py-3">
            <div className="h-4 w-[75%] rounded bg-gray-200" />
          </td>
          <td className="px-3 py-3">
            <div className="h-4 w-[70%] rounded bg-gray-200" />
          </td>
          <td className="px-3 py-3">
            <div className="h-4 w-[35%] rounded bg-gray-200" />
          </td>
          <td className="px-3 py-3">
            <div className="h-4 w-[75%] rounded bg-gray-200" />
          </td>
          <td className="px-3 py-3">
            <div className="h-4 w-[25%] rounded bg-gray-200" />
          </td>
          <td className="px-3 py-3">
            <div className="h-4 w-[25%] rounded bg-gray-200" />
          </td>
          <td className="px-3 py-3">
            <div className="h-4 w-[25%] rounded bg-gray-200" />
          </td>
          <td className="px-3 py-3">
            <div className="h-4 w-[55%] rounded bg-gray-200" />
          </td>
          <td className="flex justify-center items-center gap-2 px-3 py-3">
            <div className="h-4 w-4 rounded bg-gray-200" />
            <div className="h-4 w-4 rounded bg-gray-200" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default UserListSkeleton;
