import firebase from 'firebase/app'

import { isClientSide, isDev } from '@utils/common'

import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'
import 'firebase/firestore'

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

export const analytics = firebase.analytics
if (isClientSide()) firebase.analytics()
export const database = firebase.database()
export const firestore = firebase.firestore()
export const auth = firebase.auth()

// Helper functions
export const docWithId = (doc: firebase.firestore.DocumentData) => ({
  id: doc.id,
  ...doc.data()
})

export const getDocumentItem = async <T extends { id: string }>(
  docRef: firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
) => {
  const doc = await docRef.get()
  return docWithId(doc) as T
}

export const getCollectionItems = async <T extends {}>(
  collectionRef: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
) => {
  const snapshot = await collectionRef.get()
  const docs = snapshot.docs.map((snapshot) => docWithId(snapshot))
  return docs as T[]
}

// For easy debugging
if (isDev() && isClientSide()) {
  // @ts-ignore
  window.firebase = firebase
}

export default firebaseApp
