// @flow

import axios from 'axios'

import { API_URL } from '../config'
import type { Artist, TopArtist } from '../models'

type fetchTrendingAction = { type: 'FETCH_TRENDING', payload: TopArtist[] }
type setArtistAction = { type: 'SET_ARTIST', payload: Artist }
type searchArtistAction = { type: 'SEARCH_ARTIST', payload: TopArtist[] }
type toggleBioAction = { type: 'TOGGLE_BIO' }

// DATA FETCHING ACTIONS
export const fetchTrending = (): fetchTrendingAction => ({
	type: 'FETCH_TRENDING',
	payload: axios.get(`${API_URL}&method=chart.getTopArtists`),
})

export const setArtist = (name: string): setArtistAction => ({
	type: 'SET_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.getInfo&artist=${name}`),
})

// NOTE: In progress
export const searchArtist = (name: string): searchArtistAction => ({
	type: 'SEARCH_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.search&artist=${name}&limit=10`),
})

// UI ACTIONS

// Simply toggles current artist's biography/summary
export const toggleBio = (): toggleBioAction => ({
	type: 'TOGGLE_BIO',
})
