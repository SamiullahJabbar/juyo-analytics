import React, { useEffect, useState, useRef } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { RightSideBar } from "./RightSideBar/RightSideBar";
import { MainCanvasTypes, WidgetProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {
  setLayout,
  setGridData,
  selectLayout,
  selectGridData,
  selectIsInCreatorMode,
  // setCreatorMode,
} from "../../../features/grid/gridSlice";
import { componentMapping } from "../Widgets/widgetselector";
import { selectDarkMode } from "../../../features/grid/gridSlice"; // Import the darkMode selector

const MainCanvas: React.FC<MainCanvasTypes> = () => {
  const componentMap = useRef<{ [key: string]: React.ReactNode }>({}); // Local map to store components
  const dispatch = useDispatch();
  const layout = useSelector(selectLayout);
  const gridData = useSelector(selectGridData);
  const isInCreatorMode = useSelector(selectIsInCreatorMode);
  const darkMode = useSelector(selectDarkMode); // Get darkMode state

  console.log('isCreatorMode', isInCreatorMode);

  const [gridWidth, setGridWidth] = useState<number>(0);

  const calculateGridWidth = () => {
    const gridContainer = document.querySelector(".layout") as HTMLElement;
    const gridContainerWidth = gridContainer.offsetWidth;
    setGridWidth(gridContainerWidth);
  };
  const addGridItem = (
    data: WidgetProps,
    component: React.ReactNode,
    itemLayout: {
      i: string;
      x: number;
      y: number;
      w: number;
      h: number;
    } = {
      i: `${layout.length + 1}`,
      x: 0,
      y: Infinity, // Ensure y is a number
      w: 2,
      h: 2,
    }
  ) => {
    // Calculate the next available position
    let x = 0;
    let y = 0;
    const cols = 12; // Number of columns in the grid

    if (layout.length > 0) {
      const lastItem = layout[layout.length - 1];
      x = lastItem.x - itemLayout.w;
      y = lastItem.y;

      if (x < 0) {
        x = cols - itemLayout.w;
        y = lastItem.y + lastItem.h;
      }
    }

    const newItem: Layout = {
      i: `${layout.length + 1}`,
      x: itemLayout.x || x,
      y: itemLayout.y || y,
      w: itemLayout.w || 2,
      h: itemLayout.h || 2,
    };

    dispatch(setLayout([...layout, newItem]));
    dispatch(
      setGridData({
        ...gridData,
        [newItem.i]: {
          ...data,
          componentId: newItem.i,
          componentType: data.type,
          component: null,
        },
      })
    );
    componentMap.current[newItem.i] = component; // Store the component in a local map
  };

  const deleteGridItem = (id: string) => {
    const newLayout = layout.filter((item) => item.i !== id);
    const newGridData = { ...gridData };
    delete newGridData[id];
    dispatch(setLayout(newLayout));
    dispatch(setGridData(newGridData));
    delete componentMap.current[id]; // Remove the component from the local map
  };

  useEffect(() => {
    calculateGridWidth();
    window.addEventListener("resize", calculateGridWidth);
    return () => {
      window.removeEventListener("resize", calculateGridWidth);
    };
  }, [isInCreatorMode]);

  useEffect(() => {
    const savedLayout = localStorage.getItem("layout");
    const savedGridData = localStorage.getItem("gridData");
    if (savedLayout) {
      dispatch(setLayout(JSON.parse(savedLayout)));
    }
    if (savedGridData) {
      const parsedGridData = JSON.parse(savedGridData);
      dispatch(setGridData(parsedGridData));
      // Rehydrate componentMap
      Object.keys(parsedGridData).forEach((key) => {
        const data = parsedGridData[key];
        if (data.componentType) {
          componentMap.current[key] =
            componentMapping[data.componentType](data);
        }
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("layout", JSON.stringify(layout));
    localStorage.setItem("gridData", JSON.stringify(gridData));
  }, [layout, gridData]);

  // Conditional styles for dark mode
  const containerStyle = darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900";
  const gridItemStyle = darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900";
  const buttonStyle = darkMode ? "text-red-500 hover:text-red-700" : "text-red-500 hover:text-red-600";
  const rightSidebarStyle = darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900";

  return (
    <div
      className={`py-4 ${containerStyle}`}
      style={{ height: "100%", width: "100%", display: "flex" }}
    >
      <GridLayout
        className={`layout w-full ${containerStyle}`}
        layout={layout}
        cols={12}
        rowHeight={100}
        width={gridWidth}
        onLayoutChange={(newLayout) => dispatch(setLayout(newLayout))}
        isResizable={isInCreatorMode}
        isDraggable={isInCreatorMode}
        resizeHandles={["se", "sw", "ne", "nw", "n", "s", "e", "w"]}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            className={`${gridItemStyle} ${isInCreatorMode && "border border-gray-600"} flex items-center justify-center relative m-2`}
          >
            <button
              className={`${isInCreatorMode && "hidden"} absolute top-0 right-0 m-1 ${buttonStyle}`}
              onClick={(e) => {
                e.stopPropagation();
                deleteGridItem(item.i);
              }}
            >
              ✖
            </button>
            {gridData[item.i] && (
              <div className="w-full h-full px-1">
                {componentMap.current[gridData[item.i].componentId] ? (
                  componentMap.current[gridData[item.i].componentId]
                ) : (
                  <>
                    <h3>{gridData[item.i].title}</h3>
                    <p>{gridData[item.i].explanation}</p>
                    <img
                      src={gridData[item.i].imageUrl}
                      alt={gridData[item.i].title}
                    />
                  </>
                )}
              </div>
            )}
          </div>
        ))}
      </GridLayout>
      <div
        className={`${
          isInCreatorMode ? "block" : "hidden"
        } mr-2 p-5 border-l border-gray-500 rounded-lg ${rightSidebarStyle}`}
      >
        <RightSideBar addGridItem={addGridItem} />
      </div>
    </div>
  );
};

export default MainCanvas;
