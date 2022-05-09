import { configureStore } from '@reduxjs/toolkit'
import  {counterSlice}  from '../reducers/User'

export const store = configureStore({
  reducer: {
    user: counterSlice,
  },
})