import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    details: null,
    image:null // better null than empty string
  },
  reducers: {
    login: (state, action) => {
      state.details = action.payload;
    },
    logout: (state) => {
      state.details = null;
    },
    images:(state, action) =>{
      state.image= action.payload
    }
  },
});

export const { login, logout,images } = userSlice.actions;
export default userSlice.reducer;
