import React from 'react'

import './TopTracks.css'

// Mapping table headings
const titleLine = {
  name: 'Track Name',
  playcount: 'Total Plays',
  listeners: 'Total Listeners',
  artist: { name: 'Artist Name' }
}

const TopTracks = ({ tracks }) => {
  // Add table headings line to the front of array
  const withHeadings = [titleLine].concat(tracks)

  return (
    <ul className="TopTracks">
      {withHeadings.map((track, index) => (
        <li key={index}>
          <div className="TopTracks-track">
            <div style={{ flex: 1 }}>{index !== 0 && index}</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <img src={track.image && track.image['0']['#text']} alt="" />
            </div>
            <div style={{ flex: 4 }}>{track.name}</div>
            <div style={{ flex: 4 }}>{track.artist.name}</div>
            <div style={{ flex: 2 }} className="TopTracks-hidden_mobile">
              {track.listeners}
            </div>
            <div style={{ flex: 2 }} className="TopTracks-hidden_mobile">
              {track.playcount}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TopTracks
