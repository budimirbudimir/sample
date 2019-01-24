import React from 'react'
import { Link } from 'react-router-dom'
import PageNotFound from '../404'
import { shallow } from 'enzyme'

describe('404', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<PageNotFound />)
	})

	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should have a title', () => {
		expect(wrapper.containsMatchingElement(<h1>Error 404</h1>)).toBe(true)
	})

	it('should have a link', () => {
		expect(
			wrapper.containsMatchingElement(<Link to="/">Go back to Home</Link>),
		).toBe(true)
	})

	it('should have link pointing to homepage', () => {
		const link = wrapper.find('Link').first()
		expect(link.props().to).toBe('/')
	})
})
