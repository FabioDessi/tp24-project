interface PaginationProps {
  dataLength: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  rowsPerPageOptions: number[];
}

const Pagination: React.FC<PaginationProps> = ({
  dataLength,
  currentPage,
  setCurrentPage,
  rowsPerPage,
  setRowsPerPage,
  rowsPerPageOptions,
}) => {
  const totalPages = Math.ceil(dataLength / rowsPerPage);

  return (
    <div className="flex justify-between items-center mt-4">
      <div>
        <label htmlFor="rowsPerPage" className="mr-2">
          Rows per page:
        </label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="border rounded-md p-1"
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="mx-2">
          {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
