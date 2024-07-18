import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';

interface FilterProps {
  data: any[];
  columns: string[];
  onFilterChange: (filteredData: any[]) => void;
}

const Filter: React.FC<FilterProps> = ({ data, columns, onFilterChange }) => {
  const [filteredData, setFilteredData] = useState<any[]>(data);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortColumn, setSortColumn] = useState<string>('');
  const [filterColumn, setFilterColumn] = useState<string>('');
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const applyFiltersAndSort = () => {
    let updatedData = [...data];

    if (filterColumn && filterValue) {
      updatedData = updatedData.filter(row => 
        row[columns.indexOf(filterColumn)] != null &&
        row[columns.indexOf(filterColumn)].toString().toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (sortColumn) {
      updatedData.sort((a, b) => {
        if (a[columns.indexOf(sortColumn)] < b[columns.indexOf(sortColumn)]) return sortOrder === 'asc' ? -1 : 1;
        if (a[columns.indexOf(sortColumn)] > b[columns.indexOf(sortColumn)]) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(updatedData);
    onFilterChange(updatedData);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [sortOrder, sortColumn, filterColumn, filterValue, data]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortColumn(e.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleFilterColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterColumn(e.target.value);
  };

  const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleDownload = () => {
    const fullData = [columns, ...filteredData];
    const worksheet = XLSX.utils.aoa_to_sheet(fullData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, 'filtered_data.xlsx');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-primary bg-opacity-70">
      <div className="bg-primary bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-4xl text-light">
        <h1 className="text-4xl font-heading mb-4">Filter Data</h1>
        <div className="mb-4">
          <h2 className="mb-2">Filter Data</h2>
          <div className="flex items-center mb-2">
            <select
              onChange={handleFilterColumnChange}
              className="p-2 border rounded bg-light text-secondary mr-2"
            >
              <option value="">Select column to filter by</option>
              {columns.map((column, index) => (
                <option key={index} value={column}>
                  {column}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filter value"
              onChange={handleFilterValueChange}
              className="p-2 border rounded bg-light text-secondary"
            />
          </div>
        </div>
        <div className="mb-4">
          <h2 className="mb-2">Sort Data</h2>
          <div className="flex items-center mb-2">
            <label className="mr-2">Sort Order:</label>
            <input
              type="checkbox"
              checked={sortOrder === 'desc'}
              onChange={handleSortOrderChange}
              className="mr-2"
            />
            <label>{sortOrder === 'asc' ? 'Ascending' : 'Descending'}</label>
          </div>
          <select
            onChange={handleSortChange}
            className="p-2 border rounded bg-light text-secondary"
          >
            <option value="">Select column to sort by</option>
            {columns.map((column, index) => (
              <option key={index} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={handleDownload}
          className="p-2 rounded bg-highlight text-light font-bold"
        >
          Download
        </button>
        <div className="mt-4 overflow-auto max-h-96 w-full">
          <h2 className="mb-2">Filtered Data</h2>
          <table className="min-w-full bg-white text-secondary">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="border px-4 py-2">{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="border px-4 py-2">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Filter;
