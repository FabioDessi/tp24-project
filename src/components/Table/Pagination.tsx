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
        <label htmlFor="rowsPerPage">Rows per page:</label>
        <select
          id="rowsPerPage"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
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
        >
          Previous
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
