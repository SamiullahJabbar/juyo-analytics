import React from "react";
import AppLayout from "../../components/Layout/AppLayout";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsInCreatorMode,
  setCreatorMode,
  selectDarkMode,
} from "../../features/grid/gridSlice";
import MainCanvas from "./components/MainCanvas";

export default function DashboardCanvas(): React.ReactElement<{}> {
  const isCreatorMode = useSelector(selectIsInCreatorMode);
  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const containerStyle = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const cardStyle = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const buttonPrimaryStyle = "bg-indigo-600 text-white hover:bg-indigo-700";

  return (
    <AppLayout
      Children={
        <div className={`h-full space-y-8 ${containerStyle}`}>
          <div className={`flex items-center justify-between p-6 rounded-lg ${cardStyle}`}>
            <div>
              <h2 className="text-3xl font-extrabold">Canvas Dashboard</h2>
              <p className="mt-2 text-base">
                Add widgets, configure settings, and design your dashboard.
              </p>
            </div>
            <button
              className={`flex items-center px-6 py-3 rounded-lg shadow ${buttonPrimaryStyle}`}
              onClick={() => dispatch(setCreatorMode(!isCreatorMode))}
            >
              <Plus className="h-5 w-5 mr-2" />
              {isCreatorMode ? "Exit Creator Mode" : "Add Widget"}
            </button>
          </div>
          <div className={`flex rounded-lg shadow p-6 ${cardStyle}`}>
            <MainCanvas />
          </div>
        </div>
      }
    />
  );
}
