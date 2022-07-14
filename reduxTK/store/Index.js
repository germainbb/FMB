import { configureStore } from '@reduxjs/toolkit'
import  counterReducer  from '../reducers/User'

export const store = configureStore({
  reducer: {
    user: counterReducer,
  },
})