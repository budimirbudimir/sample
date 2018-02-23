import React from 'react'
import Tags from '../Tags'
import renderer from 'react-test-renderer'

const tags = [
	{ name: 'rock', url: 'https://www.last.fm/tag/rock' },
	{ name: 'pop', url: 'https://www.last.fm/tag/pop' },
	{ name: 'metal', url: 'https://www.last.fm/tag/metal' },
	{ name: 'disco', url: 'https://www.last.fm/tag/disco' },
	{ name: 'reggae', url: 'https://www.last.fm/tag/reggae' },
]

it('Renders without crashing', () => {
	const tree = renderer.create(<Tags tags={tags} />).toJSON()
	expect(tree).toMatchSnapshot()
})
