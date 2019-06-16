import React from 'react'
import { connect } from 'react-redux'
import { compose, withHandlers, lifecycle } from 'recompose'

import { getFavorites, removeFavorite } from '../actions'
import '../styles/Favorites.css'

const Favorites = ({ authedUserFavs, handleRemoveFavorite }) => (
  <div className="Favorites">
    <div className="Favorites-inner">
      <h3>Your favorite artists</h3>

      {authedUserFavs && (
        <div className="Favorites-list">
          {authedUserFavs.map((item, index) => (
            <div className="Favorites-item" key={index}>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <button
                className="Favorites-link"
                onClick={() => handleRemoveFavorite(item.id)}
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)

//#region COMPONENT METHODS
const withComponentHandlers = withHandlers({
  handleRemoveFavorite: ({ removeFavorite }) => artistID => {
    const userID = localStorage.getItem('currentUser')

    // Get favorite artists by user
    if (userID) removeFavorite(userID, artistID)
  }
})
//#endregion

//#region LIFECYCLE METHODS
const withLifecycleMethods = lifecycle({
  componentDidMount() {
    const userID = localStorage.getItem('currentUser')

    // Get favorite artists by user
    if (userID) this.props.getFavorites(userID)
  }
})
//#endregion

//#region REDUX CONNECTION
const mapStateToProps = state => ({
  authedUserFavs: state.user.authedUserFavs
})
const mapDispatchToProps = dispatch => ({
  getFavorites: userID => dispatch(getFavorites(userID)),
  removeFavorite: (userID, artistID) =>
    dispatch(removeFavorite(userID, artistID))
})
const withReduxConnection = connect(
  mapStateToProps,
  mapDispatchToProps
)
//#endregion

export default compose(
  withReduxConnection,
  withComponentHandlers,
  withLifecycleMethods
)(Favorites)
