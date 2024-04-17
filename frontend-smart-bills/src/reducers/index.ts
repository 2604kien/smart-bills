import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import authReducer from "./authReducer";
import friendRequestReducer from "./friendRequestReducer";
import billReducer from "./billReducer";
export const rootReducer=combineReducers({
    user:userReducer,
    auth:authReducer,
    friendRequest:friendRequestReducer,
    bill:billReducer
})