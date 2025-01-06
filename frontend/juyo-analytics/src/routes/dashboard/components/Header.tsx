/** routes/dashboard/components/Header.tsx */

import { SettingFilled } from "@ant-design/icons";
import { DashboardHeaderProps } from "../types";
import {
  selectIsInCreatorMode,
  setCreatorMode,
} from "../../../features/grid/gridSlice";

import { useSelector, useDispatch } from "react-redux";

export default function DashboardHeader({
  dashboardName,
  onChangeDashboardName,
}: DashboardHeaderProps) {
  const isInCreatorMode = useSelector(selectIsInCreatorMode);
  const dispatch = useDispatch();

  return (
    <header className="flex justify-between items-center px-6 py-3 bg-[#40364b] text-white shadow-md">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        <span className="text-sm" onClick={onChangeDashboardName}>
          {dashboardName}
        </span>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">
        {isInCreatorMode ? (
          <>
            <button
              className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              onClick={() => dispatch(setCreatorMode(false))}
            >
              Save
            </button>
            <button
              className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              onClick={() => dispatch(setCreatorMode(false))}
            >
              Discard
            </button>
          </>
        ) : (
          <button
            className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            onClick={() => dispatch(setCreatorMode(true))}
          >
            <SettingFilled />
          </button>
        )}
      </div>
    </header>
  );
}