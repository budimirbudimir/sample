import * as types from './actionTypes'

const initialTarget = {
  name: '',
  link: '',
  stats: {
    listeners: '',
    playcount: ''
  },
  bio: '',
  summary: '',
  image: '',
  similar: [],
  tags: []
  // isFavorite: false,
}

export const initialState = {
  topTracks: [],
  topArtists: [],
  fetchingTrending: false,
  fetchedTrending: false,
  target: initialTarget,
  fetchingTarget: false,
  fetchedTarget: false,
  expanded: false,
  results: []
}

const artists = (state = initialState, action) => {
  switch (action.type) {
    // Trending section actions
    case `${types.FETCH_TRENDING}_REJECTED`:
      return {
        ...state,
        ...{ error: action.payload }
      }
    case `${types.FETCH_TRENDING}_FULFILLED`:
      return {
        ...state,
        ...{ topArtists: action.payload }
      }

    case `${types.FETCH_TOP_TRACKS}_FULFILLED`:
      return {
        ...state,
        ...{ topTracks: action.payload }
      }

    // Current artist actions
    case `${types.SEARCH_ARTIST}_FULFILLED`:
      return {
        ...state,
        ...{ results: action.payload }
      }
    case `${types.SET_ARTIST}_REJECTED`:
      return {
        ...state,
        ...{ error: action.payload }
      }
    case `${types.SET_ARTIST}_FULFILLED`:
      return {
        ...state,
        ...{
          target: action.payload,
          targetImage: action.payload.image['3']['#text']
        }
      }
    case types.TOGGLE_BIO:
      return {
        ...state,
        ...{ expanded: !state.expanded }
      }

    // Fallback functionality
    default:
      return state
  }
}

export default artists
