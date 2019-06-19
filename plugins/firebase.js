import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: 'AIzaSyA7aBLYL0D1ksGvg03vRU-_ryBQRpO-lSk',
  authDomain: 'cat-watcher.firebaseapp.com',
  databaseURL: 'https://cat-watcher.firebaseio.com',
  projectId: 'cat-watcher',
  storageBucket: 'cat-watcher.appspot.com',
  messagingSenderId: '56760639980',
  appId: '1:56760639980:web:ae0b4ae91f7f78fc'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export default firebase
