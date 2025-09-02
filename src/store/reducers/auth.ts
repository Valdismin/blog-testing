import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    currentUserId: number;
    admins: number[];
}

const initialState: AuthState = {
    currentUserId: Number(localStorage.getItem("currentUserId")) || 1,
    admins: [1]
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCurrentUser(state, action: PayloadAction<number>) {
            state.currentUserId = action.payload;
            if (action.payload) {
                localStorage.setItem("currentUserId", String(action.payload));
            } else {
                localStorage.removeItem("currentUserId");
            }
        },
    },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;