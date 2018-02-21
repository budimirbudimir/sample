import React from 'react'
import Tags from '../Tags'
import renderer from 'react-test-renderer'

const tags = [{ name: 'rock', url: 'http://budimirx2.com/rock' }]

it('renders correctly', () => {
	const tree = renderer.create(<Tags tags={tags} />).toJSON()
	expect(tree).toMatchSnapshot()
})
