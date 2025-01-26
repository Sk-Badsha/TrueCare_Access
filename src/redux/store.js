import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./features/alertSlice";
import authSlice from "./features/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth: authSlice,
  alerts: alertSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
