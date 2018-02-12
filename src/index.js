import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import App from './components/App'
import './styles/index.css'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root')
)

// TODO:
// 1. Solve type checking/marking
// 2. Try to add linting (eslint)
// 3. Add tests where applicable
// 4. Add Router and routes (needed for auth)
// 5. Add auth functionality (via Firebase?)
// 6. Add GraphQL server and queries
