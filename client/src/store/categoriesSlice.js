import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (args) => {
    const params = new URLSearchParams();
    if (args?.search) params.append("search", args.search);
    if (args?.sort) params.append("sort", args.sort);

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/shop/categories?${params.toString()}`
    );
    return res.data.categories;
  }
);

const initialState = {
  categories: [],
  isLoading: true,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      if (action.payload) {
        console.log(action.payload.errorMessage);
      } else {
        console.log(action.error.message);
      }
    });
  },
});

export default categoriesSlice.reducer;
