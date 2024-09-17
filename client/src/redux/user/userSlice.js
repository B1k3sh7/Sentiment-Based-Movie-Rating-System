import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.error = false;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
    },
    logOutSuccess: (state) => {
      (state.currentUser = null), (state.error = null);
    },
  },
});

export const { signInFailure, signInSuccess, logOutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
