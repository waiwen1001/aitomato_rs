import { configureStore } from "@reduxjs/toolkit";
import outletReducer from "./outletSlice";
import queueReducer from "./queueSlice";
import orderReducer from "./orderSlice";
import layoutReducer from "./layoutSlice";

export const store = configureStore({
  reducer: {
    outlet: outletReducer,
    queue: queueReducer,
    order: orderReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
