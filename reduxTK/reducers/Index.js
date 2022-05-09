import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  users: [],
  feed: [],
}

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    users: (state, action) => {
      state.users = action.payload
    },
    
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer