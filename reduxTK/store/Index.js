import { configureStore } from '@reduxjs/toolkit'
import  counterReducer  from '../reducers/User'
import  postsReducer  from '../reducers/PostsSlice'

export const store = configureStore({
  reducer: {
    user: counterReducer,
    posts: postsReducer,
    
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})