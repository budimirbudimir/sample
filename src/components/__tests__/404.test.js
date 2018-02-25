import React from 'react'
import PageNotFound from '../404'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

it('Renders without crashing', () => {
	const tree = renderer
		.create(
			<BrowserRouter>
				<PageNotFound />
			</BrowserRouter>,
		)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
