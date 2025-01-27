import React, { useState } from "react";
import AppLayout from "../../components/Layout/AppLayout";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice";

const CurrencyScreen = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("PKR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [convertedAmount, setConvertedAmount] = useState();

  // Static conversion rates (relative to 1 PKR)
  const conversionRates = {
    PKR: 1,
    USD: 0.0036,
    EURO: 0.0033,
    GBP: 0.0028,
    JPY: 0.53,
    SAR: 0.0135,
    KWD: 0.0011,
  };

  // Function to handle conversion
  const convertCurrency = () => {
    const fromRate = conversionRates[fromCurrency];
    const toRate = conversionRates[toCurrency];
    const result = (amount / fromRate) * toRate;
    setConvertedAmount(result.toFixed(4));
  };

  const darkMode = useSelector(selectDarkMode); // Get darkMode state

  return (
    <AppLayout
      Children={
        <div
          className={`min-h-screen bg-gradient-to-r ${darkMode ? 'from-gray-900 via-gray-800 to-gray-900' : 'from-blue-100 via-white to-blue-100'} flex flex-col items-center justify-start py-10 ${darkMode ? 'dark' : ''}`}
        >
          {/* Header Section */}
          <header className={`w-full py-6 text-center ${darkMode ? 'bg-blue-900' : 'bg-blue-500'} text-white`}>
            <h1 className="text-4xl font-bold">Currency Converter</h1>
            <p className="text-lg mt-2">Convert currencies instantly and effortlessly</p>
          </header>

          {/* Converter Section */}
          <main className={`w-full max-w-4xl mt-10 p-8 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
            <h2 className={`text-2xl font-bold text-center mb-8 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              Convert Your Currency
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amount Input */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Enter Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  placeholder="Enter amount"
                />
              </div>

              {/* Currency Selection */}
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    From Currency
                  </label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  >
                    {Object.keys(conversionRates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex-1">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    To Currency
                  </label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className={`w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                  >
                    {Object.keys(conversionRates).map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Convert Button */}
            <div className="mt-6">
              <button
                onClick={convertCurrency}
                className={`w-full py-3 px-6 rounded-lg transition duration-200 ${darkMode ? 'bg-blue-700 hover:bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
              >
                Convert
              </button>
            </div>

            {/* Result */}
            <div className={`mt-8 p-6 rounded-lg text-center ${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-blue-50 text-gray-700'}`}>
              <p className="text-xl font-semibold">
                {amount} {fromCurrency} ={" "}
                <span className={`${darkMode ? 'text-blue-400' : 'text-blue-500'} font-bold`}>
                  {convertedAmount} {toCurrency}
                </span>
              </p>
            </div>
          </main>
        </div>
      }
    />
  );
};

export default CurrencyScreen;
