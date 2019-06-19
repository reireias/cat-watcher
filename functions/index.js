const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.createUserData = functions.auth.user().onCreate(user => {
  const data = {
    name: user.email.split('@')[0],
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
    uid: user.uid,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  }
  const db = admin.firestore()
  const ref = db.collection('users').doc(user.uid)
  ref.set(data)
  return 0
})

exports.deleteUserData = functions.auth.user().onDelete(user => {
  const db = admin.firestore()
  db.collection('users')
    .doc(user.uid)
    .delete()
  return 0
})
