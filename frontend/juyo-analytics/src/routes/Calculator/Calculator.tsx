import React, { useState } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import { AiOutlineEnter, AiOutlineClear, AiOutlineCalculator } from 'react-icons/ai';
import { RiCurrencyLine, RiExchangeLine, RiPercentLine } from 'react-icons/ri';
import { Line } from 'react-chartjs-2'; // Importing Line component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement, // Import for line graph
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement);

export default function EnhancedCalculatorPage() {
  const [input, setInput] = useState<string>(''); // State for calculator input
  const [result, setResult] = useState<number | null>(null); // State for result
  const [currencyInput, setCurrencyInput] = useState<string>(''); // State for currency input
  const [unitInput, setUnitInput] = useState<string>(''); // State for unit input
  const [percentageInput, setPercentageInput] = useState<string>(''); // State for percentage input
  const [percentageValue, setPercentageValue] = useState<number | null>(null);

  const [currentTab, setCurrentTab] = useState<string>('calculator'); // Active tab
  const [graphData, setGraphData] = useState<number[]>([]); // Data for graph

  // Input Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => setCurrencyInput(e.target.value);
  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => setUnitInput(e.target.value);
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => setPercentageInput(e.target.value);

  // Calculator Logic
  const handleEvaluate = () => {
    try {
      if (!input.trim()) throw new Error('Input is required');
      const calculatedResult = eval(input);
      setResult(calculatedResult);
      setGraphData([...graphData, calculatedResult]); // Add to graph data
    } catch (error) {
      setResult(null);
      alert('Invalid calculation. Please check your input.');
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setGraphData([]);
  };

  // Conversion Logic
  const calculateCurrencyConversion = () => {
    try {
      if (!currencyInput.trim()) throw new Error('Currency input is required');
      const value = parseFloat(currencyInput);
      if (isNaN(value)) throw new Error('Invalid currency input');
      const convertedValue = (value * 0.84).toFixed(2); // Example: USD to EUR
      setGraphData([...graphData, parseFloat(convertedValue)]);
      return convertedValue;
    } catch (error) {
      alert(error.message);
      return 'N/A';
    }
  };

  const calculateUnitConversion = () => {
    try {
      if (!unitInput.trim()) throw new Error('Unit input is required');
      const value = parseFloat(unitInput);
      if (isNaN(value)) throw new Error('Invalid unit input');
      const convertedValue = (value * 2.54).toFixed(2); // Example: inches to cm
      setGraphData([...graphData, parseFloat(convertedValue)]);
      return convertedValue;
    } catch (error) {
      alert(error.message);
      return 'N/A';
    }
  };

  const calculatePercentage = () => {
    try {
      if (!percentageInput.trim() || result === null) throw new Error('Valid inputs are required');
      const value = parseFloat(percentageInput);
      if (isNaN(value)) throw new Error('Invalid percentage input');
      const calculatedValue = (value * result) / 100;
      setPercentageValue(calculatedValue);
      setGraphData([...graphData, calculatedValue]);
    } catch (error) {
      alert(error.message);
      setPercentageValue(null);
    }
  };

  // Graph Configuration for Bar and Line

  const lineChartData = {
    labels: graphData.map((_, index) => `Result ${index + 1}`),
    datasets: [
      {
        label: 'Calculation/Conversion Results (Line)',
        data: graphData,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Calculation Results Graph' },
    },
  };

  return (
    <AppLayout
      Children={
        <div className="h-full p-6 bg-gradient-to-r from-indigo-100 to-purple-100 flex-1">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800">Enhanced Calculator with Graphs</h1>
            <p className="text-lg text-gray-600 mt-2">
              Perform calculations and view results graphically for better analysis.
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center sm:justify-between my-6">
            {['calculator', 'currency', 'unit', 'percentage'].map((tab) => (
              <button
                key={tab}
                className={`flex items-center px-4 py-2 text-sm font-medium ${
                  currentTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                } rounded-lg hover:bg-blue-600 mb-2 sm:mb-0`}
                onClick={() => setCurrentTab(tab)}
              >
                {tab === 'calculator' && <AiOutlineCalculator className="mr-2" />}
                {tab === 'currency' && <RiCurrencyLine className="mr-2" />}
                {tab === 'unit' && <RiExchangeLine className="mr-2" />}
                {tab === 'percentage' && <RiPercentLine className="mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1)} Converter
              </button>
            ))}
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
            {currentTab === 'calculator' && (
              <div>
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Enter calculation (e.g., 2+2)"
                  className="w-full text-lg p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                {result !== null && (
                  <div className="mt-2 text-xl font-semibold text-gray-700">
                    Result: <span className="text-blue-600">{result}</span>
                  </div>
                )}
                <div className="flex flex-wrap justify-between mt-4">
                  <button
                    onClick={handleClear}
                    className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 mb-2 sm:mb-0"
                  >
                    <AiOutlineClear className="mr-2" /> Clear
                  </button>
                  <button
                    onClick={handleEvaluate}
                    className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                  >
                    <AiOutlineEnter className="mr-2" /> Calculate
                  </button>
                </div>
              </div>
            )}

            {currentTab === 'currency' && (
              <div>
                <input
                  type="text"
                  value={currencyInput}
                  onChange={handleCurrencyChange}
                  placeholder="Enter amount in USD"
                  className="w-full text-lg p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 text-xl font-semibold text-gray-700">
                  Equivalent in EUR: <span className="text-green-600">${calculateCurrencyConversion()}</span>
                </div>
              </div>
            )}

            {currentTab === 'unit' && (
              <div>
                <input
                  type="text"
                  value={unitInput}
                  onChange={handleUnitChange}
                  placeholder="Enter length in inches"
                  className="w-full text-lg p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-2 text-xl font-semibold text-gray-700">
                  Equivalent in cm: <span className="text-green-600">{calculateUnitConversion()}</span>
                </div>
              </div>
            )}

            {currentTab === 'percentage' && (
              <div>
                <input
                  type="text"
                  value={percentageInput}
                  onChange={handlePercentageChange}
                  placeholder="Enter percentage value"
                  className="w-full text-lg p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={calculatePercentage}
                  className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                  Calculate
                </button>
                {percentageValue !== null && (
                  <div className="mt-2 text-xl font-semibold text-gray-700">
                    {percentageInput}% of {result} is: <span className="text-green-600">{percentageValue}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Graph Display */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Graphical Representation</h2>

            <div>
              <Line data={lineChartData} options={chartOptions} /> {/* Add Line Graph */}
            </div>
          </div>
        </div>
      }
    />
  );
}
