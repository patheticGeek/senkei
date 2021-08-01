import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'

import { store } from '@state/index'
import useAuth from '@utils/hooks/useAuth'

import '@utils/firebase'
import '@utils/twindSetup'
import 'twind/shim'

import '@styles/globals.css'

const AuthListener = () => {
  useAuth()
  return null
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next App Boilerplate</title>
        <meta name="description" content="Next App Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AuthListener />

      <Component {...pageProps} />

      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  )
}

export default MyApp
