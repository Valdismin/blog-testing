import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api.ts";

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
}

interface UsersState {
    list: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UsersState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
    return await api<User[]>("/users");
});

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUser(state, action: PayloadAction<User>) {
            const i = state.list.findIndex((u) => u.id === action.payload.id);
            if (i !== -1) state.list[i] = action.payload;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Ошибка";
            });
    },
});

export const { updateUser } = usersSlice.actions;
export default usersSlice.reducer;
