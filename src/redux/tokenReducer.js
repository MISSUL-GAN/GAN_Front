import { createSlice } from "@reduxjs/toolkit";

const tokenInitialState = {
    accessToken: "",
    refreshToken: "",
};

const tokenSlice = createSlice({
    name: "token",
    initialState: tokenInitialState,
    reducers: {
        login(state, action) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout: () => tokenInitialState
    },
});

export const { login, logout } = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;