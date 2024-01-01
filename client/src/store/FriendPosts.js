import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    friendPosts: []
}

export const friendPostsSlice = createSlice({
    name:"friendPosts",
    initialState,
    reducers: {
        changeFriendPosts (state, action) {
            state.friendPosts = action.payload 
        },
        clearFriendPosts(state) {
            state.friendPosts = []
        }
    }
})

export const friendPostsReducer = friendPostsSlice.reducer
export const friendPostsActions = friendPostsSlice.actions