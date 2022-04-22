import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'userData',
  initialState: {
    userinfo: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions

export default userSlice