// @flow

import React from 'react'

import '../styles/Favorites.css'

import type { FavoriteArtist } from '../models'

type Props = {
	// authedUserFavs is array indicating which artists current user favorited
	authedUserFavs: FavoriteArtist[],
	// removeFavorite is action to remove current target artist (in detail view)
	// from current user's favorites in DB
	handleRemoveFavorite: string => void,
}

const Favorites = ({ authedUserFavs, handleRemoveFavorite }: Props) => (
	<div className="Favorites">
		<div className="Favorites-inner">
			<h3>Your favorite artists</h3>

			{authedUserFavs && (
				<div className="Favorites-list">
					{authedUserFavs.map((item, index) => (
						<div className="Favorites-item" key={index}>
							<img src={item.image} alt={item.name} />
							<p>{item.name}</p>
							<a onClick={() => handleRemoveFavorite(item.id)}>x</a>
						</div>
					))}
				</div>
			)}
		</div>
	</div>
)

export default Favorites
