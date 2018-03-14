import React from 'react'
import Similar from '../Similar'
import { shallow } from 'enzyme'

import SimilarMock from '../../mocks/SimilarMock'

describe('Similar', () => {
	it('matches snapshot', () => {
		const wrapper = shallow(
			<Similar similar={SimilarMock} fetchArtist={() => null} />,
		)
		expect(wrapper).toMatchSnapshot()
	})
})
