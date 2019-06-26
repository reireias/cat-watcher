/* eslint no-console: 0 */
const functions = require('firebase-functions')
const admin = require('firebase-admin')
const vision = require('@google-cloud/vision')

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

exports.subscribeTopic = functions.firestore
  .document('images')
  .onUpdate((change, context) => {
    console.log('onUpdate')
    console.log(change)
    console.log(context)
  })

exports.createImageData = functions.storage
  .object()
  .onFinalize(async object => {
    if (!object.contentType.startsWith('image/')) {
      console.error('This is not an image.')
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
      const data = {
        url: downloadUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
      admin
        .firestore()
        .collection('images')
        .add(data)
    } else {
      await file.delete()
      console.log('deleted')
    }

    return null
  })
