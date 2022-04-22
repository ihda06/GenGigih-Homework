import { configureStore } from '@reduxjs/toolkit'
import { searchResultSlice } from './searchResultSlice'
import tokenSlice from './tokenSlice'
import { userSlice } from './userSlice'

export default configureStore({
  reducer: {
      token: tokenSlice.reducer,
      user: userSlice.reducer,
      searchResult: searchResultSlice.reducer
  },
})