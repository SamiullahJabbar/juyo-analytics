import React, { useState } from "react";
import { Bell, Settings, User, LogOut, LayoutDashboard, UserCheck, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, List, Typography, Divider, Dropdown, Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode, toggleDarkMode } from "../../features/grid/gridSlice"; // Ensure correct imports

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode); // Select dark mode state from Redux

  // Dummy notification data
  const notifications = [
    { id: 1, message: "🚀 New user signed up" },
    { id: 2, message: "⚠️ Server downtime scheduled" },
    { id: 3, message: "💬 New comment on your post" },
  ];

  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };

  // Dropdown Menu Items
  const menuItems = [
    {
      key: "main-dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Main Dashboard",
      onClick: () => navigate("/dashboardmain"),
    },
    {
      key: "your-dashboard",
      icon: <UserCheck className="h-4 w-4" />,
      label: "Your Dashboard",
      onClick: () => navigate("/dashboardcanvas"),
    },
    {
      key: "Logout",
      icon: <LogOut className="h-4 w-4" />,
      label: "Logout",
      onClick: () => navigate("/"),
    },
  ];

  const dropdownMenu = (
    <Menu
      items={menuItems.map((item) => ({
        key: item.key,
        label: (
          <div
            onClick={item.onClick}
            className={`flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer ${
              darkMode ? "text-black hover:bg-gray-700" : "text-gray-600"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ),
      }))}
    />
  );

  return (
    <header className={`border-b ${darkMode ? "bg-gray-800" : "bg-white"} ${darkMode ? "text-white" : "text-gray-900"}`}>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">Analytics Platform</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell with Popover */}
            <Popover
              content={
                <div className="w-64">
                  <Typography.Title
                    level={5}
                    className={`mb-2 text-center ${darkMode ? "text-white" : "text-gray-800"}`}
                  >
                    Notifications
                  </Typography.Title>
                  <Divider className={`my-2 ${darkMode ? "border-gray-700" : "border-gray-200"}`} />
                  {notifications.length > 0 ? (
                    <List
                      size="small"
                      dataSource={notifications}
                      renderItem={(item) => (
                        <List.Item
                          key={item.id}
                          className={`hover:bg-gray-100 p-2 rounded-md ${darkMode ? "text-white" : "text-gray-600"}`}
                          style={{ cursor: "pointer" }}
                        >
                          <span>{item.message}</span>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <div className={`text-center p-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      No notifications available
                    </div>
                  )}
                </div>
              }
              title={null}
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <button className={`p-2 ${darkMode ? "text-white hover:text-gray-400" : "text-gray-400 hover:text-gray-500"}`}>
                <Bell className="h-6 w-6" />
              </button>
            </Popover>

            {/* Settings Button */}
            <button
              className={`p-2 ${darkMode ? "text-white hover:text-gray-400" : "text-gray-400 hover:text-gray-500"}`}
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-6 w-6" />
            </button>

            {/* User Dropdown */}
            <Dropdown overlay={dropdownMenu} placement="bottomRight" trigger={['click']}>
              <button className={`p-2 ${darkMode ? "text-white hover:text-gray-400" : "text-gray-400 hover:text-gray-500"}`}>
                <User className="h-6 w-6" />
              </button>
            </Dropdown>

            {/* Dark Mode Toggle (Moon/Sun Icon) */}
            <button
              className={`p-2 ${darkMode ? "text-white hover:text-gray-400" : "text-gray-400 hover:text-gray-500"}`}
              onClick={() => dispatch(toggleDarkMode())}
            >
              {darkMode ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
