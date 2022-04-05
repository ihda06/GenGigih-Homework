import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: "",
  },
  reducers: {
    add: (state, action) => {
      state.value = action.payload
    },
    remove: (state) => {
      state.value = ""
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove } = tokenSlice.actions

export default tokenSlice