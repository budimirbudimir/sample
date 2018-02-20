import { Component } from 'react'

export type LocationProps = {
	hash: string,
	key: string,
	pathname: string,
	search: string,
}

export type RouteProps = {
	// component is React component to be parsed in the route
	component: Component,
	// authed is boolean defining if user is authenticated and if user has
	// access to session-locked content/pages
	authed: boolean,
	// location is (optional) object containing route location data
	location?: LocationProps,

	// May contain more props as per rest operator
}

export type Artist = {
	bio: Bio,
	image: string[],
	mbid: string,
	name: string,
	ontour: number,
	similar: { artist: SimilarArtist[] },
	stats: Stats,
	streamable: number,
	tags: Tag[],
	url: string,
}

export type SimilarArtist = {
	image: string[],
	name: string,
	url: string,
}

export type TopArtist = {
	name: string,
	image: Object[],
	listeners: number,
	playcount: number,
	mbid: string,
	streamable: number, // check again
	url: string,
}

export type FavoriteArtist = {
	id: string,
	image: string,
	name: string,
}

export type Tag = {
	name: string,
	url: string,
}

export type Bio = {
	content: string,
	links: { link: Link },
	published: string,
	summary: string,
}

export type Link = {
	text: string,
	href: string,
	rel: string,
}

export type Stats = {
	listeners: number,
	playcount: number,
}

export type User = {
	email: string,
	uid: string,
}
