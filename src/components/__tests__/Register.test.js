import React from 'react'
import { shallow } from 'enzyme'

import Register from '../Register'

const registerError = ''

describe('Register', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Register regError={registerError} />)
	})

	it('matches snapshot', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should have email input', () => {
		expect(
			wrapper.containsMatchingElement(
				<input type="text" placeholder="Email" />,
			),
		).toBe(true)
	})

	it('should have password input', () => {
		expect(
			wrapper.containsMatchingElement(
				<input type="password" placeholder="Password" />,
			),
		).toBe(true)
	})

	it('should have submit button', () => {
		expect(
			wrapper.containsMatchingElement(<button type="submit">Register</button>),
		).toBe(true)
	})
})
