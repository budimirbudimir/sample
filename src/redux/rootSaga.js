import { all } from 'redux-saga/effects'

import watchUserSagas from './user/sagas'
import watchArtistsSagas from './artists/sagas'

export default function* rootSaga() {
  yield all([watchUserSagas(), watchArtistsSagas()])
}
