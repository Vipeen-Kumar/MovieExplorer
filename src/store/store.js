import { configureStore } from '@reduxjs/toolkit'
import movieExplorerReducer from './movieExplorerSlice'

export const store = configureStore({
  reducer: {
    movieExplorerData : movieExplorerReducer
  },
})