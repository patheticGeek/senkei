import { LoginState, User } from '@interfaces/state'
import { createSlice, PayloadAction, useAppSelector } from '@reduxjs/toolkit'

const initialState: LoginState = {
  isLoggedIn: false,
  user: null,
  isLoading: false
}

const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isLoggedIn = true
    },
    logout: (state) => {
      state.user = null
      state.isLoggedIn = false
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = { ...state.user, ...action.payload }
    },
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    }
  }
})

export default loginSlice.reducer

export const { login, logout, setLoginLoading, updateUser } = loginSlice.actions

export const useLoginState = () => {
  return useAppSelector((state) => state.login)
}

export const useUser = () => {
  return useAppSelector((state) => state.login.user)
}
