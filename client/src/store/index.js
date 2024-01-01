import { authReducer } from "./authReducer";
import { flagForDialogReducer } from "./flagForDialogReducer";
import { friendPostsReducer } from "./FriendPosts";
import { isLoadingReducer } from "./IsLoadingReducer";
import { postsReducer } from "./postsReducer";
import { themeReducer } from "./themeReducer";
import { userInfoReducer } from "./userInfoReducer";
import { userReducer } from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    flagForDialog: flagForDialogReducer,
    auth: authReducer,
    isLoading: isLoadingReducer,
    user: userReducer,
    posts: postsReducer,
    friendPosts: friendPostsReducer,
    userInfo: userInfoReducer,
    theme: themeReducer,
  },
});
