import { createSlice } from '@reduxjs/toolkit'
import {auth } from '../firebase'
import { doc, getDoc, orderBy, query } from "firebase/firestore";

const initialState = {
  myPosts: []
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserPosts: (state, action) => {
      state.myPosts = action.payload
    },
    deletePost: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
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






