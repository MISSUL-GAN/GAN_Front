import { createSlice } from "@reduxjs/toolkit";

const memberInitialState = {
    accountEmail: "",
    id: 0,
    name: "",
    profileImage: "",
    signed: false
};

const memberSlice = createSlice({
    name: "member",
    initialState: memberInitialState,
    reducers: {
        setMember(state, action) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.accountEmail = action.payload.accountEmail;
            state.profileImage = action.payload.profileImage;
            state.signed = true;
        },
        clearMember: () => memberInitialState
    },
});

export const { setMember, clearMember } = memberSlice.actions;
export const memberReducer = memberSlice.reducer;