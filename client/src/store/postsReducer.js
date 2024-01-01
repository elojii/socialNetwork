import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: []
}

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        changePosts(state,action) {
            state.posts = action.payload
        },
        clearPosts(state) {
            state.posts = [];
          },
    }
})

export const postsReducer = postsSlice.reducer
export const postsActions = postsSlice.actions