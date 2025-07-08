import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { placeReducer } from "./placeSlice";
import { tapeReducer } from "./electoralStripsSlice";
import { notificationsReducer } from "./notificationSlice";
import { financeReducer } from "./financeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    place: placeReducer,
    tape: tapeReducer,
    notifications: notificationsReducer,
    finance: financeReducer,
  },
});
  