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
})
