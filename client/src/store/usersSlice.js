import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUsers = createAsyncThunk("users/getUsers", async (args) => {
    const params = new URLSearchParams();
    if (args?.search) params.append("search", args.search);
    if (args?.sort) params.append("sort", args.sort);
    if (args?.page) params.append("page", args.page);
    if (args?.limit) params.append("limit", args.limit);

    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users?${params.toString()}`,
        {
            headers: {
                "Authorization": `Bearer ${args.token}`
            }
        }
    )
    return res.data;
});

const initialState = {
    users: [],
    total: 0,
    pages: 1,
    isLoading: true,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.total = action.payload.total ?? state.users.length;
            state.pages = action.payload.pages ?? 1;
            state.isLoading = false;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.isLoading = false;
            if (action.payload) {
                console.log(action.payload.errorMessage);
            } else {
                console.log(action.error.message);
            }
        });
    },
});

export default usersSlice.reducer;
