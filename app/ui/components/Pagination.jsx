import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { twMerge } from "tailwind-merge";

const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  className,
}) => {
  const newClassName = twMerge("flex items-end justify-between", className);
  return (
    <div className={newClassName}>
      {totalItems > 0 ? (
        <div className="text-sm text-gray-500 md:text-base">
          Showing {itemsPerPage * currentPage - itemsPerPage + 1} to{" "}
          {itemsPerPage * currentPage < totalItems
            ? itemsPerPage * currentPage
            : totalItems}{" "}
          of {totalItems} entries
        </div>
      ) : (
        <div className="text-sm text-gray-500 md:text-base">
          No entries found
        </div>
      )}
      <div>
        <ReactPaginate
          previousLabel={<FaArrowLeft className="text-sm md:text-base" />}
          nextLabel={<FaArrowRight className="text-sm md:text-base" />}
          pageCount={totalPages}
          onPageChange={onPageChange}
          forcePage={currentPage - 1}
          containerClassName="flex items-center justify-center mt-4 space-x-1"
          pageClassName="px-3 py-1 border border-gray-200 rounded-md bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
          previousClassName="flex items-center justify-center w-8 h-8 rounded-md bg-white text-gray-700 hover:bg-gray-100"
          nextClassName="flex items-center justify-center w-8 h-8 rounded-md bg-white text-gray-700 hover:bg-gray-100"
          breakClassName="px-3 py-1"
          activeClassName="!bg-black !text-white"
          disabledClassName="bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
          pageRangeDisplayed={3}
        />
      </div>
    </div>
  );
};

export default Pagination;
