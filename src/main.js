import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en'
import { register } from 'register-service-worker'
import { setTokenFirebase } from './utils/cookie'

var firebaseConfig = {
  apiKey: 'AIzaSyDKX_bJtNR_wxwlo05_Kw-u5J02WbXt46c',
  authDomain: 'homedoctor-b1f7e.firebaseapp.com',
  projectId: 'homedoctor-b1f7e',
  storageBucket: 'homedoctor-b1f7e.appspot.com',
  messagingSenderId: '295687424559',
  appId: '1:295687424559:web:d6c77403eb029b807514da',
  measurementId: 'G-YDBLRLRFLV'
}
var firebase = require('firebase/app')
require('firebase/messaging')
firebase.default.initializeApp(firebaseConfig) // init firebase

const messaging = firebase.default.messaging()
messaging.requestPermission().then(function () {
  console.log('Have permission')
  return messaging.getToken()
})
  .then((token) => {
    console.log('Token firebase:::', token)
    setTokenFirebase(token)
  })
  .catch((err) => {
    console.log('Have not permission', err)
    if ('serviceWorker' in navigator) {
      register('../public/firebase-messaging-sw.js', { scope: '../public_html/' })
        .then(function (registration) {
          console.log('Registration successful, scope is:', registration.scope)
        }).catch(function (err) {
          console.log('Service worker registration failed, error:', err)
        })
    }
  })
messaging.onMessage(payload => {
  console.log('Message from firebase:::', payload)
  store.dispatch('notifications/newMessage', null, { root: true })
  ElementUI.Message.info({ dangerouslyUseHTMLString: true, message: `<h4 style="color: black;">${payload.notification.title}</h4><div style="width: 100%; height: 1px; background-color: grey;"></div><p style="margin-top: .5em; color: black;">${payload.notification.body}</p>`, duration: 0, showClose: true })
})

Vue.config.productionTip = false
Vue.use(ElementUI, { locale })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
