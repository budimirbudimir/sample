import { db, firebaseAuth as auth } from '../../config'
// import * as types from './actionTypes'

/**
 * AUTH SERVICE INTERACTIONS
 * NOTE Split from DB interactions.
 */
export const apiAuth = ({ email, pw }) =>
  auth().createUserWithEmailAndPassword(email, pw)

// Log user in order to see session-locked pages
export const apiLogin = ({ email, pw }) =>
  auth().signInWithEmailAndPassword(email, pw)

// Log out currently logged in user
export const apiLogout = () => auth().signOut()

// Reset password for existing user by e-mail
export const apiResetPassword = email => auth().sendPasswordResetEmail(email)

/**
 * DATABASE SERVICE INTERACTIONS
 * NOTE Split from Auth interactions.
 */
// Saves newly registered user's data in DB
export const apiSaveUser = user =>
  db
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)

// Gets current user's favorite artists list
export const apiGetFavorites = userID =>
  db
    .child(`users/${userID}/favs`)
    .once('value')
    .then(snap => snap.val())

// Saves current artist into current user's favorites
export const apiAddFavorite = ({ userID, artist }) =>
  db
    .child(`users/${userID}/favs/${artist.mbid}`)
    .set({
      id: artist.mbid,
      name: artist.name,
      image: artist.image['2']['#text']
    })
    .then(() => artist)

// Saves current artist into current user's favorites
export const apiRemoveFavorite = ({ userID, artistID }) =>
  db
    .child(`users/${userID}/favs/${artistID}`)
    .remove()
    .then(() => artistID)

/**
 * HELPERS
 * NOTE Abstract away to separate localStorage util file
 */

// Saves current user ID in localStorage for persistent use
export const saveLocal = user => {
  localStorage.setItem('currentUser', user.uid)
}
