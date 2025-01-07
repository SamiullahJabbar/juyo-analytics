import React from "react";
import AppLayout from "../../components/Layout/AppLayout";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { Select, Button } from "antd";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice"; // Correct import for darkMode

const data = [
  { name: "Jan", Revenue: 10 },
  { name: "Feb", Revenue: 20 },
  { name: "Mar", Revenue: 40 },
  { name: "Apr", Revenue: 150 },
  { name: "May", Revenue: 130 },
  { name: "Jun", Revenue: 100 },
  { name: "Jul", Revenue: 110 },
  { name: "Aug", Revenue: 120 },
  { name: "Sep", Revenue: 130 },
  { name: "Oct", Revenue: 140 },
  { name: "Nov", Revenue: 90 },
  { name: "Dec", Revenue: 50 },
];

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Hotel Name",
    dataIndex: "accomodation",
    key: "accomodation",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Occupation",
    dataIndex: "occupation",
    key: "occupation",
  },
  {
    title: "ADR",
    dataIndex: "adr",
    key: "adr",
  },
  {
    title: "RevPAR",
    dataIndex: "revpar",
    key: "revpar",
  },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
  },
];

const data1: DataType[] = [
  {
    key: "1",
    date: "2025-01-01",
    revpar: 45,
    accomodation: "New York No. 1 Lake Park",
    revenue: "$1200",
    adr: 120,
    occupation: "90%",
  },
  {
    key: "2",
    date: "2025-01-02",
    revpar: 50,
    accomodation: "Los Angeles No. 2 Beach Avenue",
    revenue: "$1500",
    adr: 130,
    occupation: "85%",
  },
  {
    key: "3",
    date: "2025-01-03",
    revpar: 40,
    accomodation: "Chicago No. 3 Riverwalk",
    revenue: "$1100",
    adr: 110,
    occupation: "88%",
  },
  {
    key: "4",
    date: "2025-01-04",
    revpar: 55,
    accomodation: "San Francisco No. 4 Golden Gate",
    revenue: "$1700",
    adr: 140,
    occupation: "92%",
  },
  {
    key: "5",
    date: "2025-01-05",
    revpar: 35,
    accomodation: "Seattle No. 5 Pine Street",
    revenue: "$900",
    adr: 100,
    occupation: "80%",
  },
  {
    key: "6",
    date: "2025-01-06",
    revpar: 48,
    accomodation: "Miami No. 6 Ocean Drive",
    revenue: "$1400",
    adr: 125,
    occupation: "89%",
  },
  {
    key: "7",
    date: "2025-01-07",
    revpar: 60,
    accomodation: "Boston No. 7 Beacon Hill",
    revenue: "$1800",
    adr: 150,
    occupation: "95%",
  },
  {
    key: "8",
    date: "2025-01-08",
    revpar: 42,
    accomodation: "Denver No. 8 Rocky Road",
    revenue: "$1300",
    adr: 115,
    occupation: "87%",
  },
  {
    key: "9",
    date: "2025-01-09",
    revpar: 37,
    accomodation: "Austin No. 9 Lone Star",
    revenue: "$1000",
    adr: 105,
    occupation: "82%",
  },
  {
    key: "10",
    date: "2025-01-10",
    revpar: 52,
    accomodation: "Washington No. 10 Capitol Hill",
    revenue: "$1600",
    adr: 135,
    occupation: "93%",
  },
];

export default function Reports() {
  const darkMode = useSelector(selectDarkMode); // Get darkMode state

  return (
    <AppLayout
      Children={
        <div className={`p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen`}>
          <h1 className="text-2xl font-bold mb-4">
            Reports / Revenue per Available Rooms
          </h1>
          {/* Filter Section */}
          <div className={` p-4 rounded-lg shadow-md mb-6 ${darkMode ? 'bg-gray-900 ' : 'bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}` }>Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Select
                placeholder="Year"
                className="w-full"
                options={[{ value: "2024", label: "2024" }]}
              />
              <Select
                placeholder="Compare with"
                className="w-full"
                options={[{ value: "Year", label: "Year" }]}
              />
              <Select
                placeholder="Room Types"
                className="w-full"
                options={[{ value: "All Room Types", label: "All Room Types" }]}
              />
              <Select
                placeholder="Reservation Source"
                className="w-full"
                options={[{ value: "All Channels", label: "All Channels" }]}
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button type="primary">Apply</Button>
              <Button>Clear</Button>
            </div>
          </div>
          {/* Chart Section */}
          <div className={` p-6 rounded-lg shadow-md ${darkMode ? 'bg-gray-900 ' : 'bg-white'}`}>
            <h2 className={`text-lg font-semibold mb-4  ${darkMode ? 'text-white' : 'text-black'} `  } >
              Revenue per Available Rooms
            </h2>
            <LineChart width={1500} height={400} data={data}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Revenue" stroke="#8884d8" />
            </LineChart>
          </div>
          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-4">
              <Button type="primary">Export To</Button>
            </div>
            <div className="flex gap-2">
              <Button>Day</Button>
              <Button>Week</Button>
              <Button type="primary">Month</Button>
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4 p-4">
            Revenue per Available room
          </h1>
          <Table<DataType> columns={columns} dataSource={data1} className={` ${darkMode ? 'bg-gray-900 ' : 'bg-white'}`}  />
        </div>
      }
    />
  );
}
