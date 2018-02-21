// @flow

import axios from 'axios'

import { API_URL } from '../config'
import type { Artist, TopArtist, TopTrack } from '../models'

type fetchTrendingAction = { type: 'FETCH_TRENDING', payload: TopArtist[] }
type fetchTopTracksAction = { type: 'FETCH_TOP_TRACKS', payload: TopTrack[] }
type setArtistAction = { type: 'SET_ARTIST', payload: Artist }
type searchArtistAction = { type: 'SEARCH_ARTIST', payload: TopArtist[] }
type toggleBioAction = { type: 'TOGGLE_BIO' }

// DATA ACTIONS
export const fetchTrending = (): fetchTrendingAction => ({
	type: 'FETCH_TRENDING',
	payload: axios.get(`${API_URL}&method=chart.getTopArtists`),
})

export const fetchTopTracks = (): fetchTopTracksAction => ({
	type: 'FETCH_TOP_TRACKS',
	payload: axios.get(`${API_URL}&method=chart.getTopTracks`),
})

export const setArtist = (name: string): setArtistAction => ({
	type: 'SET_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.getInfo&artist=${name}`),
})

export const searchArtist = (name: string): searchArtistAction => ({
	type: 'SEARCH_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.search&artist=${name}&limit=10`),
})

// UI ACTIONS

// Simply toggles current artist's biography/summary
export const toggleBio = (): toggleBioAction => ({
	type: 'TOGGLE_BIO',
})
