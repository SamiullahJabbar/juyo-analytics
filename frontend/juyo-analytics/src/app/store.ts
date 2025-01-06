import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import gridReducer from '../features/grid/gridSlice';

export const store = configureStore({
  reducer: {
    grid: gridReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;