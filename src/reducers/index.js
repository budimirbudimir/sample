import { combineReducers } from 'redux'

import user from './user'
import artists from './artists'

const reducers = {
	user,
	artists,
}

export default combineReducers(reducers)
