import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  loading: false,
  signUpData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSignUpData: (state, action) => {
      state.signUpData = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.signUpData = null;
    },
  },
});

export const { setToken, setLoading, setSignUpData, logout } = authSlice.actions;
export default authSlice.reducer;
