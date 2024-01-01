import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "#1565c0",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme(state, action) {
      console.log(action);
      document.documentElement.style.setProperty(
        "--theme-color",
        action.payload
      );
      state.theme = action.payload;
    },
  },
});

export const themeReducer = themeSlice.reducer;
export const themeActions = themeSlice.actions;