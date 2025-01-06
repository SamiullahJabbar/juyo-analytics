// components/Header/Header.tsx
import React from "react";
import { Dropdown, Menu } from "antd";
import { UserOutlined, GlobalOutlined, DownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const navigate = useNavigate();
  const userMenu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2" onClick={()=>navigate('/settings')} >Settings</Menu.Item>
      <Menu.Item key="3"  >Logout</Menu.Item>
    </Menu>
  );

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white shadow-md">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <GlobalOutlined className="text-xl" />
        {/* Ham Burger Sign */}
        <div className="w-6 h-6 bg-white rounded-lg"></div>

        <span className="text-sm">Canvas</span>
        <span className="text-sm">&gt;</span>
        <span className="text-sm">New</span>
      </div>

      {/* Center */}
      <div className="flex gap-8 items-center justify-center">
        <span className="text-sm">DEMO CHAIN</span>
        <span className="text-sm text-center">.</span>
        <span className="text-sm">DEMO HOTEL</span>
        <span className="text-sm">.</span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <div className="flex items-center gap-2 cursor-pointer">
            <UserOutlined />
            <span>Bram van Berkel</span>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;
