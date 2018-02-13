import axios from 'axios'

import { API_URL } from '../utils'

export const fetchTrending = () => ({
	type: 'FETCH_TRENDING',
	payload: axios.get(`${API_URL}&method=chart.getTopArtists`),
})

export const setArtist = name => ({
	type: 'SET_ARTIST',
	payload: axios.get(`${API_URL}&method=artist.getInfo&artist=${name}`),
})

export const toggleBio = () => ({
	type: 'TOGGLE_BIO',
})
