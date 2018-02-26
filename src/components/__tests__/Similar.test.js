import React from 'react'
import Similar from '../Similar'
import renderer from 'react-test-renderer'

const similar = [
	{ name: 'Lou Reed', url: 'https://www.last.fm/music/Lou+Reed' },
	{ name: 'Iggy Pop', url: 'https://www.last.fm/music/Iggy+Pop' },
	{ name: 'Tin Machine', url: 'https://www.last.fm/music/Tin+Machine' },
	{ name: 'T. Rex', url: 'https://www.last.fm/music/T.+Rex' },
	{ name: 'Roxy Music', url: 'https://www.last.fm/music/Roxy+Music' },
]

it('Renders without crashing', () => {
	const tree = renderer
		.create(<Similar similar={similar} fetchArtist={() => null} />)
		.toJSON()
	expect(tree).toMatchSnapshot()
})
