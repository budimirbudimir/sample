import { combineReducers } from 'redux'

import user from './user/reducer'
import artists from './artists/reducer'

const reducers = {
  user,
  artists
}

export default combineReducers(reducers)
