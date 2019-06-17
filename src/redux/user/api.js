import { ref, firebaseAuth } from '../../config'
// import * as types from './actionTypes'

/**
 * AUTH SERVICE INTERACTIONS
 */
export const apiAuth = ({ email, pw }) =>
  firebaseAuth().createUserWithEmailAndPassword(email, pw)
// .then(saveUser) // TODO: Fix this inside of saga

// Log user in order to see session-locked pages
export const apiLogin = ({ email, pw }) =>
  firebaseAuth().signInWithEmailAndPassword(email, pw)
// .then(saveLocal) // TODO: Fix this inside of saga

// Log out currently logged in user
export const apiLogout = () => firebaseAuth().signOut()

// Reset password for existing user by e-mail
export const apiResetPassword = email =>
  firebaseAuth().sendPasswordResetEmail(email)

/**
 * DATABASE SERVICE INTERACTIONS
 */
// Saves newly registered user's data in DB
export const apiSaveUser = user =>
  ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)

// Gets current user's favorite artists list
export const apiGetFavorites = userID =>
  ref
    .child(`users/${userID}/favs`)
    .once('value')
    .then(snap => snap.val())

// Saves current artist into current user's favorites
export const apiAddFavorite = (userID, artist) =>
  ref
    .child(`users/${userID}/favs/${artist.mbid}`)
    .set({
      id: artist.mbid,
      name: artist.name,
      image: artist.image['2']['#text']
    })
    .then(() => artist)

// Saves current artist into current user's favorites
export const apiRemoveFavorite = (userID, artistID) =>
  ref
    .child(`users/${userID}/favs/${artistID}`)
    .remove()
    .then(() => artistID)

/**
 * HELPERS
 */

// Saves current user ID in localStorage for persistent use
export const saveLocal = user => {
  localStorage.setItem('currentUser', user.uid)
}
