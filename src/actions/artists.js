import axios from 'axios'

import { API_URL } from '../config'

// DATA FETCHING ACTIONS
export const fetchTrending = () => ({
	type: 'FETCH_TRENDING',
	payload: axios.get(`${API_URL}&method=chart.getTopArtists`),
})

export const setArtist = name => ({
	type: 'SET_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.getInfo&artist=${name}`),
})

// NOTE: In progress
export const searchArtist = name => ({
	type: 'SEARCH_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.search&artist=${name}&limit=10`),
})

// UI ACTIONS

// Simply toggles current artist's biography/summary
export const toggleBio = () => ({
	type: 'TOGGLE_BIO',
})
