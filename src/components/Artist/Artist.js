import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import {
  toggleBio,
  addFavorite,
  removeFavorite,
  getFavorites
} from '../../redux/actionsContainer'

import starEmpty from '../../images/star_0.png'
import starFilled from '../../images/star_1.png'

import Similar from '../Similar/Similar'
import Tags from '../Tags/Tags'

// FIXME This is absolute mess, sort it out (decouple)

const Bio = ({ content, toggleBio, txt }) => (
  <p className="App-bio_text">
    <span dangerouslySetInnerHTML={{ __html: content }} />
    <br />
    <button className="App-bio_link" onClick={toggleBio}>
      {txt}
    </button>
  </p>
)

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

    // TODO This one is dirty and not working, fix it!
    const currentFavs =
      authedUserFavs && authedUserFavs.length > 0
        ? authedUserFavs.map(fav => fav.id === target.mbid)
        : []
    const isCurrentFavorite = currentFavs.filter(c => c === true).length > 0
    console.log({ currentFavs, isCurrentFavorite })

    setCurrentFavorite(isCurrentFavorite)

    // Get favorite artists by user
    if (userID) getFavorites(userID)
  }, [target])

  const handleAddFavorite = () => {
    const userID = localStorage.getItem('currentUser')
    if (userID) addFavorite(userID, target)
    setCurrentFavorite(true)
  }

  const handleRemoveFavorite = artistID => {
    const userID = localStorage.getItem('currentUser')
    if (userID) removeFavorite(userID, artistID)
    setCurrentFavorite(false)
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
              <Bio
                content={target.bio.content}
                toggleBio={toggleBio}
                txt="View Less"
              />
            ) : (
              <Bio
                content={target.bio.summary}
                toggleBio={toggleBio}
                txt="View More"
              />
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
