import React from 'react'
import { shallow } from 'enzyme'

import Login from '../Login'

const loginError = ''

describe('Login', () => {
	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Login loginError={loginError} />)
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
			wrapper.containsMatchingElement(<button type="submit">Login</button>),
		).toBe(true)
	})
})
