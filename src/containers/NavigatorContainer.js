// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
	fetchTrending,
	setArtist,
	searchArtist,
	toggleBio,
} from '../actions/artists'
import '../styles/App.css'
import '../styles/Search.css'

import ArtistContainer from '../containers/ArtistContainer'
import Trending from '../components/Trending'
import Search from '../components/Search'

import type { Artist, TopArtist } from '../models'

type PropsFromState = {
	// expanded points to current target artists bio state (show more/less)
	expanded: boolean,
	// topArtists is array containing all artists from Trending chart
	// with their relevant data
	topArtists: TopArtist[],
	// target is object containing all relevant target artist' data
	target: Artist,
	// targetImage is string representing target artist image URL
	targetImage: string,
	// results is array containing current search query results
	results: TopArtist[],
}

type PropsFromDispatch = {
	// fetchTrending is action for fetching all Trending chart artists
	// together with their relevant data
	fetchTrending: () => void,
	// setArtist is action for fetching artist by current search query
	searchArtist: string => void,
	// toggleBio is action for toggling current/target artist bio (show more/less)
	toggleBio: () => void,
	// setArtist is action to set current target artist data into details view
	setArtist: string => void,
	// getFavorites is action to fetch current user's favorites from DB
	getFavorites: string => void,
}

type OwnState = {
	// query is current search query string entered in the input field
	query: string,
	// showDropdown is boolean indicating if search dropdown is visible
	showDropdown: boolean,
}

type Props = PropsFromState & PropsFromDispatch

const DROPDOWN_TIMEOUT = 300

class NavigatorContainer extends Component<Props, OwnState> {
	state = {
		query: '',
		showDropdown: false,
	}

	componentDidMount() {
		const { fetchTrending } = this.props

		// Get trending artists
		fetchTrending()
	}

	fetchArtist = (name: string) => {
		const { setArtist } = this.props

		// Find and set target artist
		setArtist(name)
	}

	searchArtist = () => {
		const { searchArtist } = this.props
		const { query } = this.state

		// Find and set target artist (if 3+ chars entered)
		if (query.length >= 2) searchArtist(query)
	}

	findArtist = () => {
		const { query } = this.state

		// Fetch artist data
		this.fetchArtist(query)
	}

	handleChange = e => {
		// Sync the current query locally
		this.setState({ query: e.target.value })
	}

	handleKeypress = e => {
		// If key pressed is Enter, run find/fetch artist action
		if (e.key === 'Enter') {
			this.findArtist()
		} else {
			this.searchArtist()
		}
	}

	handleFocus = () => {
		this.setState({ showDropdown: true })
	}

	handleBlur = () => {
		setTimeout(() => {
			this.setState({ showDropdown: false })
		}, DROPDOWN_TIMEOUT)
	}

	render() {
		const {
			target,
			targetImage,
			topArtists,
			expanded,
			toggleBio,
			results,
		} = this.props
		const { query, showDropdown } = this.state

		return (
			<div className="App-content_container">
				<div className="App-content">
					<Search
						change={this.handleChange}
						keypress={this.handleKeypress}
						focus={this.handleFocus}
						blur={this.handleBlur}
						findArtist={this.findArtist}
					/>

					<ArtistContainer
						target={target}
						targetImage={targetImage}
						toggleBio={toggleBio}
						fetchArtist={this.fetchArtist}
						expanded={expanded}
						results={results}
						showDropdown={showDropdown}
						query={query}
					/>
				</div>

				<Trending artists={topArtists} fetchArtist={this.fetchArtist} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		target: state.artists.target,
		targetImage: state.artists.targetImage,
		expanded: state.artists.expanded,
		topArtists: state.artists.topArtists,
		results: state.artists.results,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchTrending: () => dispatch(fetchTrending()),
		toggleBio: () => dispatch(toggleBio()),
		setArtist: name => dispatch(setArtist(name)),
		searchArtist: name => dispatch(searchArtist(name)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigatorContainer)
