import React from 'react'

import '../styles/Favorites.css'

const Favorites = ({ authedUserFavs, handleRemoveFavorite }) => (
	<div className="Favorites">
		<div className="Favorites-inner">
			<h3>Your favorite artists</h3>

			{authedUserFavs && (
				<div className="Favorites-list">
					{authedUserFavs.map((item, index) => (
						<div className="Favorites-item" key={index}>
							<img src={item.image} alt={item.name} />
							<p>{item.name}</p>
							<a className='Favorites-link' onClick={() => handleRemoveFavorite(item.id)}>x</a>
						</div>
					))}
				</div>
			)}
		</div>
	</div>
)

export default Favorites
