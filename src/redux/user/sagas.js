import { takeLatest, call, all, put } from 'redux-saga/effects'

import * as types from './actionTypes'

import { getFavorites } from './actions'

import {
  apiAuth,
  apiLogin,
  apiLogout,
  apiResetPassword,
  apiSaveUser,
  saveLocal,
  apiGetFavorites,
  apiRemoveFavorite,
  apiAddFavorite
} from './api'

// #region AUTH/REGISTRATION
function* authSaga(action) {
  const { payload } = action

  const authedUser = yield call(apiAuth, payload)

  try {
    yield put({
      type: `${types.AUTH}_FULFILLED`,
      payload: authedUser
    })
    yield call(apiSaveUser, authedUser)
  } catch (err) {
    yield put({
      type: `${types.AUTH}_REJECTED`,
      payload: { message: err || 'Authorization failed!' }
    })
  }
}
// #endregion

// #region LOGIN
function* loginSaga(action) {
  const { payload } = action

  const loginResponse = yield call(apiLogin, payload)

  try {
    yield put({
      type: `${types.LOGIN}_FULFILLED`,
      payload: loginResponse
    })
    yield call(saveLocal, loginResponse.user)
  } catch (err) {
    yield put({
      type: `${types.LOGIN}_REJECTED`,
      payload: { message: err || 'Login failed!' }
    })
  }
}
// #endregion

// #region LOGOUT
function* logoutSaga() {
  yield call(apiLogout)
  localStorage.removeItem('currentUser')
}
// #endregion

// #region RESET PASSWORD
function* resetPasswordSaga(action) {
  const { payload } = action

  yield call(apiResetPassword, payload)
}
// #endregion

// #region SAVE USER TO DB
function* saveUserSaga(action) {
  // Saves newly registered user's data in DB
  const { payload } = action

  const result = yield call(apiSaveUser, payload)

  yield put({
    type: `${types.SAVE_USER}`,
    payload: result
  })
}
// #endregion

// #region GET FAVORITES FROM DB
function* getFavoritesSaga(action) {
  // Gets current user's favorite artists list
  const { payload } = action

  const result = yield call(apiGetFavorites, payload)

  try {
    yield put({
      type: `${types.GET_FAVORITES}_FULFILLED`,
      payload: result
    })
  } catch (err) {
    yield put({
      type: `${types.GET_FAVORITES}_REJECTED`,
      payload: { message: err || 'Fetching user favorites failed!' }
    })
  }
}
// #endregion

// #region ADD FAVORITE TO DB
function* addFavoriteSaga(action) {
  // Saves current artist into current user's favorites
  const { payload } = action

  const result = yield call(apiAddFavorite, payload)

  try {
    yield put({
      type: `${types.ADD_FAVORITE}_FULFILLED`,
      payload: result
    })
    const userID = localStorage.getItem('currentUser')
    yield call(getFavorites, userID)
  } catch (err) {
    yield put({
      type: `${types.ADD_FAVORITE}_REJECTED`,
      payload: {
        message: err || `Adding user favorite ${payload.artist.mbid} failed!`
      }
    })
  }
}
// #endregion

// #region REMOVE FAVORITE FROM DB
function* removeFavoriteSaga(action) {
  // Saves current artist into current user's favorites
  const { payload } = action

  const result = yield call(apiRemoveFavorite, payload)

  try {
    yield put({
      type: `${types.REMOVE_FAVORITE}_FULFILLED`,
      payload: result
    })
  } catch (err) {
    yield put({
      type: `${types.REMOVE_FAVORITE}_REJECTED`,
      payload: {
        message: err || `Removing user favorite ${payload.artistID} failed!`
      }
    })
  }
}
// #endregion

export default function* watchUserSagas() {
  yield all([
    // AUTH WATCHERS
    yield takeLatest(types.AUTH, authSaga),
    yield takeLatest(types.LOGIN, loginSaga),
    yield takeLatest(types.LOGOUT, logoutSaga),
    yield takeLatest(types.RESET_PASSWORD, resetPasswordSaga),
    // DB WATCHERS
    yield takeLatest(types.SAVE_USER, saveUserSaga),
    yield takeLatest(types.GET_FAVORITES, getFavoritesSaga),
    yield takeLatest(types.ADD_FAVORITE, addFavoriteSaga),
    yield takeLatest(types.REMOVE_FAVORITE, removeFavoriteSaga)
  ])
}
