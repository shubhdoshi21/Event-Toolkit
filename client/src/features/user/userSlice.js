import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: localStorage.getItem("user_id") || "",
  email: localStorage.getItem("user_email") || "",
  firstName: localStorage.getItem("user_firstName") || "",
  lastName: localStorage.getItem("user_lastName") || "",
  userType: localStorage.getItem("user_type") || "",
  contactNumber: localStorage.getItem("user_contactNumber") || "",
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

      localStorage.setItem("user_id", _id);
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_firstName", firstName);
      localStorage.setItem("user_lastName", lastName);
      localStorage.setItem("user_type", userType);
      localStorage.setItem("user_contactNumber", contactNumber);
    },
    logoutUser: (state) => {
      state._id = "";
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.userType = "";
      state.contactNumber = "";

      localStorage.removeItem("user_id");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_firstName");
      localStorage.removeItem("user_lastName");
      localStorage.removeItem("user_type");
      localStorage.removeItem("user_contactNumber");
    },
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;
