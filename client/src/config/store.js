import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";

import vendorReducer from "../features/vendorSlice";
import venueReducer from "../features/venue/venueSlice.js"
import cartReducer from "../features/cartSlice.js"


export const store = configureStore({
  reducer: {
    user: userReducer,

    vendor: vendorReducer,

    venue: venueReducer,
    cart:cartReducer,

  },
});
