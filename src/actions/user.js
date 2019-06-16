import { ref, firebaseAuth } from '../config'
import * as types from '../actionTypes'

export const auth = (email, pw) => ({
  type: types.AUTH,
  payload: firebaseAuth()
    .createUserWithEmailAndPassword(email, pw)
    .then(saveUser)
})

export const setRegisterError = message => ({
  type: `${types.AUTH}_REJECTED`,
  payload: { message }
})

// Log user in order to see session-locked pages
export const login = (email, pw) => ({
  type: types.LOGIN,
  payload: firebaseAuth()
    .signInWithEmailAndPassword(email, pw)
    .then(saveLocal)
})

export const setLoginError = message => ({
  type: `${types.LOGIN}_REJECTED`,
  payload: { message }
})

// Log out currently logged in user
export const logout = () => ({
  type: types.LOGOUT,
  payload: firebaseAuth().signOut()
})

// Reset password for existing user by e-mail
export const resetPassword = email => ({
  type: types.RESET_PASSWORD,
  payload: firebaseAuth().sendPasswordResetEmail(email)
})

// Saves newly registered user's data in DB
export const saveUser = user => ({
  type: types.SAVE_USER,
  payload: ref
    .child(`users/${user.uid}/info`)
    .set({
      email: user.email,
      uid: user.uid
    })
    .then(() => user)
})

// Gets current user's favorite artists list
export const getFavorites = userID => ({
  type: types.GET_FAVORITES,
  payload: ref
    .child(`users/${userID}/favs`)
    .once('value')
    .then(snap => snap.val())
})

// Saves current artist into current user's favorites
export const addFavorite = (userID, artist) => ({
  type: types.ADD_FAVORITE,
  payload: ref
    .child(`users/${userID}/favs/${artist.mbid}`)
    .set({
      id: artist.mbid,
      name: artist.name,
      image: artist.image['2']['#text']
    })
    .then(() => artist)
})

// Saves current artist into current user's favorites
export const removeFavorite = (userID, artistID) => ({
  type: types.REMOVE_FAVORITE,
  payload: ref
    .child(`users/${userID}/favs/${artistID}`)
    .remove()
    .then(() => artistID)
})

// Saves current user ID in localStorage for persistent use
const saveLocal = user => {
  localStorage.setItem('currentUser', user.uid)
}
