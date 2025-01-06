import React, { Children } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function AppLayout({Children}: {Children: React.ReactNode}) {
  return (
    <div className="min-h-screen bg-gray-50">
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
