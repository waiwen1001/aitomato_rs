import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { OutletState } from "../types/outlet";
import { outletApi } from "../services/api";

const initialState: OutletState = {
  data: null,
  outletId: null,
  loading: false,
  error: null,
};

export const fetchOutlet = createAsyncThunk(
  "outlet/fetchOutlet",
  async (id: string) => {
    const response = await outletApi.getOutlet(id);
    return response;
  }
);

const outletSlice = createSlice({
  name: "outlet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutlet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutlet.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.outletId = action.payload.id;
      })
      .addCase(fetchOutlet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch outlet";
      });
  },
});

export default outletSlice.reducer;
