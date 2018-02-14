import axios from 'axios'

import { API_URL, ref, firebaseAuth } from '../config'

// DATA FETCHING ACTIONS
export const fetchTrending = () => ({
	type: 'FETCH_TRENDING',
	payload: axios.get(`${API_URL}&method=chart.getTopArtists`),
})

export const setArtist = name => ({
	type: 'SET_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.getInfo&artist=${name}`),
})

// NOTE: In progress
export const searchArtist = name => ({
	type: 'SEARCH_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.search&artist=${name}`),
})

// UI ACTIONS

// Simply toggles current artist's biography/summary
export const toggleBio = () => ({
	type: 'TOGGLE_BIO',
})

// USER ACTIONS

// Registers new user, then runs action to save it in DB
export const auth = (email, pw) => ({
	type: 'AUTH',
	payload: firebaseAuth()
		.createUserWithEmailAndPassword(email, pw)
		.then(saveUser),
})

// Log user in order to see session-locked pages
export const login = (email, pw) => ({
	type: 'LOGIN',
	payload: firebaseAuth()
		.signInWithEmailAndPassword(email, pw)
		.then(saveLocal),
})

// Log out currently logged in user
export const logout = () => ({
	type: 'LOGOUT',
	payload: firebaseAuth().signOut(),
})

// Reset password for existing user by e-mail
export const resetPassword = email => ({
	type: 'RESET_PASSWORD',
	payload: firebaseAuth().sendPasswordResetEmail(email),
})

// Saves newly registered user's data in DB
export const saveUser = user => ({
	type: 'SAVE_USER',
	payload: ref
		.child(`users/${user.uid}/info`)
		.set({
			email: user.email,
			uid: user.uid,
		})
		.then(() => user),
})

// Gets current user's favorite artists list
export const getFavorites = userID => ({
	type: 'GET_FAVORITES',
	payload: ref
		.child(`users/${userID}/favs`)
		.once('value')
		.then(snap => snap.val()),
})

// Saves current artist into current user's favorites
export const addFavorite = (userID, artist) => ({
	type: 'ADD_FAVORITE',
	payload: ref
		.child(`users/${userID}/favs/${artist.mbid}`)
		.set({
			id: artist.mbid,
			name: artist.name,
		})
		.then(() => artist),
})

// Saves current artist into current user's favorites
export const removeFavorite = (userID, artist) => ({
	type: 'ADD_FAVORITE',
	payload: ref
		.child(`users/${userID}/favs/${artist.mbid}`)
		.remove()
		.then(() => artist),
})

// HELPERS

// Saves current user ID in localStorage for persistent use
const saveLocal = user => {
	localStorage.setItem('currentUser', user.uid)
}
