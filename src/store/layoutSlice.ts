import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LayoutState } from "../types/outlet";
import { layoutApi } from "../services/api";

const initialState: LayoutState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchLayouts = createAsyncThunk(
  "layout/fetchLayouts",
  async (outletId: string) => {
    const response = await layoutApi.getLayout(outletId);
    return response;
  }
);

const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLayouts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchLayouts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchLayouts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch layout";
    });
  },
});

export default layoutSlice.reducer;
