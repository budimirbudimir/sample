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
})
