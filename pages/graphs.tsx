import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Chart, registerables } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

Chart.register(...registerables);

const Graphs = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const [graphType, setGraphType] = useState<string>('bar');
  const [xAxisLabel, setXAxisLabel] = useState<string>('');
  const [yAxisLabel, setYAxisLabel] = useState<string>('');
  const [graphTitle, setGraphTitle] = useState<string>('');
  const [chartData, setChartData] = useState<any>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [datasetColors, setDatasetColors] = useState<{ [key: string]: string }>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryStr = event.target?.result;
        const workbook = XLSX.read(binaryStr, { type: 'binary' });

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
      };
      reader.readAsBinaryString(selectedFile);
    }
  };

  const handleColumnSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const column = e.target.value;
    setSelectedColumns(prevSelectedColumns =>
      e.target.checked ? [...prevSelectedColumns, column] : prevSelectedColumns.filter(col => col !== column)
    );
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, column: string) => {
    const color = e.target.value;
    setDatasetColors(prevColors => ({ ...prevColors, [column]: color }));
  };

  const handleGenerateGraph = () => {
    if (selectedColumns.length < 2) {
      setValidationError('Please select at least two columns for the graph.');
      return;
    }
    setValidationError(null);

    const labels = data.map(row => row[columns.indexOf(selectedColumns[0])]);
    const datasets = selectedColumns.slice(1).map((col, index) => ({
      label: col,
      data: data.map(row => row[columns.indexOf(col)]),
      backgroundColor: datasetColors[col] || `rgba(${50 * (index + 1)}, ${100 * (index + 1)}, ${150 * (index + 1)}, 0.5)`,
      borderColor: datasetColors[col] || `rgba(${50 * (index + 1)}, ${100 * (index + 1)}, ${150 * (index + 1)}, 1)`,
      borderWidth: 1
    }));

    setChartData({
      labels,
      datasets
    });
  };

  const renderChart = () => {
    if (!chartData) return null;

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as 'top' | 'center' | 'left' | 'right' | 'bottom' | 'chartArea', // Ensure position is correctly typed
        },
        title: {
          display: true,
          text: graphTitle,
        },
      },
      scales: {
        x: {
          title: {
            display: true,
            text: xAxisLabel,
          },
        },
        y: {
          title: {
            display: true,
            text: yAxisLabel,
          },
        },
      },
    };

    const chartContainerStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly transparent white background
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Slight shadow for better visibility
    };

    return (
      <div style={chartContainerStyle}>
        {graphType === 'bar' && <Bar data={chartData} options={options} />}
        {graphType === 'line' && <Line data={chartData} options={options} />}
        {graphType === 'pie' && <Pie data={chartData} options={options} />}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-24 bg-primary bg-opacity-70">
      <div className="bg-primary bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-4xl text-light">
        <h1 className="text-4xl font-heading mb-4">Generate Graphs</h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded bg-light text-secondary"
        />
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {file && !error && (
          <>
            <div className="mb-4">
              <h2 className="mb-2">Select Columns for Graph</h2>
              <div className="flex flex-wrap mb-4">
                {columns.map((column, index) => (
                  <label key={index} className="mr-4 mb-2">
                    <input
                      type="checkbox"
                      value={column}
                      onChange={handleColumnSelection}
                      className="mr-1"
                    />
                    {column}
                  </label>
                ))}
              </div>
              {validationError && <div className="text-red-600 mb-4">{validationError}</div>}
              <div className="mb-4">
                <h2 className="mb-2">Select Colors for Datasets</h2>
                <div className="flex flex-wrap mb-4">
                  {selectedColumns.slice(1).map((column, index) => (
                    <div key={index} className="flex items-center mr-4 mb-2">
                      <label className="mr-2">{column}:</label>
                      <input
                        type="color"
                        onChange={(e) => handleColorChange(e, column)}
                        value={datasetColors[column] || `#${Math.floor(Math.random()*16777215).toString(16)}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Select Graph Type</label>
                <select
                  onChange={(e) => setGraphType(e.target.value)}
                  className="p-2 border rounded bg-light text-secondary"
                >
                  <option value="bar">Bar</option>
                  <option value="line">Line</option>
                  <option value="pie">Pie</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-2">X-Axis Label</label>
                <input
                  type="text"
                  value={xAxisLabel}
                  onChange={(e) => setXAxisLabel(e.target.value)}
                  className="p-2 border rounded bg-light text-secondary w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Y-Axis Label</label>
                <input
                  type="text"
                  value={yAxisLabel}
                  onChange={(e) => setYAxisLabel(e.target.value)}
                  className="p-2 border rounded bg-light text-secondary w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Graph Title</label>
                <input
                  type="text"
                  value={graphTitle}
                  onChange={(e) => setGraphTitle(e.target.value)}
                  className="p-2 border rounded bg-light text-secondary w-full"
                />
              </div>
              <button
                onClick={handleGenerateGraph}
                className="p-2 rounded bg-highlight text-light font-bold"
              >
                Generate Graph
              </button>
            </div>
            <div className="mt-4 w-full">
              {renderChart()}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Graphs;
