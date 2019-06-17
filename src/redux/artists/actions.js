import * as types from './actionTypes'

export const fetchTrending = () => ({
  type: types.FETCH_TRENDING
})

export const fetchTopTracks = () => ({
  type: types.FETCH_TOP_TRACKS
})

export const setArtist = payload => ({
  type: types.SET_ARTIST,
  payload
})

export const searchArtist = payload => ({
  type: types.SEARCH_ARTIST,
  payload
})

export const toggleBio = () => ({
  type: types.TOGGLE_BIO
})
