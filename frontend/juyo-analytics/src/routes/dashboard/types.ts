/** routes/dashboard/type.ts */

import { Dispatch, SetStateAction } from "react";

// DashboardHeader props
export type DashboardHeaderProps = {
  dashboardName: string;
  onChangeDashboardName: () => void;
  isSideBarOpen: boolean;
  onToggleSideBar: () => void;
};

export type RightSideBarTypes = {
  addGridItem: (data: {
    title: string;
    explanation: string;
    imageUrl: string;
  }) => void;
};

export type MainCanvasTypes = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

export type WidgetProps = {
  title: string;
  explanation: string;
  imageUrl: string;
  component?: React.FC;
};
