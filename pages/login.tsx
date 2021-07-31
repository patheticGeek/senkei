import React, { useState } from 'react'

import { login, useAppDispatch, useUser } from '@state/index'
import { auth } from '@utils/firebase'

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const user = useUser()
  const [error, setError] = useState('')

  const dispatch = useAppDispatch()

  const signUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        pass
      )
      if (!userCredential.user) return
      const { uid, email: _email } = userCredential.user
      dispatch(login({ uid, email: _email || undefined }))
      console.log('account created', user)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const signIn = async () => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, pass)
      const user = userCredential.user
      if (!userCredential.user) return
      const { uid, email: _email } = userCredential.user
      dispatch(login({ uid, email: _email || undefined }))
      console.log('welcome to your account', user)
    } catch (error) {
      setError(error.message)
      console.error(error)
    }
  }

  const forgotPass = async () => {
    try {
      await auth.sendPasswordResetEmail(email)
      console.log('Password reset email sent')
    } catch (error) {
      setError(error.message)
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <p className="font-medium my-1 ml-1 text-red-400">{error}</p>
          )}

          <div className="flex items-center justify-end">
            <div className="text-sm">
              <p
                onClick={forgotPass}
                className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </p>
            </div>
          </div>

          <div className="flex">
            <button
              type="submit"
              onClick={signIn}
              className="group relative w-full flex justify-center mx-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Log In
            </button>
            <button
              type="submit"
              onClick={signUp}
              className="group relative w-full flex justify-center mx-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
