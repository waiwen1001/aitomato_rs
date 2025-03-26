import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableState } from "../types/outlet";
import { tableApi } from "../services/api";

const initialState: TableState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchTables = createAsyncThunk(
  "table/fetchTables",
  async (outletId: string) => {
    const response = await tableApi.getTables(outletId);
    return response;
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTables.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTables.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTables.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to fetch tables";
    });
  },
});

export default tableSlice.reducer;
