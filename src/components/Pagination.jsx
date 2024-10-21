import { useContext } from "react";
import { PaginationContext } from "./PaginationContext";

const Pagination = () => {
  const { currentPage, setCurrentPage, totalPages } =
    useContext(PaginationContext);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-around items-center mt-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
      >
        Previous
      </button>
      <span className="mx-4">Page {currentPage}</span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:bg-gray-400"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
