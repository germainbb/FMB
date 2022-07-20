import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detail: {},
}

export const PostsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    savedetails: (state, action) => {
        state.detail 
      state.detail += action.payload
    },
    
    addpost: (state, action) => {
      state.post += action.payload
    },
    deletepost: (state, action) => {
      state.post -= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { fetchAllPosts, addpost, deletepost } = PostsSlice.actions

export default PostsSlice.reducer