import { useEffect, useState } from 'react'
import { getMessaging, getToken } from 'firebase/messaging'
import firebaseApp from './firebase'

const useFcmToken = () => {
  const [token, setToken] = useState('')
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState('')
  const retrieveToken = async () => {
    try {
      if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
        const messaging = getMessaging(firebaseApp)

        // Retrieve the notification permission status
        const permission = await Notification.requestPermission()
        setNotificationPermissionStatus(permission)

        // Check if permission is granted before retrieving the token
        if (permission === 'granted') {
          const currentToken = await getToken(messaging, {
            vapidKey: 'BJwEvPP4UmwjfnNyloFE81_zcExnSLJZXR3PlebuOtqN2-JtSfseBCMj9cM8KSLa7V9LwM6bSE9fuRaRMrLajkI'
          })
          if (currentToken) {
            setToken(currentToken)
          } else {
            console.log('No registration token available. Request permission to generate one.')
          }
        }
      }
    } catch (error) {
      console.log('An error occurred while retrieving token:', error)
    }
  }

  useEffect(() => {
    retrieveToken()
  }, [])

  return { fcmToken: token, notificationPermissionStatus }
}

export default useFcmToken
