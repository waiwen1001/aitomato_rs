import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartApi, orderApi } from "../services/api";
import { AddToCartRequest, OrderState } from "../types/order";

const initialState: OrderState = {
  data: null,
  loading: false,
  error: null,
};

export const addToCart = createAsyncThunk(
  "order/addToCart",
  async (order: AddToCartRequest) => {
    const response = await addToCartApi.addToCart(order);
    return response;
  }
);

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (queueId: string) => {
    const response = await orderApi.fetchOrder(queueId);
    return response;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to cart";
      })
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch order";
      });
  },
});

export default orderSlice.reducer;
