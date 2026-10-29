import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getItems = createAsyncThunk("items/getItems", async (args) => {
  const params = new URLSearchParams();
  if (args?.search) params.append("search", args.search);
  if (args?.sort) params.append("sort", args.sort);
  if (args?.category) params.append("category", args.category);
  if (args?.dimension) params.append("dimension", JSON.stringify(args.dimension));
  if (args?.page) params.append("page", args.page);
  if (args?.limit) params.append("limit", args.limit);

  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/shop/items?${params.toString()}`
  );
  return res.data;
});

const initialState = {
  items: [],
  total: 0,
  pages: 1,
  isLoading: true,
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getItems.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total ?? state.items.length;
      state.pages = action.payload.pages ?? 1;
      state.isLoading = false;
    });
    builder.addCase(getItems.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        console.log(action.payload.errorMessage);
      } else {
        console.log(action.error.message);
      }
    });
  },
});

export default itemsSlice.reducer;
