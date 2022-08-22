import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { memberReducer } from "./memberReducer";

const rootReducer = combineReducers({
    member: memberReducer
});

const Store = configureStore({
    reducer: rootReducer,
});

export { Store, rootReducer };