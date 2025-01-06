import React, { useState } from "react";
import { Dropdown, MenuProps } from "antd";
import { Button, Space } from "antd";
import {
  DownOutlined,
  QuestionCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import TextWidgets from "./TextWidgets";
import ChartWidgets from "./ChartWidgets";
import { WidgetProps } from "../../types";

const items: MenuProps["items"] = [
  {
    label: "Public",
    key: "public",
    icon: <UserOutlined />,
  },
  {
    label: "Explorations",
    key: "explorations",
    icon: <UserOutlined />,
  },
];

const menuProps = {
  items,
};

export function RightSideBar({
  addGridItem,
}: {
  addGridItem: (
    data: WidgetProps,
    component: React.ReactNode,
    itemLayout: {}
  ) => void;
}): React.ReactElement<{}> {
  const [selectedMenu, setSelectedMenu] = useState("public");

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-heading mb-4 px-3 py-2 bg-text text-white rounded">
          <span className="text-sm">GALLERY</span>
        </div>

        <div className="sidebar-selector-dropdown flex justify-between items-center bg-text text-white rounded gap-4 mb-4">
          <div className="dropdown">
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              className="bg-gray-600 text-white"
            >
              <Button>
                <Space>
                  {selectedMenu === "public"
                    ? "Public Widgets"
                    : "Explorations"}
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
          </div>
          <div className="help-logo h-full w-full">
            <QuestionCircleFilled width={"60px"} height={"60px"} />
          </div>
        </div>

        <div className="search-box mb-4">
          <Search placeholder="Search" className="bg-gray-600" />
        </div>

        <div className="widgets overflow-auto h-[78vh] overflow-x-hidden">
          {selectedMenu === "public" ? (
            <TextWidgets addGridItem={addGridItem} />
          ) : (
            <ChartWidgets addGridItem={addGridItem} />
          )}
        </div>
      </div>
    </>
  );
}
