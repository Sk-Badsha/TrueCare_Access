import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // or use `sessionStorage` if you prefer
import alertSlice from "./features/alertSlice";
import authSlice from "./features/authSlice";
import { combineReducers } from "@reduxjs/toolkit";
const persistConfig = {
  key: "root",
  storage,
  whitelists: ["auth"],
};
const rootReducer = combineReducers({
  auth: authSlice,
  alerts: alertSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the serialization check
    }),
});

export const persistor = persistStore(store);
export default store;
