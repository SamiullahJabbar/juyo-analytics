import React from "react";
import Header from "../../components/Header/Header";
import DashboardHeader from "./components/Header";
import MainCanvas from "./components/MainCanvas";
import AppLayout from "../../components/Layout/AppLayout";
import { Plus } from "lucide-react";
import {
  selectIsInCreatorMode,
  setCreatorMode,
} from "../../features/grid/gridSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectDarkMode } from "../../features/grid/gridSlice"; // Import the darkMode selector

export default function DashboardCanvas(): React.ReactElement<{}> {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
  const isCreatorMode = useSelector(selectIsInCreatorMode);
  const darkMode = useSelector(selectDarkMode); // Get darkMode state
  const dispatch = useDispatch();

  // Conditional styles for dark mode
  const containerStyle = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const cardStyle = darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900";
  const buttonPrimaryStyle = darkMode
    ? "bg-indigo-600 text-white hover:bg-indigo-700"
    : "bg-indigo-600 text-white hover:bg-indigo-700";
  const buttonSecondaryStyle = darkMode
    ? "bg-blue-600 text-white hover:bg-blue-700"
    : "bg-blue-600 text-white hover:bg-blue-700";
  const buttonDiscardStyle = darkMode
    ? "bg-red-500 text-white hover:bg-red-600"
    : "bg-red-500 text-white hover:bg-red-600";
  const textSecondary = darkMode ? "text-gray-400" : "text-gray-600";
  const titleText = darkMode ? "text-white" : "text-gray-900";

  return (
    <>
      <AppLayout
        Children={
          <div className={`h-full space-y-8 ${containerStyle}`}>
            <div className={`flex items-center justify-between p-6 rounded-lg ${cardStyle}`}>
              <div>
                <h2 className={`text-3xl font-extrabold ${titleText}`}>Canvas Dashboard</h2>
                <p className={`mt-2 text-base ${textSecondary}`}>
                  View key metrics and insights in one place.
                </p>
              </div>

              {isCreatorMode ? (
                <div className="flex items-center gap-4">
                  <button
                    className={`px-6 py-2 ${buttonSecondaryStyle} text-sm font-semibold rounded-lg shadow transition`}
                    onClick={() => dispatch(setCreatorMode(false))}
                  >
                    Save
                  </button>
                  <button
                    className={`px-6 py-2 ${buttonDiscardStyle} text-sm font-semibold rounded-lg shadow transition`}
                    onClick={() => dispatch(setCreatorMode(false))}
                  >
                    Discard
                  </button>
                </div>
              ) : (
                <button
                  className={`inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-sm font-semibold rounded-lg ${buttonPrimaryStyle} transition`}
                  onClick={() => dispatch(setCreatorMode(true))}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Widget
                </button>
              )}
            </div>

            <div className={`flex h-full rounded-lg shadow p-6 ${cardStyle}`}>
              <MainCanvas />
            </div>
          </div>
        }
      />
    </>
  );
}
