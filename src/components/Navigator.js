import React from 'react'

import ArtistContainer from '../containers/ArtistContainer'
import Trending from './Trending'
import Search from './Search'

// TODO: Organize these components better (param splitting)!

const Navigator = ({
  handleChange,
  handleKeypress,
  handleFocus,
  handleBlur,
  findArtist,
  fetchArtist,
  results,
  showDropdown,
  query,

  target,
  targetImage,
  toggleBio,
  expanded,

  topArtists
}) => {
  return (
    <div className="App-content_container">
				<div className="App-content">
					<Search
						change={handleChange}
						keypress={handleKeypress}
						focus={handleFocus}
						blur={handleBlur}
						findArtist={findArtist}
						fetchArtist={fetchArtist}
						results={results}
						showDropdown={showDropdown}
						query={query}
					/>

					<ArtistContainer
						target={target}
						targetImage={targetImage}
						toggleBio={toggleBio}
						expanded={expanded}
						fetchArtist={fetchArtist}
					/>
				</div>

				<Trending
          artists={topArtists}
          fetchArtist={fetchArtist}
        />
			</div>
  )
}

export default Navigator