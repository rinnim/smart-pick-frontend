import ProductNotFound from "./ProductNotFound";

const UserListError = ({ error }) => {
  return (
    <tr>
      <td colSpan="9" className="px-3 py-4 text-center text-gray-500">
        <ProductNotFound title={error} />
      </td>
    </tr>
  );
};

export default UserListError;
