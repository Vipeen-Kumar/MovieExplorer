import { configureStore } from '@reduxjs/toolkit'
import movieExplorerReducer from './movieExplorerSlice'
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {
    movieExplorerData : movieExplorerReducer,
    user: userReducer
  },
})