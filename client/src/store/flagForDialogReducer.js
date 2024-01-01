import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  flagForDialog: false,
};

export const flagForDialogSlice = createSlice({
  name:"flagForDialog",
  initialState,
  reducers: {
    setFlagDialogTrue(state) {
      state.flagForDialog = true
    },
    setFlagDialogFalse(state) {
      state.flagForDialog = false
    }
  }
})

export const flagForDialogReducer = flagForDialogSlice.reducer
export const flagForDialogActions = flagForDialogSlice.actions