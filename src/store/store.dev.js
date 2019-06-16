import { createStore, applyMiddleware, compose } from 'redux'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from '../reducers'

// Show logs collapsed (by default) in console
// const logger = createLogger({ collapsed: true })

const middleware = [
  require('redux-immutable-state-invariant').default(),
  promise(),
  thunk
  // logger,
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
)
