
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js')
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js')

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// eslint-disable-next-line no-undef
firebase.default.initializeApp({
  apiKey: 'AIzaSyDKX_bJtNR_wxwlo05_Kw-u5J02WbXt46c',
  authDomain: 'homedoctor-b1f7e.firebaseapp.com',
  projectId: 'homedoctor-b1f7e',
  storageBucket: 'homedoctor-b1f7e.appspot.com',
  messagingSenderId: '295687424559',
  appId: '1:295687424559:web:d6c77403eb029b807514da',
  measurementId: 'G-YDBLRLRFLV'
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
// eslint-disable-next-line no-undef
const messaging = firebase.messaging()
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('payload firebase: ', payload)
  const title = 'message'
  const option = {
    body: 'This is test message'
  }
  return self.registration.showNotification(title, option)
})
