import React from 'react'

import '../../Footer.css'

// TODO Drop inline fetchArtist(), also nested levels of JSX
const Trending = ({ artists, goTo }) => {
  return (
    <div>
      {artists && artists.length > 0 && (
        <div className="App-trending">
          <p>Trending Artists:</p>

          <ul className="App-results">
            {artists.map((item, index) => (
              <li
                className="App-result"
                key={index}
                onClick={() => goTo(item.name)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Trending
