import { ref, firebaseAuth } from '../config'

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
			image: artist.image['3']['#text'],
		})
		.then(() => artist),
})

// Saves current artist into current user's favorites
// FIXME: Doesn't dispatch action properly? But removes item from DB
export const removeFavorite = (userID, artistID) => ({
	type: 'REMOVE_FAVORITE',
	payload: ref
		.child(`users/${userID}/favs/${artistID}`)
		.remove(() => {
			console.log('remove response', artistID)
			return artistID
		})
		.then(remFav(artistID)),
})

export const remFav = artistID => ({
	type: 'REM_FAV',
	payload: artistID,
})

// HELPERS:

// Saves current user ID in localStorage for persistent use
const saveLocal = user => {
	localStorage.setItem('currentUser', user.uid)
}
