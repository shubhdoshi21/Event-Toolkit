import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import vendorReducer from "../features/vendorSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
  },
});
