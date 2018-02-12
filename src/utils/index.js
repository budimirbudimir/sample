import RapidAPI from 'rapidapi-connect'

export const rapid = new RapidAPI(
  'default-application_5a7ddde9e4b06ec3937ac281',
  'c10f94d5-2232-45b5-8954-743ddcec17a0'
)

export const lastfmKey = '6a1df7cb8c230be8d4ac930b554279aa'

export const API_URL = `http://ws.audioscrobbler.com/2.0/?format=json&api_key=${lastfmKey}`
