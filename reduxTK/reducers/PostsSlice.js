import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
}

export const counterSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    fetchPosts: (state, action) => {
      state.posts = action.payload
    },
    
    addpost: (state, action) => {
      state.posts += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer