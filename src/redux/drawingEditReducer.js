import { createSlice } from "@reduxjs/toolkit";

const drawingEditInitialState = [];

const drawingEditSlice = createSlice({
    name: "drawingEdit",
    initialState: drawingEditInitialState,
    reducers: {
        add(state, action) {
            return state.push(action.payload);
        },
        resolve(state, action) {
            return state.shift();
        },
        clear: () => drawingEditInitialState
    },
});
export const { add, resolve, clear } = drawingEditSlice.actions;
export const drawingEditReducer = drawingEditSlice.reducer;