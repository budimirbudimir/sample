import { takeLatest, call, all, put } from 'redux-saga/effects'

import * as types from './actionTypes'

import {
  apiAuth,
  apiLogin,
  apiLogout,
  apiResetPassword,
  apiSaveUser,
  saveLocal
} from './api'

// #region AUTH/REGISTRATION
function* authSaga(action) {
  const { payload } = action

  const authedUser = yield call(apiAuth, payload)
  console.log('Auth response:', { payload, authedUser })

  try {
    yield put({
      type: `${types.AUTH}_FULFILLED`,
      payload: authedUser
    })
    const savedUser = yield call(apiSaveUser, authedUser)

    console.log({ authedUser, savedUser })
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
  console.log('Login response:', { payload, loginResponse })

  try {
    yield put({
      type: `${types.LOGIN}_FULFILLED`,
      payload: loginResponse
    })
    const savedLocally = yield call(saveLocal, loginResponse)

    console.log({ loginResponse, savedLocally })
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
}
// #endregion

// #region RESET PASSWORD
function* resetPasswordSaga(action) {
  const { payload } = action

  const resetResponse = yield call(apiResetPassword, payload)
  yield console.log('Reset response:', { payload, resetResponse })
}
// #endregion

export default function* watchUserSagas() {
  yield all([
    yield takeLatest(types.AUTH, authSaga),
    yield takeLatest(types.LOGIN, loginSaga),
    yield takeLatest(types.LOGOUT, logoutSaga),
    yield takeLatest(types.RESET_PASSWORD, resetPasswordSaga)
  ])
}
