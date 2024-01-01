import { createSlice } from "@reduxjs/toolkit";

const storedUserData = JSON.parse(sessionStorage.getItem('user'))

const initialState = {
  user: storedUserData || {
    name: '',
    age: '',
    description: '',
    pfp: '',
    password: '',
    privateId: '',
    friends: [],
    friendRequest: [],
    dialogs: [],
  },
};


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser(state, action) {
      state.user = action.payload;
    },
    changeUserName(state, action) {
      state.user.name = action.payload;
    },
    changeUserAge(state, action) {
      state.user.age = action.payload;
    },
    changeUserDescription(state, action) {
      state.user.description = action.payload;
    },
    changeUserProfilePicture(state, action) {
      state.user.pfp = action.payload;
    },
    changeUserPassword(state, action) {
      state.user.password = action.payload;
    },
    changeUserFriends(state, action) {
      state.user.friends = action.payload;
    },
    changeUserFriendRequest(state, action) {
      state.user.friendRequest = action.payload;
    },
    changeUserDialog(state, action) {
      state.user.dialogs.push(action.payload);
    },
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
