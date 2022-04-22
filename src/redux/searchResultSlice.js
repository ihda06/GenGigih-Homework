import { createSlice } from '@reduxjs/toolkit'
import data from './../single-sample'

export const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState: {
    value: data,
    keyword: '',
  },
  reducers: {
    add: (state, action) => {
      state.value = action.payload
    },
    addKeyword: (state, action) => {
      state.keyword = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, addKeyword } = searchResultSlice.actions

export default searchResultSlice