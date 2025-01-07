import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  MessageSquare,
  FileSpreadsheet,
  Settings,
} from "lucide-react";
import { FaCalculator } from "react-icons/fa";
import { LineChartOutlined } from "@ant-design/icons";
import { selectDarkMode } from "../../features/grid/gridSlice"; // Ensure correct imports
import { useSelector } from "react-redux";

const navigation = [
  {
    name: "Dashboards",
    to: "/dashboard",
    icon: LayoutDashboard,
    children: [
      { name: "Main Dashboard", to: "/dashboardmain" },
      { name: "Canvas Dashboard", to: "/dashboardcanvas" },
    ],
  },
  { name: "Analytics", to: "/analytics", icon: PieChart },
  { name: "Forecast", to: "/forecast", icon: LineChartOutlined },
  { name: "Calculator", to: "/calculator", icon: FaCalculator },
  { name: "AI Assistant", to: "/ai-assistant", icon: MessageSquare },
  { name: "Reports", to: "/reports", icon: FileSpreadsheet },
  { name: "Settings", to: "/settings", icon: Settings },
];

function Sidebar({ toggleDropdown, expanded, darkMode }) {
  return (
    <div
      className={`h-screen w-72 flex-col ${darkMode ? "bg-gray-800 text-white" : "bg-lightblue"} border-r border-gray-200`}
    >
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navigation.map((item) => (
          <div key={item.name}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-lg font-medium rounded-md transition-all duration-200 ${
                  isActive
                    ? darkMode
                      ? "bg-gray-700 text-white"
                      : "bg-lightblue-100 text-gray-900"
                    : darkMode
                    ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-lightblue-50 hover:text-gray-900"
                }`
              }
              onClick={(e) => {
                if (item.children) {
                  e.preventDefault();
                  toggleDropdown(item.name);
                }
              }}
            >
              <item.icon className="mr-4 h-7 w-7" />
              {item.name}
            </NavLink>
            {item.children && expanded[item.name] && (
              <div className="ml-8 space-y-2">
                {item.children.map((child) => (
                  <NavLink
                    key={child.name}
                    to={child.to}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-lg font-medium rounded-md transition-all duration-200 ${
                        isActive
                          ? darkMode
                            ? "bg-gray-700 text-white"
                            : "bg-lightblue-100 text-gray-900"
                          : darkMode
                          ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                          : "text-gray-600 hover:bg-lightblue-50 hover:text-gray-900"
                      }`
                    }
                  >
                    {child.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}

export default function ResponsiveSidebar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState({});
  const darkMode = useSelector(selectDarkMode); // Get dark mode state from Redux

  const toggleDropdown = (name) => {
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        className="absolute top-4 left-4 z-50 block md:hidden p-2 rounded-full bg-gray-200 shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-lightblue focus:ring-offset-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className={`h-8 w-8 ${darkMode ? "text-white" : "text-gray-700"}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isMenuOpen
                ? "M6 18L18 6M6 6l12 12" // Close icon
                : "M4 6h16M4 12h16M4 18h16" // Hamburger menu
            }
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`md:relative md:translate-x-0 md:w-72 fixed inset-y-0 left-0 z-40 w-72 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar toggleDropdown={toggleDropdown} expanded={expanded} darkMode={darkMode} />
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}
