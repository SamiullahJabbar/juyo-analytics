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

export default function DashboardCanvas(): React.ReactElement<{}> {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);
  const isCreatorMode = useSelector(selectIsInCreatorMode);
  const dispatch = useDispatch();

  return (
    <>
      <AppLayout
        Children={
          <div className="h-full space-y-8 bg-gray-5">
            <div className="flex items-center justify-between bg-white p-6 rounded-lg ">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900">Canvas Dashboard</h2>
                <p className="mt-2 text-base text-gray-600">
                  View key metrics and insights in one place.
                </p>
              </div>

              {isCreatorMode ? (
                <div className="flex items-center gap-4">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                    onClick={() => dispatch(setCreatorMode(false))}
                  >
                    Save
                  </button>
                  <button
                    className="px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg shadow hover:bg-red-600 transition"
                    onClick={() => dispatch(setCreatorMode(false))}
                  >
                    Discard
                  </button>
                </div>
              ) : (
                <button
                  className="inline-flex items-center px-6 py-3 border border-transparent shadow-lg text-sm 
                font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition"
                  onClick={() => dispatch(setCreatorMode(true))}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Widget
                </button>
              )}
            </div>

            <div className="flex h-full bg-white rounded-lg shadow p-6">
              <MainCanvas />
            </div>
          </div>
        }
      />
    </>
  );
}