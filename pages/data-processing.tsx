import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Filter from '../components/Filter';

const DataProcessingPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showGraph, setShowGraph] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });

        // Safety check: Reject the file if it has more than one sheet
        if (workbook.SheetNames.length > 1) {
          setError('The uploaded Excel file has more than one sheet. Please upload a file with only one sheet.');
          setFile(null);
          setData([]);
          setColumns([]);
          return;
        }

        setError(null);
        setFile(selectedFile);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const headers = jsonData[0] as string[];
        const rows = jsonData.slice(1) as any[];

        setColumns(headers);
        setData(rows);
        setFilteredData(rows); // Initialize filtered data with original data
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleFilterChange = (newFilteredData: any[]) => {
    setFilteredData(newFilteredData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-primary bg-opacity-70">
      <div className="bg-primary bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-4xl text-light">
        <h1 className="text-4xl font-heading mb-8">Data Processing</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded bg-light text-secondary"
        />
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {file && !error && (
          <div className="mb-4">
            <label className="block mb-2">Select Options</label>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="filter"
                checked={showFilter}
                onChange={(e) => setShowFilter(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="filter">Filter Data</label>
            </div>
          </div>
        )}
        {showFilter && data.length > 0 && (
          <Filter data={data} columns={columns} onFilterChange={handleFilterChange} />
        )}
      </div>
    </div>
  );
};

export default DataProcessingPage;
