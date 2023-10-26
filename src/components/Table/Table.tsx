import { useState } from 'react';
import Pagination from './Pagination';

export interface Column<DataType> {
  id: keyof DataType;
  label: string;
  render?: (row: DataType) => JSX.Element;
}

interface TableProps<DataType> {
  data: DataType[];
  columns: Column<DataType>[];
  rowsPerPageOptions?: number[];
  defaultRowsPerPage?: number;
}

const Table = <DataType extends { [K in keyof DataType]: unknown }>({
  data,
  columns,
  rowsPerPageOptions = [5, 10, 25],
  defaultRowsPerPage = 5,
}: TableProps<DataType>) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (data.length === 0) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <table className="min-w-full bg-white border-collapse">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={column.id as string}
                className="py-2 px-3 border border-gray-300"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex % 2 === 0 ? 'bg-gray-50' : ''}
            >
              {columns.map((column) => (
                <td
                  key={column.id as string}
                  className="py-1 px-3 border border-gray-300"
                >
                  {column.render
                    ? column.render(row)
                    : (row[column.id] as string)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        dataLength={data.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
      />
    </div>
  );
};

export default Table;
