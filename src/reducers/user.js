// @flow

import type { Action } from 'redux'

type InitialStateData = {
	// authedUserFavs is array of user's favorite artists, pulled from DB
	authedUserFavs: Array<any>,
}

export const initialState = {
	authedUserFavs: [],
	loginError: null,
	registrationError: null,
	favoriteError: null,
}

const user = (
	state: InitialStateData = initialState,
	action: Action,
): InitialStateData => {
	switch (action.type) {
	// USER actions
	case 'AUTH_FULFILLED':
		return {
			...state,
			...{ registrationError: null },
		}
	case 'AUTH_REJECTED':
		return {
			...state,
			...{ registrationError: action.payload.message },
		}

	case 'LOGIN_FULFILLED':
		return {
			...state,
			...{ loginError: null },
		}
	case 'LOGIN_REJECTED':
		return {
			...state,
			...{ loginError: action.payload.message },
		}

	case 'LOGOUT_FULFILLED':
		// Remove current user from the state
		return {
			...state,
			...{ authedUserFavs: [] },
		}

	case 'RESET_PASSWORD_FULFILLED':
		return {
			...state,
			...{ loginError: null },
		}
	case 'RESET_PASSWORD_REJECTED':
		return {
			...state,
			...{ loginError: action.payload.message },
		}

	case 'SAVE_USER':
		// TODO: Handle logic.
		return state

	case 'ADD_FAVORITE_FULFILLED':
		return {
			...state,
			...{
				favoriteError: null,
				authedUserFavs:
						state.authedUserFavs &&
						state.authedUserFavs.concat({
							id: action.payload.mbid,
							name: action.payload.name,
							image: action.payload.image,
						}),
			},
		}
	case 'ADD_FAVORITE_REJECTED':
		return {
			...state,
			...{ favoriteError: action.payload.message },
		}

	case 'REMOVE_FAVORITE_FULFILLED':
		return {
			...state,
			...{
				favoriteError: null,
				authedUserFavs: state.authedUserFavs.filter(
					fav => fav.id !== action.payload,
				),
			},
		}
	case 'REMOVE_FAVORITE_REJECTED':
		return {
			...state,
			...{ favoriteError: action.payload.message },
		}

	case 'GET_FAVORITES_FULFILLED':
		return {
			...state,
			...{ authedUserFavs: action.payload && Object.values(action.payload) },
		}

		// Fallback functionality
	default:
		return state
	}
}

export default user
