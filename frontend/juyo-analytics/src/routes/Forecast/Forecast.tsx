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

  const data = [
    { month: "Jan 2025", ...Array.from({ length: 31 }, (_, i) => ({ [`day${i + 1}`]: 70 })) },
    { month: "Feb 2025", ...Array.from({ length: 31 }, (_, i) => ({ [`day${i + 1}`]: 80 })) },
    { month: "Mar 2025", ...Array.from({ length: 31 }, (_, i) => ({ [`day${i + 1}`]: 75 })) },
    { month: "Apr 2025", ...Array.from({ length: 31 }, (_, i) => ({ [`day${i + 1}`]: 130 })) },
  ];

  return (
    <AppLayout
      Children={
        <div className={`p-6 min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
          <h2 className={`text-2xl font-semibold ${darkMode ? "text-white" : "text-gray-700"}`}>Rates</h2>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Room Rates</p>

          <div className={`p-6 mt-4 shadow-md rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Date Range *</label>
                <RangePicker
                  className="w-full"
                  value={dateRange}
                  onChange={(dates) => setDateRange(dates)}
                />
              </div>
              <div>
                <label className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Rate Plan *</label>
                <Select
                  className="w-full"
                  value={ratePlan}
                  onChange={setRatePlan}
                >
                  <Option value="Best Available Rate">Best Available Rate</Option>
                  <Option value="Discount Rate">Discount Rate</Option>
                </Select>
              </div>
            </div>

            <div className="mt-4">
              <Radio.Group
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
              >
                <Radio value="Room" className={`${darkMode ? "text-white" : "text-gray-800"}`}>Room</Radio>
                <Radio value="Rate Plan" className={`${darkMode ? "text-white" : "text-gray-800"}`}>Rate Plan</Radio>
                <Radio value="Rate Plan Category" className={`${darkMode ? "text-white" : "text-gray-800"}`}>Rate Plan Category</Radio>
              </Radio.Group>
            </div>

            <div className="mt-4 flex justify-end">
              <Button type="primary" className="px-6">Search</Button>
            </div>
          </div>

          <div className={`mt-6 p-4 shadow-md rounded-lg overflow-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      }
    />
  );
}
