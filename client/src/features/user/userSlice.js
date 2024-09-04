import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  email: "",
  firstName: "",
  lastName: "",
  userType: "",
  contactNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { _id, email, firstName, lastName, userType, contactNumber } =
        action.payload;
      state._id = _id;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.userType = userType;
      state.contactNumber = contactNumber;
    },
    logoutUser: (state) => {
      state._id = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.userType = "";
      state.contactNumber = "";
    },
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;
