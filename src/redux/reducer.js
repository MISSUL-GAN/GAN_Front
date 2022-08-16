import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { tokenReducer } from "./tokenReducer";
import { memberReducer } from "./memberReducer";

const rootReducer = combineReducers({
    token: tokenReducer,
    member: memberReducer
});

const Store = configureStore({
    reducer: rootReducer,
});

export { Store, rootReducer };