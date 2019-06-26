/* eslint no-console: 0 */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const vision = require('@google-cloud/vision')

const NOTIFICATION_TITLE = 'cat-watcher'

admin.initializeApp()

// auth
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

// firestore
exports.subscribeTopic = functions.firestore
  .document('/users/{userId}')
  .onUpdate(async (change, context) => {
    const token = change.after.data().messagingToken
    console.log(token)
    const res = await admin.messaging().subscribeToTopic(token, '/topics/cat')
    console.log(res)
    return null
  })

exports.sendMessage = functions.firestore
  .document('/images/{imageId}')
  .onCreate(async (snap, context) => {
    const message = {
      notification: {
        title: NOTIFICATION_TITLE,
        body: '新しい画像が追加されました',
        icon: 'https://cat-watcher.firebaseapp.com/android-chrome-512x512.png',
        click_action: 'https://cat-watcher.firebaseapp.com/'
      }
    }
    await admin.messaging().sendToTopic('/topics/cat', message)
    return null
  })

// storage
exports.createImageData = functions.storage
  .object()
  .onFinalize(async object => {
    if (!object.contentType.startsWith('image/')) {
      console.error('This is not an image.')
      return null
    }
    if (object.metageneration !== '1') {
      console.info('updated.')
      return null
    }
    const client = new vision.ImageAnnotatorClient()
    const [result] = await client.labelDetection(
      `gs://${object.bucket}/${object.name}`
    )
    console.log(result.labelAnnotations)
    const cat = result.labelAnnotations.filter(
      annotation => annotation.description === 'Cat'
    )
    const file = admin
      .storage()
      .bucket(object.bucket)
      .file(object.name)
    if (cat.length > 0) {
      const [downloadUrl] = await file.getSignedUrl({
        action: 'read',
        expires: '01-01-2050'
      })
      const ref = admin
        .firestore()
        .collection('images')
        .doc()
      const data = {
        id: ref.id,
        name: object.name,
        url: downloadUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
      await ref.set(data)
    } else {
      await file.delete()
      console.log('deleted')
    }

    return null
  })
