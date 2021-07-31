import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from '@state/index'

import '@utils/firebase'
import '@utils/twindSetup'
import 'twind/shim'

import 'react-toastify/dist/ReactToastify.min.css'
import '@styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Next App Boilerplate</title>
        <meta name="description" content="Next App Boilerplate" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />

      <ToastContainer />
    </Provider>
  )
}

export default MyApp
