// @flow

import React from 'react'

import type { TopArtist, TopTrack } from '../models'

import TopTracks from './TopTracks'
import Trending from './Trending'

type Props = {
	// topArtists is array containing all artists from Trending chart
	// with their relevant data
	topArtists: TopArtist[],
	// topTracks is array containing all tracks from Trending chart
	// with their relevant data
	topTracks: TopTrack[],
	// fetchTrending is action for fetching all Trending chart artists
	// together with their relevant data
	fetchTrending: () => void,
	// fetchTopTracks is action for fetching all trending chart tracks
	// together with their relevant data
	fetchTopTracks: () => void,
	// setArtist is action for fetching artist by current search query
	setArtist: string => void,
}

const Home = ({ topArtists, topTracks }: Props) => (
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
