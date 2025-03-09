import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { QueueState } from '../types/queue';
import { queueApi } from '../services/api';

const initialState: QueueState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchPendingQueue = createAsyncThunk(
  'queue/fetchPendingQueue',
  async () => {
    const response = await queueApi.getPendingQueue();
    return response;
  }
);

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPendingQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingQueue.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPendingQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch pending queue';
      });
  },
});

export default queueSlice.reducer; 