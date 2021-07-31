export type User = {
  uid: string
  displayName?: string
  email?: string
  phoneNumber?: number
  photoURL?: string
}

export type LoginState = {
  isLoggedIn: boolean
  user: null | User
  isLoading: boolean
}
