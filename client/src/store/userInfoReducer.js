import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {
    name: '',
    age: '',
    pfp: '',
    description: '',
    password: '',
  },
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    changeName(state, action) {
      state.userInfo = { ...state.userInfo, name: action.payload };
    },
    changeAge(state, action) {
      state.userInfo = { ...state.userInfo, age: action.payload };
    },
    changePfp(state, action) {
      state.userInfo = { ...state.userInfo, pfp: action.payload };
    },
    changeDescription(state, action) {
      state.userInfo = { ...state.userInfo, description: action.payload };
    },
    changePassword(state, action) {
      state.userInfo = { ...state.userInfo, password: action.payload };
    },
  },
});

export const userInfoReducer = userInfoSlice.reducer
export const userInfoActions = userInfoSlice.actions
