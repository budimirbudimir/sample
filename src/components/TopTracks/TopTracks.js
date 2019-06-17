import React from 'react'

import { numberWithCommas } from '../../utils'
import Avatar from '../Avatar'
import './TopTracks.css'

// Mapping table headings
const titleLine = {
  name: 'Track Name',
  playcount: 'Total Plays',
  listeners: 'Total Listeners',
  artist: { name: 'Artist Name' }
}

const TopTracks = ({ tracks, goTo }) => {
  // Add table headings line to the front of array
  const withHeadings = [titleLine].concat(tracks)

  const renderButton = name => (
    <button className="TopTracks-link" onClick={() => goTo(name)}>
      {name}
    </button>
  )

  return (
    <ul className="TopTracks">
      {withHeadings.map((track, index) => (
        <li key={index}>
          <div className="TopTracks-track">
            <div style={{ flex: 1 }}>{index !== 0 && index}</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              {index === 0 ? (
                'Image'
              ) : (
                <Avatar name={track.artist.name} size="small" />
              )}
            </div>
            <div style={{ flex: 4 }}>{track.name}</div>
            <div style={{ flex: 4 }}>
              {index === 0
                ? track.artist.name
                : renderButton(track.artist.name)}
            </div>
            <div style={{ flex: 2 }} className="TopTracks-hidden_mobile">
              {numberWithCommas(track.listeners)}
            </div>
            <div style={{ flex: 2 }} className="TopTracks-hidden_mobile">
              {numberWithCommas(track.playcount)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TopTracks
