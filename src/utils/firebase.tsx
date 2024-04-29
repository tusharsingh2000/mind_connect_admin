// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAyC2asXqP5DqQiHhMjfezHKIQskD4kPwI',
  authDomain: 'pv-mentoring.firebaseapp.com',
  projectId: 'pv-mentoring',
  storageBucket: 'pv-mentoring.appspot.com',
  messagingSenderId: '807622030916',
  appId: '1:807622030916:web:2251a047d2e357cd216e11',
  measurementId: 'G-K4F3ZBWR2G'
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
export default firebaseApp
