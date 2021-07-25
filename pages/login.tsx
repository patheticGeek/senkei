import firebase from '@firebase/app'
import firebaseApp, { auth } from '@utils/firebase'
import React, { useState } from 'react'

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [user, setUser] = useState<null | {}>(null)

  const signUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        pass
      )
      const user = userCredential.user
      setUser(user)
      console.log('account created', user)
    } catch (error) {
      console.error(error)
    }
  }

  const signIn = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, pass)
      const user = userCredential.user
      setUser(user)
      console.log('welcome to your account', user)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="text"
        id="email"
        name="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="pass">Password:</label>
      <input
        type="text"
        id="pass"
        name="pass"
        onChange={(e) => setPass(e.target.value)}
      />
      <button onClick={signIn}>Sign In</button>
      <button onClick={signUp}> Sign Up</button>
    </div>
  )
}

export default Login
