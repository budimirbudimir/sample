import React from 'react'

import { storiesOf } from '@storybook/react'
import { BrowserRouter } from 'react-router-dom'

import PageNotFound from '../components/404'
import '../styles/App.css'

storiesOf('PageNotFound', module).add('Default state', () => (
	<BrowserRouter>
		<PageNotFound />
	</BrowserRouter>
))
