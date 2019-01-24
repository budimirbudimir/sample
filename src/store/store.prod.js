import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import reducers from '../reducers'

const middleware = [promise(), thunk]

export const store = createStore(
  reducers,
  applyMiddleware(...middleware)
)
