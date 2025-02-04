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
  ResponsiveContainer,
} from "recharts";
import { Select, Button } from "antd";
import { Table } from "antd";
import type { TableProps } from "antd";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice";

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
  name?: string;
  age?: number;
  address?: string;
  tags?: string[];
  date: string;
  revpar: number;
  accomodation: string;
  revenue: string;
  adr: number;
  occupation: string;
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
    { key: "1", date: "2025-01-01", revpar: 45, accomodation: "Hotel A", revenue: "$1200", adr: 120, occupation: "90%" },
    { key: "2", date: "2025-01-02", revpar: 50, accomodation: "Hotel B", revenue: "$1500", adr: 130, occupation: "85%" },
    { key: "3", date: "2025-01-03", revpar: 55, accomodation: "Hotel C", revenue: "$1600", adr: 140, occupation: "80%" },
    { key: "4", date: "2025-01-04", revpar: 60, accomodation: "Hotel D", revenue: "$1700", adr: 150, occupation: "75%" },
    { key: "5", date: "2025-01-05", revpar: 65, accomodation: "Hotel E", revenue: "$1800", adr: 160, occupation: "95%" },
    { key: "6", date: "2025-01-06", revpar: 70, accomodation: "Hotel F", revenue: "$1900", adr: 170, occupation: "88%" },
    { key: "7", date: "2025-01-07", revpar: 72, accomodation: "Hotel G", revenue: "$2000", adr: 180, occupation: "92%" },
    { key: "8", date: "2025-01-08", revpar: 75, accomodation: "Hotel H", revenue: "$2100", adr: 190, occupation: "85%" },
    { key: "9", date: "2025-01-09", revpar: 80, accomodation: "Hotel I", revenue: "$2200", adr: 200, occupation: "90%" },
    { key: "10", date: "2025-01-10", revpar: 85, accomodation: "Hotel J", revenue: "$2300", adr: 210, occupation: "87%" },
    { key: "11", date: "2025-01-11", revpar: 90, accomodation: "Hotel K", revenue: "$2400", adr: 220, occupation: "93%" },
    { key: "12", date: "2025-01-12", revpar: 95, accomodation: "Hotel L", revenue: "$2500", adr: 230, occupation: "89%" },
  ];
  

export default function NewReport() {
  const darkMode = useSelector(selectDarkMode);

  const downloadCSV = () => {
    const headers = ["Date", "ADR", "RevPAR", "Revenue", "Hotel Name"];
    const rows = data1.map(({ date, adr, revpar, revenue, accomodation }) => [
      date,
      adr,
      revpar,
      revenue,
      accomodation,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.map((item) => `"${item}"`).join(","))
        .join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "report.csv";
    link.click();
  };

  return (
    <AppLayout
      Children={
        <div className={`p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
          <h1 className="text-2xl font-bold text-center mb-4">Reports / Revenue per Available Rooms</h1>
          <div className={`p-4 rounded-lg shadow-md mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold text-center mb-4">Filter</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Select placeholder="Year" className="w-full" options={[{ value: "2024", label: "2024" }]} />
              <Select placeholder="Compare with" className="w-full" options={[{ value: "Year", label: "Year" }]} />
              <Select placeholder="Room Types" className="w-full" options={[{ value: "All Room Types", label: "All Room Types" }]} />
              <Select placeholder="Reservation Source" className="w-full" options={[{ value: "All Channels", label: "All Channels" }]} />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <Button type="primary">Apply</Button>
              <Button>Clear</Button>
            </div>
          </div>

          {/* Chart Section */}
          <div className={`p-6 rounded-lg shadow-md mb-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <h2 className="text-lg font-semibold text-center mb-4">Revenue per Available Rooms</h2>
            <div className="flex justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Revenue" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-6">
            <Button type="primary">Export To</Button>
            <div className="flex gap-2">
              <Button>Day</Button>
              <Button>Week</Button>
              <Button type="primary">Month</Button>
            </div>
          </div>

          {/* Table Section */}
          <h1 className="text-2xl font-bold text-center mb-4">Revenue per Available Room</h1>
          <div className="overflow-x-auto">
            <Table<DataType>
              columns={columns}
              dataSource={data1}
              className={`${darkMode ? "bg-gray-900" : "bg-white"} min-w-full`}
            />
          </div>

          {/* Download Button */}
          <div className="flex justify-end mt-6">
            <Button type="primary" onClick={downloadCSV}>
              Download CSV
            </Button>
          </div>
        </div>
      }
    />
  );
}
