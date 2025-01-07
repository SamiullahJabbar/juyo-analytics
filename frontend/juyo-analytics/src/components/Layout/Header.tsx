import React, { useState } from "react";
import { Bell, Settings, User, LogOut, LayoutDashboard, UserCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Popover, List, Typography, Divider, Dropdown, Menu } from "antd";

export default function Header() {
  const navigate = useNavigate();

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
            className="flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            {item.icon}
            <span className="text-gray-600">{item.label}</span>
          </div>
        ),
      }))}
    />
  );

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Analytics Platform
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Notification Bell with Popover */}
            <Popover
              content={
                <div className="w-64">
                  <Typography.Title
                    level={5}
                    className="mb-2 text-gray-800 text-center"
                  >
                    Notifications
                  </Typography.Title>
                  <Divider className="my-2" />
                  {notifications.length > 0 ? (
                    <List
                      size="small"
                      dataSource={notifications}
                      renderItem={(item) => (
                        <List.Item
                          className="hover:bg-gray-100 p-2 rounded-md"
                          key={item.id}
                          style={{ cursor: "pointer" }}
                        >
                          <span className="text-gray-600">{item.message}</span>
                        </List.Item>
                      )}
                    />
                  ) : (
                    <div className="text-gray-500 text-center p-2">
                      No notifications available
                    </div>
                  )}
                </div>
              }
              title={null}
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
              overlayClassName="custom-popover"
            >
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-6 w-6" />
              </button>
            </Popover>

            {/* Settings Button */}
            <button
              className="p-2 text-gray-400 hover:text-gray-500"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-6 w-6" />
            </button>

            {/* User Dropdown */}
            <Dropdown overlay={dropdownMenu} placement="bottomRight" trigger={['click']}>
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <User className="h-6 w-6" />
              </button>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
