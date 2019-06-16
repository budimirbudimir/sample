import React from 'react'

import starEmpty from '../../src/images/star_0.png'
import starFilled from '../images/star_1.png'

import Similar from './Similar'
import Tags from './Tags'

const ArtistPage = ({
  target,
  targetImage,
  expanded,
  favoriteError,
  isCurrentFavorite,
  toggleBio,
  fetchArtist,
  handleAddFavorite,
  handleRemoveFavorite
}) => (
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

          {favoriteError && <p style={{ color: '#d8000c' }}>{favoriteError}</p>}

          <p>
            Listeners: <strong>{target.stats.listeners}</strong>
            <br />
            Total plays: <strong>{target.stats.playcount}</strong>
          </p>

          {expanded ? (
            <p className="App-bio_text">
              <span dangerouslySetInnerHTML={{ __html: target.bio.content }} />
              <br />
              <button className="App-bio_link" onClick={toggleBio}>
                View Less
              </button>
            </p>
          ) : (
            <p className="App-bio_text">
              <span dangerouslySetInnerHTML={{ __html: target.bio.summary }} />
              <br />
              <button className="App-bio_link" onClick={toggleBio}>
                View More
              </button>
            </p>
          )}

          <Similar similar={target.similar.artist} fetchArtist={fetchArtist} />
          <Tags tags={target.tags.tag} />
        </div>
      </div>
    )}
  </div>
)

export default ArtistPage
