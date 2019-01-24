import React from 'react'

import TopTracks from './TopTracks'
import Trending from './Trending'

const Home = ({ topArtists, topTracks }) => (
	<div className="Home">
		<div className="Home-inner">
			<h3>
				Welcome to Last.fm Navigator! <br />These are currently trending tracks:
			</h3>

			<TopTracks tracks={topTracks} />
		</div>

		<Trending artists={topArtists} fetchArtist={null} />
	</div>
)

export default Home
