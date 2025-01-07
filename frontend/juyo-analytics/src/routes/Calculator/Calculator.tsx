import React, { useState } from 'react';
import AppLayout from '../../components/Layout/AppLayout';
import { AiOutlineEnter, AiOutlineClear } from 'react-icons/ai';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

export default function HotelRevenueCalculator() {
  const [rooms, setRooms] = useState<{ id: number; name: string; revenue: string }[]>([
    { id: 1, name: 'Room 1', revenue: '' },
  ]);
  const [additionalRevenue, setAdditionalRevenue] = useState<string>('')
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null)
  const [graphData, setGraphData] = useState<number[]>([]);

  const handleRoomRevenueChange = (id: number, value: string) => {
    setRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, revenue: value } : room))
    );
  };

  const handleAddRoom = () => {
    setRooms((prev) => [
      ...prev,
      { id: prev.length + 1, name: `Room ${prev.length + 1}`, revenue: '' },
    ]);
    toast.success('New room added successfully!');
  };

  // Calculate total revenue
  const calculateRevenue = () => {
    try {
      const roomTotal = rooms.reduce((sum, room) => {
        const revenue = parseFloat(room.revenue);
        if (isNaN(revenue)) throw new Error(`Invalid revenue for ${room.name}.`);
        return sum + revenue;
      }, 0);
      const additional = parseFloat(additionalRevenue) || 0;

      const total = roomTotal + additional;
      setTotalRevenue(total);
      setGraphData([...graphData, total]); 
      toast.success(`Total revenue calculated: $${total}`);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleClear = () => {
    setRooms([{ id: 1, name: 'Room 1', revenue: '' }]);
    setAdditionalRevenue('');
    setTotalRevenue(null);
    setGraphData([]);
    toast.info('All inputs and graph data cleared!');
  };

  const lineChartData = {
    labels: graphData.map((_, index) => `Calculation ${index + 1}`),
    datasets: [
      {
        label: 'Total Revenue',
        data: graphData,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Hotel Revenue Graph' },
    },
  };

  return (
    <AppLayout
      Children={
        <div className="h-full p-6 bg-gradient-to-r from-indigo-100 to-purple-100 flex-1">
          <ToastContainer position="top-right" autoClose={3000} />
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800">Hotel Revenue Calculator</h1>
            <p className="text-lg text-gray-600 mt-2">
              Calculate your hotel's total revenue and analyze it graphically.
            </p>
          </div>
          <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
            {rooms.map((room) => (
              <div key={room.id} className="mt-4">
                <label className="block text-gray-700 text-lg font-medium mb-2">
                  {room.name} Revenue (USD)
                </label>
                <input
                  type="text"
                  value={room.revenue}
                  onChange={(e) => handleRoomRevenueChange(room.id, e.target.value)}
                  placeholder={`Enter revenue for ${room.name}`}
                  className="w-full text-lg p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
            <button
              onClick={handleAddRoom}
              className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
            >
              Add Room
            </button>

            <div className="mt-4">
              <label className="block text-gray-700 text-lg font-medium mb-2">
                Additional Revenue (USD)
              </label>
              <input
                type="text"
                value={additionalRevenue}
                onChange={(e) => setAdditionalRevenue(e.target.value)}
                placeholder="Enter additional revenue"
                className="w-full text-lg p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {totalRevenue !== null && (
              <div className="mt-4 text-xl font-semibold text-gray-700">
                Total Revenue: <span className="text-green-600">${totalRevenue}</span>
              </div>
            )}

            <div className="flex flex-wrap justify-between mt-6">
              <button
                onClick={handleClear}
                className="flex items-center px-6 py-3 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 mb-2 sm:mb-0"
              >
                <AiOutlineClear className="mr-2" /> Clear
              </button>
              <button
                onClick={calculateRevenue}
                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              >
                <AiOutlineEnter className="mr-2" /> Calculate
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Graphical Representation</h2>
            <div>
              <Line data={lineChartData} options={chartOptions} />
            </div>
          </div>
        </div>
      }
    />
  );
}
