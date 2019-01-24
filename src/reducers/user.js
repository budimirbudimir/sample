import * as types from '../actionTypes'

export const initialState = {
	authedUserFavs: [],
	loginError: null,
	registrationError: null,
	favoriteError: null,
}

const user = (
	state = initialState,
	action,
) => {
	switch (action.type) {
	// USER actions
	case `${types.AUTH}_FULFILLED`:
		return {
			...state,
			...{ registrationError: null },
		}
	case `${types.AUTH}_REJECTED`:
		return {
			...state,
			...{ registrationError: action.payload.message },
		}

	case `${types.LOGIN}_FULFILLED`:
		return {
			...state,
			...{ loginError: null },
		}
	case `${types.LOGIN}_REJECTED`:
		return {
			...state,
			...{ loginError: action.payload.message },
		}

	case `${types.LOGOUT}_FULFILLED`:
		// Remove current user from the state
		return {
			...state,
			...{ authedUserFavs: [] },
		}

	case `${types.RESET_PASSWORD}_FULFILLED`:
		return {
			...state,
			...{ loginError: null },
		}
	case `${types.RESET_PASSWORD}_REJECTED`:
		return {
			...state,
			...{ loginError: action.payload.message },
		}

	case types.SAVE_USER:
		// TODO: Handle logic.
		return state

	case `${types.ADD_FAVORITE}_FULFILLED`:
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
	case `${types.ADD_FAVORITE}_REJECTED`:
		return {
			...state,
			...{ favoriteError: action.payload.message },
		}

	case `${types.REMOVE_FAVORITE}_FULFILLED`:
		return {
			...state,
			...{
				favoriteError: null,
				authedUserFavs: state.authedUserFavs.filter(
					fav => fav.id !== action.payload,
				),
			},
		}
	case `${types.REMOVE_FAVORITE}_REJECTED`:
		return {
			...state,
			...{ favoriteError: action.payload.message },
		}

	case `${types.GET_FAVORITES}_FULFILLED`:
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
