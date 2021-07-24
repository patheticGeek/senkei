import firebase from '@firebase/app'
import { isClientSide, isDev } from '@utils/common'

import '@firebase/auth'
import '@firebase/database'
import '@firebase/analytics'
import '@firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  databaseURL: process.env.NEXT_PUBLIC_databaseURL,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId
}

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()

export const analytics = firebaseApp.analytics
if (isClientSide()) firebase.analytics()
export const database = firebaseApp.database
export const firestore = firebaseApp.firestore
export const auth = firebaseApp.auth

// For easy debugging
if (isDev() && isClientSide()) window.firebase = firebaseApp

export default firebaseApp
