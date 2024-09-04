import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import venueReducer from "../features/venue/venueSlice.js"

export const store = configureStore({
  reducer: {
    user: userReducer,
    venue: venueReducer,
  },
});
