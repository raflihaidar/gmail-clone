// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCzzpSER0A6G9D6OTfec34EqEPpE3EGN68',
  authDomain: 'clone2-c996d.firebaseapp.com',
  projectId: 'clone2-c996d',
  storageBucket: 'clone2-c996d.appspot.com',
  messagingSenderId: '356321191628',
  appId: '1:356321191628:web:15d992064ed5b75d41c469',
  measurementId: 'G-F1FCX80YF7'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
