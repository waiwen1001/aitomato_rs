import { configureStore } from "@reduxjs/toolkit";
import outletReducer from "./outletSlice";
import queueReducer from "./queueSlice";
import orderReducer from "./orderSlice";
import tableReducer from "./tableSlice";

export const store = configureStore({
  reducer: {
    outlet: outletReducer,
    queue: queueReducer,
    order: orderReducer,
    table: tableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
