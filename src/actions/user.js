// @flow

import { ref, firebaseAuth } from '../config'

import type { Artist, User } from '../models'

// Registers new user, then runs action to save it in DB
export const auth = (email: string, pw: string) => ({
	type: 'AUTH',
	payload: firebaseAuth()
		.createUserWithEmailAndPassword(email, pw)
		.then(saveUser),
})

// Log user in order to see session-locked pages
export const login = (email: string, pw: string) => ({
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
export const resetPassword = (email: string) => ({
	type: 'RESET_PASSWORD',
	payload: firebaseAuth().sendPasswordResetEmail(email),
})

// Saves newly registered user's data in DB
export const saveUser = (user: User) => ({
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
export const getFavorites = (userID: string) => ({
	type: 'GET_FAVORITES',
	payload: ref
		.child(`users/${userID}/favs`)
		.once('value')
		.then(snap => snap.val()),
})

// Saves current artist into current user's favorites
export const addFavorite = (userID: string, artist: Artist) => ({
	type: 'ADD_FAVORITE',
	payload: ref
		.child(`users/${userID}/favs/${artist.mbid}`)
		.set({
			id: artist.mbid,
			name: artist.name,
			image: artist.image['3']['#text'],
		})
		.then(() => artist),
})

// Saves current artist into current user's favorites
export const removeFavorite = (userID: string, artistID: string) => ({
	type: 'REMOVE_FAVORITE',
	payload: ref
		.child(`users/${userID}/favs/${artistID}`)
		.remove()
		.then(() => artistID),
})

// HELPERS:

// Saves current user ID in localStorage for persistent use
const saveLocal = (user: User) => {
	localStorage.setItem('currentUser', user.uid)
}
