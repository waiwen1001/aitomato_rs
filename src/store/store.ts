import { configureStore } from "@reduxjs/toolkit";
import outletReducer from "./outletSlice";
import queueReducer from "./queueSlice";
export const store = configureStore({
  reducer: {
    outlet: outletReducer,
    queue: queueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
