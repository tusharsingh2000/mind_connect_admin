importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js')

const firebaseConfig = {
  apiKey: 'AIzaSyAyC2asXqP5DqQiHhMjfezHKIQskD4kPwI',
  authDomain: 'pv-mentoring.firebaseapp.com',
  projectId: 'pv-mentoring',
  storageBucket: 'pv-mentoring.appspot.com',
  messagingSenderId: '807622030916',
  appId: '1:807622030916:web:2251a047d2e357cd216e11',
  measurementId: 'G-K4F3ZBWR2G'
}

firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message: ', payload)
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico',
    click_action: payload.data.notification.click_action
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
