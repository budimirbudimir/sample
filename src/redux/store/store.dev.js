import { createStore, applyMiddleware, compose } from 'redux'
// import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import reducers from '../rootReducer'
import rootSaga from '../rootSaga'

// Show logs collapsed (by default) in console
// const logger = createLogger({ collapsed: true })

const sagaMiddleware = createSagaMiddleware()

const middleware = [
  require('redux-immutable-state-invariant').default(),
  thunk,
  sagaMiddleware
]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware))
)
sagaMiddleware.run(rootSaga)

// TODO See where this one fits in?
export const action = type => store.dispatch({ type })
