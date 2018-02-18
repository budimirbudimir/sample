import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from '../reducers'

// Show logs collapsed (by default) in console
const logger = createLogger({ collapsed: true })

const middleware = applyMiddleware(promise(), thunk, logger)

export const store = createStore(reducers, middleware)
