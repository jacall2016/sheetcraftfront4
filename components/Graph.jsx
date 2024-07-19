import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(...registerables);

const defaultColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
];

const Graph = ({ data, columns }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [graphType, setGraphType] = useState('bar');
  const [xAxisLabel, setXAxisLabel] = useState('');
  const [yAxisLabel, setYAxisLabel] = useState('');
  const [graphTitle, setGraphTitle] = useState('');
  const [chartData, setChartData] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [datasetColors, setDatasetColors] = useState({});
  const [legendPosition, setLegendPosition] = useState('top');

  useEffect(() => {
    setSelectedColumns([]);
    setDatasetColors({});
  }, [data, columns]);

  const handleColumnSelection = (e) => {
    const column = e.target.value;
    setSelectedColumns(prevSelectedColumns => 
      e.target.checked ? [...prevSelectedColumns, column] : prevSelectedColumns.filter(col => col !== column)
    );
  };

  const handleColorChange = (e, column) => {
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
      backgroundColor: datasetColors[col] || defaultColors[index % defaultColors.length],
      borderColor: datasetColors[col] || defaultColors[index % defaultColors.length],
      borderWidth: 1
    }));

    setChartData({
      labels,
      datasets
    });
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: legendPosition,
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

  const renderChart = () => {
    if (!chartData) return null;

    const chartContainerStyle = {
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    return (
      <div style={chartContainerStyle}>
        {graphType === 'bar' && <Bar data={chartData} options={chartOptions} />}
        {graphType === 'line' && <Line data={chartData} options={chartOptions} />}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-start bg-primary bg-opacity-70">
      <div className="bg-primary bg-opacity-70 p-8 rounded-lg shadow-lg w-full max-w-4xl text-light">
        <h1 className="text-4xl font-heading mb-4">Generate Graphs</h1>
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
                    value={datasetColors[column] || defaultColors[index % defaultColors.length]}
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
          <div className="mb-4">
            <label className="block mb-2">Legend Position</label>
            <select
              onChange={(e) => setLegendPosition(e.target.value)}
              className="p-2 border rounded bg-light text-secondary"
            >
              <option value="top">Top</option>
              <option value="left">Left</option>
              <option value="bottom">Bottom</option>
              <option value="right">Right</option>
            </select>
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
      </div>
    </div>
  );
};

export default Graph;