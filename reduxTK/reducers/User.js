import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  posts: [],
}

export const counterSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null
  },
  reducers: {
    fetchuser: (state, action) => {
      
      state.currentUser = action.payload;
    
    },
    user: (state, action) => {
      
      state.posts.values = action.posts;
    },
    clearData: () => {
      return initialState
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // }
  }
})

// Action creators are generated for each case reducer function
export const { user, fetchUser, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer

// const initialState = {
//     currentUser: null
// }

// export const user = (state = initialState, action) => {
//     return {
//         ...state,
//         currentUser: action.currentUser
//     }
// }
