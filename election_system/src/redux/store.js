import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { placeReducer } from "./placeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    place: placeReducer,
  },
});
