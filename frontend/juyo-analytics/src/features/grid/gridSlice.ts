import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";
import { RootState } from "../../app/store";

const storedDarkMode = localStorage.getItem('darkMode') === 'true'; // Check localStorage for darkMode setting

interface GridState {
  layout: Layout[];
  gridData: { [key: string]: any };
  isInCreatorMode: boolean;
  darkMode: boolean;
}

const initialState: GridState = {
  layout: [],
  gridData: {},
  isInCreatorMode: false,
  darkMode: storedDarkMode, // Set darkMode based on localStorage value
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setLayout: (state, action: PayloadAction<Layout[]>) => {
      state.layout = action.payload;
    },
    setGridData: (state, action: PayloadAction<{ [key: string]: any }>) => {
      state.gridData = action.payload;
    },
    setCreatorMode: (state, action: PayloadAction<boolean>) => {
      state.isInCreatorMode = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', state.darkMode.toString()); // Save the dark mode state to localStorage
    },
  },
});

export const { setLayout, setGridData, setCreatorMode, toggleDarkMode } = gridSlice.actions;

export const selectLayout = (state: RootState) => state.grid.layout;
export const selectGridData = (state: RootState) => state.grid.gridData;
export const selectIsInCreatorMode = (state: RootState) => state.grid.isInCreatorMode;
export const selectDarkMode = (state: RootState) => state.grid.darkMode;

export default gridSlice.reducer;
