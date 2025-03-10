import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { QueueRequest, QueueState, Queue } from "../types/queue";
import { queueApi } from "../services/api";

const initialState: QueueState = {
  data: [],
  queue: null,
  loading: false,
  error: null,
};

export const fetchPendingQueue = createAsyncThunk(
  "queue/fetchPendingQueue",
  async () => {
    const response = await queueApi.getPendingQueue();
    return response;
  }
);

export const createQueue = createAsyncThunk(
  "queue/createQueue",
  async ({ outletId, pax, phoneNumber }: QueueRequest) => {
    const response = await queueApi.createQueue({ outletId, pax, phoneNumber });
    return response;
  }
);

export const fetchQueue = createAsyncThunk(
  "queue/fetchQueue",
  async (queueId: string) => {
    const response = await queueApi.getQueue(queueId);
    return response;
  }
);

const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    setQueueData: (state, action: PayloadAction<Queue>) => {
      if (state.data) {
        const exists = state.data.some(
          (queue) => queue.id === action.payload.id
        );
        if (!exists) {
          state.data = [...state.data, action.payload];
        }
      } else {
        state.data = [action.payload];
      }

      state.queue = action.payload;
      localStorage.setItem("queueId", action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPendingQueue cases
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
        state.error = action.error.message || "Failed to fetch pending queue";
      })

      // createQueue cases
      .addCase(createQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQueue.fulfilled, (state, action) => {
        state.loading = false;
        queueSlice.caseReducers.setQueueData(state, action);
      })
      .addCase(createQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create queue";
      })

      // fetchQueue cases
      .addCase(fetchQueue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQueue.fulfilled, (state, action) => {
        state.loading = false;
        queueSlice.caseReducers.setQueueData(state, action);
      })
      .addCase(fetchQueue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch queue";
      });
  },
});

export const { setQueueData } = queueSlice.actions;
export default queueSlice.reducer;
