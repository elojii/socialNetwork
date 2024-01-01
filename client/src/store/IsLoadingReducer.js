import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

export const isLoadingSlice = createSlice({
  name:"isLoading",
  initialState,
  reducers: {
    setLoadingTrue(state) {
      state.isLoading = true
    },
    setLoadingFalse(state) {
      state.isLoading = false
    }
  }
})

export const isLoadingReducer = isLoadingSlice.reducer
export const isLoadingActions = isLoadingSlice.actions