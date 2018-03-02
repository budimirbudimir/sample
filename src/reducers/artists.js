// @flow

import type { Action } from 'redux'
import type { TopTrack, Artist, TopArtist, SimilarArtist, Tag } from '../models'

type StatsData = {
	// listeners is string representing number of target artist's unique listeners
	listeners: string,
	// playcount is string representing number of artist's total plays
	playcount: string,
}

type InitialTargetData = {
	// name is string representing targeted artist's name
	name: string,
	// link is string representing targeted artist's Last.fm URL
	link: string,
	// stats is object containing artist's current stats (listeners/playcount)
	stats: StatsData,
	// bio is string representing targeted artist's full biography
	bio: string,
	// summary is string representing targeted artist's shortened biography
	summary: string,
	// image is string representing targeted artist's image URL
	image: string,
	// similar is array containing data of artists similar to current artist
	similar: SimilarArtist[],
	// tags is array containing tags similar to current artist
	tags: Tag[],
}

type InitialStateData = {
	// topTracks is array containing all tracks from Trending chart
	// with their relevant data
	topTracks: TopTrack[],
	// topArtists is array containing all artists from Trending chart
	// with their relevant data
	topArtists: TopArtist[],
	// target is object containing currently viewed artist's data
	target: InitialTargetData,
	// expanded points to current target artists bio state (show more/less)
	expanded: boolean,
	// results is array containing results returned from artists search query
	results: Artist[],
}

const initialTarget: InitialTargetData = {
	name: '',
	link: '',
	stats: {
		listeners: '',
		playcount: '',
	},
	bio: '',
	summary: '',
	image: '',
	similar: [],
	tags: [],
}

export const initialState: InitialStateData = {
	topTracks: [],
	topArtists: [],
	fetchingTrending: false,
	fetchedTrending: false,
	target: initialTarget,
	fetchingTarget: false,
	fetchedTarget: false,
	expanded: false,
	results: [],
}

const artists = (
	state: InitialStateData = initialState,
	action: Action,
): InitialStateData => {
	switch (action.type) {
	// Trending section actions
	case 'FETCH_TRENDING_REJECTED':
		return {
			...state,
			...{ ferror: action.payload },
		}
	case 'FETCH_TRENDING_FULFILLED':
		return {
			...state,
			...{ topArtists: action.payload.data.artists.artist },
		}

	case 'FETCH_TOP_TRACKS_FULFILLED':
		return {
			...state,
			...{ topTracks: action.payload.data.tracks.track },
		}

		// Current artist actions
	case 'SEARCH_ARTIST_FULFILLED':
		return {
			...state,
			...{ results: action.payload.data.results.artistmatches.artist },
		}
	case 'SET_ARTIST_REJECTED':
		return {
			...state,
			...{ error: action.payload },
		}
	case 'SET_ARTIST_FULFILLED':
		return {
			...state,
			...{
				target: action.payload.data.artist,
				targetImage: action.payload.data.artist.image['3']['#text'],
			},
		}
	case 'TOGGLE_BIO':
		return {
			...state,
			...{ expanded: !state.expanded },
		}

		// Fallback functionality
	default:
		return state
	}
}

export default artists
