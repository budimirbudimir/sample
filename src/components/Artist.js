import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
  toggleBio,
  addFavorite,
  removeFavorite,
  getFavorites
} from '../actions'

import starEmpty from '../../src/images/star_0.png'
import starFilled from '../images/star_1.png'

import Similar from './Similar'
import Tags from './Tags'

// FIXME This is absolute mess, sort it out (decouple)

const ArtistPage = ({
  target,
  targetImage,
  expanded,
  favoriteError,
  toggleBio,
  fetchArtist,
  addFavorite,
  removeFavorite,
  authedUserFavs,
  getFavorites
}) => {
  const [isCurrentFavorite, setCurrentFavorite] = useState(false)

  useEffect(() => {
    const userID = localStorage.getItem('currentUser')

    const currentFavs =
      authedUserFavs && authedUserFavs.length > 0
        ? authedUserFavs.map(fav => fav.id === target.mbid)
        : []
    const isCurrentFavorite = currentFavs.length > 0

    setCurrentFavorite(isCurrentFavorite)

    // Get favorite artists by user
    if (userID) getFavorites(userID)
  }, [])

  const handleAddFavorite = () => {
    const userID = localStorage.getItem('currentUser')

    if (userID)
      addFavorite(userID, target).then(() => {
        // If user had no favorites prior to adding this, pull new list when done with adding
        if (!authedUserFavs) getFavorites(userID)
      })
  }

  const handleRemoveFavorite = artistID => {
    const userID = localStorage.getItem('currentUser')
    if (userID) removeFavorite(userID, artistID)
  }

  return (
    <div className="ArtistPage">
      {target.name !== '' && (
        <div className="App-info">
          <div className="App-info_details">
            <img src={targetImage} alt="" />
          </div>

          <div className="App-info_bio">
            <h2>
              <a
                className="App-bio_title"
                href={target.bio.links.link.href}
                target="blank"
                rel="noreferrer noopener"
              >
                {target.name}
              </a>

              {isCurrentFavorite ? (
                <img
                  src={starFilled}
                  alt="dislike"
                  className="App-fav_star"
                  onClick={() => handleRemoveFavorite(target.mbid)}
                />
              ) : (
                <img
                  src={starEmpty}
                  alt="like"
                  className="App-fav_star"
                  onClick={handleAddFavorite}
                />
              )}
            </h2>

            {favoriteError && (
              <p style={{ color: '#d8000c' }}>{favoriteError}</p>
            )}

            <p>
              Listeners: <strong>{target.stats.listeners}</strong>
              <br />
              Total plays: <strong>{target.stats.playcount}</strong>
            </p>

            {expanded ? (
              <p className="App-bio_text">
                <span
                  dangerouslySetInnerHTML={{ __html: target.bio.content }}
                />
                <br />
                <button className="App-bio_link" onClick={toggleBio}>
                  View Less
                </button>
              </p>
            ) : (
              <p className="App-bio_text">
                <span
                  dangerouslySetInnerHTML={{ __html: target.bio.summary }}
                />
                <br />
                <button className="App-bio_link" onClick={toggleBio}>
                  View More
                </button>
              </p>
            )}

            <Similar
              similar={target.similar.artist}
              fetchArtist={fetchArtist}
            />
            <Tags tags={target.tags.tag} />
          </div>
        </div>
      )}
    </div>
  )
}

//#region REDUX CONNECTION
const mapStateToProps = state => ({
  target: state.artists.target,
  targetImage: state.artists.targetImage,
  expanded: state.artists.expanded,
  favoriteError: state.user.favoriteError,
  authedUserFavs: state.user.authedUserFavs
})
const mapDispatchToProps = dispatch => ({
  addFavorite: (userID, artist) => dispatch(addFavorite(userID, artist)),
  removeFavorite: (userID, artistID) =>
    dispatch(removeFavorite(userID, artistID)),
  getFavorites: userID => dispatch(getFavorites(userID)),
  toggleBio: () => dispatch(toggleBio())
})
//#endregion

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistPage)
