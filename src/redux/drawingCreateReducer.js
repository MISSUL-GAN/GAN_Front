import { createSlice } from "@reduxjs/toolkit";

const drawingCreateInitialState = {
    fileName: null,
    presetTagId: null
};

const drawingCreateSlice = createSlice({
    name: "drawingCreate",
    initialState: drawingCreateInitialState,
    reducers: {
        saveFileName(state, action) {
            state.fileName = action.payload;
        },
        savePresetTagId(state, action) {
            state.presetTagId = action.payload
        },
        clearFileName(state) {
            state.fileName = drawingCreateInitialState.fileName;
        },
        clear: () => drawingCreateInitialState // 언마운트 시 클리어 필요함
    },
});
export const { saveFileName, savePresetTagId, clearFileName, clear } = drawingCreateSlice.actions;
export const drawingCreateReducer = drawingCreateSlice.reducer;