import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogged: false,
    userDetails: {},
  },
  reducers: {
    setLogin: (state, action) => {
      // console.log(action.payload);
      state.isLogged = action.payload;
      if (action.payload === false) {
        state.userDetails = {};
      }
    },
    setUserDetails: (state, action) => {
      console.log("in setUserDetails", action.payload);
      state.userDetails = action.payload;
    },
  },
});

export const { setLogin, setUserDetails } = userSlice.actions;
export const loginState = (state) => state.user.isLogged;
export const getUserDetails = (state) => state.userDetails;

export default userSlice.reducer;
