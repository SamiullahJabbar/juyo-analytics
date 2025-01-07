import { SettingFilled, BulbFilled } from "@ant-design/icons";
import { DashboardHeaderProps } from "../types";
import { selectIsInCreatorMode, setCreatorMode, toggleDarkMode, selectDarkMode } from "../../../features/grid/gridSlice";
import { useSelector, useDispatch } from "react-redux";

export default function DashboardHeader({
  dashboardName,
  onChangeDashboardName,
}: DashboardHeaderProps) {
  const isInCreatorMode = useSelector(selectIsInCreatorMode);
  const darkMode = useSelector(selectDarkMode); // Select dark mode state from Redux
  const dispatch = useDispatch();

  // Handler for toggling dark mode
  const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode()); // Dispatch action to toggle dark mode
  };

  return (
    <header
      className={`flex justify-between items-center px-6 py-3 text-white shadow-md ${darkMode ? 'bg-[#40364b]' : 'bg-[#f5f5f5]'} `}
    >
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

        {/* Dark Mode Toggle Button */}
        <button
          className="px-4 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          onClick={handleDarkModeToggle} // Call the toggle handler
        >
          {darkMode ? <BulbFilled style={{ color: '#ffcc00' }} /> : <BulbFilled />}
        </button>
      </div>
    </header>
  );
}
