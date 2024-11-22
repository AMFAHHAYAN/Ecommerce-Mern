import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = {
  userId: null,
  token: null,
  role: null,
};

const LoginUserSlice = createSlice({
  name: "loggedInUserDetails",
  initialState: initialState,
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action.payload);
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    resetLoginData: () => initialState,
  },
 
});
export const { loginSuccess, resetLoginData } = LoginUserSlice.actions;
export default LoginUserSlice.reducer;
