import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RestaurantState } from '../types/restaurant';
import { restaurantApi } from '../services/api';

const initialState: RestaurantState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchRestaurant = createAsyncThunk(
  'restaurant/fetchRestaurant',
  async (id: string) => {
    const response = await restaurantApi.getRestaurant(id);
    return response;
  }
);

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch restaurant';
      });
  },
});

export default restaurantSlice.reducer; 