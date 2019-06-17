import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getFavorites, removeFavorite } from '../../redux/user/actions'
import Avatar from '../../components/Avatar'
import './Favorites.css'

// TODO Export buttons to separate component(s)
// #region COMPONENT
const Favorites = ({
  history,
  authedUserFavs,
  removeFavorite,
  getFavorites
}) => {
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

  const handleGoToArtistInfo = artistID => {
    return history.push(`/navigator/${artistID}`)
  }

  return (
    <div className="Favorites">
      <div className="Favorites-inner">
        <h3>Your favorite artists</h3>

        {authedUserFavs && (
          <div className="Favorites-list">
            {authedUserFavs.map((item, index) => (
              <div className="Favorites-item" key={index}>
                <Avatar name={item.name} size="medium" />
                <div className="paragraph">
                  {item.name}

                  <div className="Favorites-buttons">
                    <button
                      className="Favorites-link"
                      onClick={() => handleGoToArtistInfo(item.name)}
                    >
                      Info
                    </button>
                    <button
                      className="Favorites-link"
                      onClick={() => handleRemoveFavorite(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
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
