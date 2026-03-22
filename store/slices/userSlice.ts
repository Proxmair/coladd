import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string | null
 
}

const initialState: UserState = {
  id: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) => {
      state.id = action.payload.id
    },

    logout: () => initialState,
  },
})

export const { setUser, logout } = userSlice.actions
export default userSlice.reducer