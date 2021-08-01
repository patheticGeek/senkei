import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

import { login, useAppDispatch, useLoginState } from '@state/index'
import { auth } from '@utils/firebase'

function Login() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const loginState = useLoginState()
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (loginState.isLoggedIn) {
      router.push('/')
    }
  }, [router, loginState])

  const signUp = async () => {
    setIsLoading(true)
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(
        email,
        pass
      )
      if (!userCredential.user) return
      const { uid, email: _email } = userCredential.user
      dispatch(login({ uid, email: _email || undefined }))
      toast.success('Account Created')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  const signIn = async () => {
    setIsLoading(true)
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, pass)
      if (!userCredential.user) return
      const { uid, email: _email } = userCredential.user
      dispatch(login({ uid, email: _email || undefined }))
      toast.success('You are successfully logged in')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
    setIsLoading(false)
  }

  const forgotPass = async () => {
    if (isLoading) return
    setIsLoading(true)
    try {
      await auth.sendPasswordResetEmail(email)
      toast.success('Password reset email sent')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    }
    setIsLoading(false)
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
                className="appearance-none  rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </p>
            </div>
          </div>

          <div className="flex">
            <button
              type="submit"
              onClick={signIn}
              disabled={isLoading}
              className="group relative disabled:opacity-75 w-full flex justify-center mx-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Log In
            </button>
            <button
              type="submit"
              onClick={signUp}
              disabled={isLoading}
              className="group relative disabled:opacity-75 w-full flex justify-center mx-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
