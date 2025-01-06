import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Layout } from "react-grid-layout";
import { RootState } from "../../app/store";

interface GridState {
  layout: Layout[];
  gridData: { [key: string]: any };
  isInCreatorMode: boolean;
}

const initialState: GridState = {
  layout: [],
  gridData: {},
  isInCreatorMode: false,
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
  },
});

export const { setLayout, setGridData, setCreatorMode } = gridSlice.actions;

export const selectLayout = (state: RootState) => state.grid.layout;
export const selectGridData = (state: RootState) => state.grid.gridData;
export const selectIsInCreatorMode = (state: RootState) => state.grid.isInCreatorMode;

export default gridSlice.reducer;
