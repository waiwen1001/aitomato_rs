import { configureStore } from '@reduxjs/toolkit';
import restaurantReducer from './restaurantSlice';
import queueReducer from './queueSlice';
export const store = configureStore({
  reducer: {
    restaurant: restaurantReducer,
    queue: queueReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 