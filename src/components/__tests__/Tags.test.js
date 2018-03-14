import React from 'react'
import Tags from '../Tags'
import { shallow } from 'enzyme'

import TagsMock from '../../mocks/TagsMock'

describe('Tags', () => {
	it('matches snapshot', () => {
		const wrapper = shallow(<Tags tags={TagsMock} />)
		expect(wrapper).toMatchSnapshot()
	})
})
