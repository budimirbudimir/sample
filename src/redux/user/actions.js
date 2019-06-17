import * as types from './actionTypes'

export const auth = (email, pw) => ({
  type: types.AUTH,
  payload: { email, pw }
})

export const setRegisterError = message => ({
  type: `${types.AUTH}_REJECTED`,
  payload: { message }
})

// Log user in order to see session-locked pages
export const login = (email, pw) => ({
  type: types.LOGIN,
  payload: { email, pw }
})

export const setLoginError = message => ({
  type: `${types.LOGIN}_REJECTED`,
  payload: { message }
})

// Log out currently logged in user
export const logout = () => ({
  type: types.LOGOUT
})

// Reset password for existing user by e-mail
export const resetPassword = email => ({
  type: types.RESET_PASSWORD,
  payload: email
})

// Saves newly registered user's data in DB
export const saveUser = user => ({
  type: types.SAVE_USER,
  payload: user
})

// Gets current user's favorite artists list
export const getFavorites = userID => ({
  type: types.GET_FAVORITES,
  payload: userID
})

// Saves current artist into current user's favorites
export const addFavorite = (userID, artist) => ({
  type: types.ADD_FAVORITE,
  payload: { userID, artist }
})

// Saves current artist into current user's favorites
export const removeFavorite = (userID, artistID) => ({
  type: types.REMOVE_FAVORITE,
  payload: { userID, artistID }
})

// Saves current user ID in localStorage for persistent use
// const saveLocal = user => {
//   localStorage.setItem('currentUser', user.uid)
// }
