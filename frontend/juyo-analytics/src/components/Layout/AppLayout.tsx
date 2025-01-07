import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice"; // Correct import for darkMode

export default function AppLayout({ Children }: { Children: React.ReactNode }) {
  const darkMode = useSelector(selectDarkMode); // Get the darkMode state from Redux
  
  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {Children}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
