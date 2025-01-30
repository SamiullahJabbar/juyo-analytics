import React, { useState } from "react";
import { DatePicker, Radio, Select, Button, Table } from "antd";
import AppLayout from "../../components/Layout/AppLayout";
import dayjs from "dayjs";
import "tailwindcss/tailwind.css";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice";

const { RangePicker } = DatePicker;
const { Option } = Select;

export default function Forecast() {
  const [dateRange, setDateRange] = useState([dayjs(), dayjs().add(3, "month")]);
  const [selectedOption, setSelectedOption] = useState("Rate Plan");
  const [ratePlan, setRatePlan] = useState("Best Available Rate");
  const darkMode = useSelector(selectDarkMode);

  // State for managing months dynamically (only update, no add/remove)
  const [months, setMonths] = useState([
    dayjs("2025-01-01"),
    dayjs("2024-02-01"),
    dayjs("2023-03-01"),
    dayjs("2022-04-01"),
  ]);

  const columns = [
    {
      title: "Date",
      dataIndex: "month",
      key: "month",
    },
    ...Array.from({ length: 31 }, (_, i) => ({
      title: i + 1,
      dataIndex: `day${i + 1}`,
      key: `day${i + 1}`,
    })),
  ];

  // Generate table data dynamically
  const data = months.map((month, index) => ({
    key: index,
    month: (
      <div className="flex items-center gap-2">
        <button
          className="text-lg sm:text-base text-red-500 font-bold"
          onClick={() => updateMonth(index, -1)}
        >
          -
        </button>
        {month.format("MMM YYYY")}
        <button
          className="text-lg sm:text-base text-green-500 font-bold"
          onClick={() => updateMonth(index, 1)}
        >
          +
        </button>
      </div>
    ),
    ...Object.fromEntries(
      Array.from({ length: 31 }, (_, i) => [`day${i + 1}`, Math.floor(Math.random() * 100) + 50])
    ),
  }));

  // Function to update an existing month (shift forward or backward)
  const updateMonth = (index: number, direction: number) => {
    setMonths((prev) =>
      prev.map((m, i) => (i === index ? m.add(direction, "month") : m))
    );
  };

  return (
    <AppLayout
      Children={
        <div className={`p-4 sm:p-6 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}  >
          <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-700"}`}>
            Rates
          </h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Room Rates</p>

          {/* Form Section */}
          <div className={`p-4 sm:p-6 mt-4 shadow-md rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`} style={{width:"50%"}} >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
              <div>
                <label className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Date Range *
                </label>
                <RangePicker
                  className="w-full"
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates)}
                />
              </div>
              <div>
                <label className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Rate Plan *
                </label>
                <Select className="w-full" value={ratePlan} onChange={setRatePlan}>
                  <Option value="Best Available Rate">Best Available Rate</Option>
                  <Option value="Discount Rate">Discount Rate</Option>
                </Select>
              </div>
            </div>

            {/* Radio Buttons */}
            <div className="mt-4">
              <Radio.Group
                className="flex flex-wrap gap-2"
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <Radio value="Room" className={`${darkMode ? "text-white" : "text-gray-800"}`}>Room</Radio>
                <Radio value="Rate Plan" className={`${darkMode ? "text-white" : "text-gray-800"}`}>Rate Plan</Radio>
                <Radio value="Rate Plan Category" className={`${darkMode ? "text-white" : "text-gray-800"}`}>Rate Plan Category</Radio>
              </Radio.Group>
            </div>

            {/* Search Button */}
            <div className="mt-4 flex justify-end">
              <Button type="primary" className="px-6 w-full sm:w-auto">
                Search
              </Button>
            </div>
          </div>

          {/* Table Section */}
          <div className={`mt-6 p-4 shadow-md rounded-lg overflow-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`} style={{ width: "80%" }}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ x: "max-content" }}
              className="overflow-x-auto"
            />
          </div>
        </div>
      }
    />
  );
}
