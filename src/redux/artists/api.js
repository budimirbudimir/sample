import axios from 'axios'

import { API_URL } from '../../config'

export const apiFetchTrending = () =>
  axios
    .get(`${API_URL}&method=chart.getTopArtists`)
    .then(result => result.data && result.data.artists.artist)

export const apiTopTracks = () =>
  axios
    .get(`${API_URL}&method=chart.getTopTracks`)
    .then(result => result.data && result.data.tracks.track)

export const apiSetArtist = name =>
  axios
    .get(`${API_URL}&method=artist.getInfo&artist=${name}`)
    .then(result => result.data && result.data.artist)

export const apiSearchArtist = name =>
  axios
    .get(`${API_URL}&method=artist.search&artist=${name}&limit=10`)
    .then(result => result.data && result.data.results.artistmatches.artist)
