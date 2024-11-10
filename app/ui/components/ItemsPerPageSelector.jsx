const ItemsPerPageSelector = ({ itemsPerPage, handleItemsPerPageChange }) => {
  return (
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
  );
};

export default ItemsPerPageSelector;
