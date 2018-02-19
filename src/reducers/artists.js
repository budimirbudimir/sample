// @flow

import type { Action } from 'redux'

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
	similar: Array<any>,
	// tags is array containing tags similar to current artist
	tags: Array<any>,
}

type InitialStateData = {
	// topArtists is array containing all artists from Trending chart
	// with their relevant data
	topArtists: Array<any>,
	//fetchingTrending is boolean indicating if request is being run to obtain
	// current trending artists
	fetchingTrending: boolean,
	//fetchedTrending is boolean indicating if request has been successful to
	// obtain current trending artists
	fetchedTrending: boolean,
	// target is object containing currently viewed artist's data
	target: InitialTargetData,
	//
	fetchingTarget: boolean,
	//
	fetchedTarget: boolean,
	// expanded points to current target artists bio state (show more/less)
	expanded: boolean,
	// results is array containing results returned from artists search query
	results: Array<any>,
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
	case 'FETCH_TRENDING_PENDING':
		return {
			...state,
			...{ fetchingTrending: true },
		}
	case 'FETCH_TRENDING_REJECTED':
		return {
			...state,
			...{ fetchingTrending: false, error: action.payload },
		}
	case 'FETCH_TRENDING_FULFILLED':
		return {
			...state,
			...{
				topArtists: action.payload.data.artists.artist,
				fetchingTrending: false,
				fetchedTrending: true,
			},
		}

		// Current artist section actions
	case 'SET_ARTIST_PENDING':
		return {
			...state,
			...{ fetchingTarget: true },
		}
	case 'SET_ARTIST_REJECTED':
		return {
			...state,
			...{ fetchingTarget: false, error: action.payload },
		}
	case 'SET_ARTIST_FULFILLED':
		return {
			...state,
			...{
				target: action.payload.data.artist,
				targetImage: action.payload.data.artist.image['3']['#text'],
				fetchingTarget: false,
				fetchedTarget: true,
			},
		}

		// Search!
	case 'SEARCH_ARTIST_FULFILLED':
		return {
			...state,
			...{
				results: action.payload.data.results.artistmatches.artist,
			},
		}

		// UI actions
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
