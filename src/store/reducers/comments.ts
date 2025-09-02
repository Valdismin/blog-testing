import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api.ts";

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

interface CommentsState {
    list: Comment[];
    loading: boolean;
    error: string | null;
}

const initialState: CommentsState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchComments = createAsyncThunk("comments/fetch", async () => {
    return await api<Comment[]>("/comments");
});

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        addComment(state, action: PayloadAction<Comment>) {
            state.list.push(action.payload);
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Ошибка";
            });
    },
});

export const { addComment } = commentsSlice.actions;
export default commentsSlice.reducer;
