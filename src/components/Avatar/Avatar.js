import React from 'react'

const Avatar = ({ name, size }) => (
  <div className={`App-info_avatar ${size}`}>
    {name
      .split(' ')
      .map(n => n[0])
      .join('')}
  </div>
)

export default Avatar
