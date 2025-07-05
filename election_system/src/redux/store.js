import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { placeReducer } from "./placeSlice";
import { tapeReducer } from "./electoralStripsSlice";
import notificationsReducer from "./notificationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    place: placeReducer,
    tape: tapeReducer,
    notifications: notificationsReducer,
  },
});
