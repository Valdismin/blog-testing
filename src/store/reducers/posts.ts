import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../utils/api.ts";

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    likes: number;
    dislikes: number;
    favorite: boolean;
    priority: number;
    likedBy: number[];
    dislikedBy: number[];
}

interface PostsState {
    list: Post[];
    loading: boolean;
    error: string | null;
}

const initialState: PostsState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
    const posts = await api<Post[]>("/posts");
    return posts.map((p) => ({
        ...p,
        likes: 0,
        dislikes: 0,
        favorite: false,
        priority: 0,
        likedBy: [],
        dislikedBy: [],
    }));
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<Post>) {
            state.list.unshift(action.payload);
        },
        removePost(state, action: PayloadAction<number>) {
            state.list = state.list.filter((p) => p.id !== action.payload);
        },
        toggleLike(state, action: PayloadAction<{ id: number; userId: number }>) {
            const post = state.list.find((p) => p.id === action.payload.id);
            if (!post) return;

            const { userId } = action.payload;

            if (post.likedBy.includes(userId)) {
                post.likedBy = post.likedBy.filter((u) => u !== userId);
                post.likes--;
            } else {
                post.likedBy.push(userId);
                post.likes++;

                if (post.dislikedBy.includes(userId)) {
                    post.dislikedBy = post.dislikedBy.filter((u) => u !== userId);
                    post.dislikes--;
                }
            }
        },
        toggleDislike(state, action: PayloadAction<{ id: number; userId: number }>) {
            const post = state.list.find((p) => p.id === action.payload.id);
            if (!post) return;

            const { userId } = action.payload;

            if (post.dislikedBy.includes(userId)) {
                post.dislikedBy = post.dislikedBy.filter((u) => u !== userId);
                post.dislikes--;
            } else {
                post.dislikedBy.push(userId);
                post.dislikes++;

                if (post.likedBy.includes(userId)) {
                    post.likedBy = post.likedBy.filter((u) => u !== userId);
                    post.likes--;
                }
            }
        },
        toggleFavorite(state, action: PayloadAction<number>) {
            const post = state.list.find((p) => p.id === action.payload);
            if (post) post.favorite = !post.favorite;
        },
        setPriority(state, action: PayloadAction<{ id: number; priority: number }>) {
            const post = state.list.find((p) => p.id === action.payload.id);
            if (post) post.priority = action.payload.priority;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.list = action.payload;
                state.loading = false;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Ошибка";
            });
    },
});

export const {
    addPost,
    removePost,
    toggleLike,
    toggleDislike,
    toggleFavorite,
    setPriority,
} = postsSlice.actions;

export default postsSlice.reducer;
