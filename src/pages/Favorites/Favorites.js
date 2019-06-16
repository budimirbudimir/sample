import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getFavorites, removeFavorite } from '../../redux/user/actions'
import './Favorites.css'

// #region COMPONENT
const Favorites = ({ authedUserFavs, removeFavorite, getFavorites }) => {
  useEffect(() => {
    const userID = localStorage.getItem('currentUser')

    // Get favorite artists by user
    if (userID) getFavorites(userID)
  }, [])

  const handleRemoveFavorite = artistID => {
    const userID = localStorage.getItem('currentUser')

    // Get favorite artists by user
    if (userID) removeFavorite(userID, artistID)
  }

  return (
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
}
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
//#endregion

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites)
