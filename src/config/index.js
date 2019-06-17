// TODO Check new Firebase imports and optimize
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// cSpell:disable
const lastfmKey = '6a1df7cb8c230be8d4ac930b554279aa'

const config = {
  apiKey: 'AIzaSyCHdscz9_M3G8vlLlU_Qj9xaRUL9UTH3p8',
  authDomain: 'budimir-sample.firebaseapp.com',
  databaseURL: 'https://budimir-sample.firebaseio.com',
  projectId: 'budimir-sample',
  storageBucket: '',
  messagingSenderId: '286933467978'
}

firebase.initializeApp(config)

export const API_URL = `https://ws.audioscrobbler.com/2.0/?format=json&api_key=${lastfmKey}`
// cSpell:enable

export const db = firebase.database().ref()
export const firebaseAuth = firebase.auth
