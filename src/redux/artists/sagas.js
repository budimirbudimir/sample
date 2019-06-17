import { takeLatest, call, put, all } from 'redux-saga/effects'

import * as types from './actionTypes'

import {
  apiFetchTrending,
  apiTopTracks,
  apiSetArtist,
  apiSearchArtist
} from './api'

// #region FETCH TRENDING
function* fetchTrending() {
  // Get Trending from API
  const trending = yield call(apiFetchTrending)

  // Store obtained Trending to Redux
  yield put({
    type: `${types.FETCH_TRENDING}_FULFILLED`,
    payload: trending
  })
}
// #endregion

// #region FETCH TOP TRACKS
function* fetchTopTracks() {
  // Get Top Tracks from API
  const topTracks = yield call(apiTopTracks)

  // Store obtained Top Tracks to Redux
  yield put({
    type: `${types.FETCH_TOP_TRACKS}_FULFILLED`,
    payload: topTracks
  })
}
// #endregion

// #region SET ARTIST
function* setArtist(action) {
  const { payload } = action

  // Get Picked Artist from API
  const pickedArtist = yield call(apiSetArtist, payload)

  // Store obtained Picked Artist to Redux
  yield put({
    type: `${types.SET_ARTIST}_FULFILLED`,
    payload: pickedArtist
  })
}
// #endregion

// #region SEARCH ARTIST
function* searchArtist(action) {
  const { payload } = action

  // Get Found Artist from API
  const foundArtist = yield call(apiSearchArtist, payload)

  // Store obtained Found Artist to Redux
  yield put({
    type: `${types.SEARCH_ARTIST}_FULFILLED`,
    payload: foundArtist
  })
}
// #endregion

export default function* watchArtistsSagas() {
  yield all([
    yield takeLatest(types.FETCH_TRENDING, fetchTrending),
    yield takeLatest(types.FETCH_TOP_TRACKS, fetchTopTracks),
    yield takeLatest(types.SET_ARTIST, setArtist),
    yield takeLatest(types.SEARCH_ARTIST, searchArtist)
  ])
}
