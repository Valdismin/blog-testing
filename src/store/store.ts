import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers/users.ts";
import postsReducer from "./reducers/posts.ts";
import commentsReducer from "./reducers/comments.ts";
import authReducer from "./reducers/auth.ts";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        posts: postsReducer,
        comments: commentsReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
