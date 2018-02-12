import { createStore, applyMiddleware } from 'redux'

// import axios from 'axios'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

// import { lastfmKey } from '../utils'
import rootReducer from '../reducers'

const middleware = applyMiddleware(promise(), thunk, logger)

export const store = createStore(rootReducer, middleware)

// store.dispatch({
//   type: 'FETCH_TRENDING',
//   payload: axios.get(`http://ws.audioscrobbler.com/2.0/?method=chart.getTopArtists&format=json&api_key=${lastfmKey}`)
// })
