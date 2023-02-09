import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checkin",
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onCheckin: (state) => {
      state.status = "checkin";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCheckin, onLogin, onLogout } = authSlice.actions;
