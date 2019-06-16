import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'
import AppRouter from './routes/AppRouter'
import './App.css'

render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
)
