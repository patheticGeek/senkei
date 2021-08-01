import { useEffect } from 'react'

import { login, logout, useAppDispatch } from '@state/index'
import { auth } from '@utils/firebase'

const useAuth = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const subscription = auth.onAuthStateChanged((user) => {
      if (user) {
        const { uid, email: _email } = user
        dispatch(login({ uid, email: _email || undefined }))
      } else {
        dispatch(logout)
      }
    })
    return () => {
      subscription()
    }
  }, [dispatch])
}

export default useAuth
