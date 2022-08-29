import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { drawingCreateReducer } from "./drawingCreateReducer";
import { memberReducer } from "./memberReducer";

const rootReducer = combineReducers({
    member: memberReducer,
    drawingCreate: drawingCreateReducer
});

const Store = configureStore({
    reducer: rootReducer,
});

export { Store, rootReducer };