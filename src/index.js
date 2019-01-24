import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './store'
import AppRouterContainer from './containers/AppRouterContainer'

ReactDOM.render(
	<Provider store={store}>
		<AppRouterContainer />
	</Provider>,
	document.getElementById('root'),
)
