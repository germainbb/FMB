import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  post: [],
}

export const PostsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchAllPosts: (state, action) => {
      state.post = action.payload
    },
    
    addpost: (state, action) => {
      state.post = action.payload
    },
    deletepost: (state, action) => {
      state.post -= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetchAllPosts, addpost, deletepost } = PostsSlice.actions

export default PostsSlice.reducer