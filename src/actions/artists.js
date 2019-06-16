import axios from 'axios'

import { API_URL } from '../config'
import * as types from '../actionTypes'

export const fetchTrending = () => ({
  type: types.FETCH_TRENDING,
  payload: axios
    .get(`${API_URL}&method=chart.getTopArtists`)
    .then(result => result.data && result.data.artists.artist)
})

export const fetchTopTracks = () => ({
  type: types.FETCH_TOP_TRACKS,
  payload: axios
    .get(`${API_URL}&method=chart.getTopTracks`)
    .then(result => result.data && result.data.tracks.track)
})

export const setArtist = name => ({
  type: types.SET_ARTIST,
  payload: axios
    .get(`${API_URL}&method=artist.getInfo&artist=${name}`)
    .then(result => result.data && result.data.artist)
})

export const searchArtist = name => ({
  type: types.SEARCH_ARTIST,
  payload: axios
    .get(`${API_URL}&method=artist.search&artist=${name}&limit=10`)
    .then(result => result.data && result.data.results.artistmatches.artist)
})

export const toggleBio = () => ({
  type: types.TOGGLE_BIO
})
