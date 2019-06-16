import React from 'react'

import '../../Footer.css'

// TODO Drop inline fetchArtist(), also nested levels of JSX
const Trending = ({ artists, fetchArtist }) => (
  <div>
    {artists.length > 0 && (
      <div className="App-trending">
        <p>Trending Artists:</p>

        <ul className="App-results">
          {artists.map((item, index) => (
            <li
              className="App-result"
              key={index}
              onClick={() => fetchArtist && fetchArtist(item.name)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
)

export default Trending
