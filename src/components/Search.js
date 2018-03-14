// @flow

import React from 'react'

import { TopArtist } from '../models'

type Props = {
	// query is current search query string entered in the input field
	query: string,
	// showDropdown is boolean indicating if search dropdown is visible
	showDropdown: boolean,
	// results is array containing current search query results
	results: TopArtist[],
	// change is function setting 'query' param on state of container component
	change: (SyntheticEvent<HTMLInputElement>) => void,
	// keypress is function executing searchArtist() function on regular key press
	// or submitting search form by running findArtist() function on 'Enter' key
	keypress: (SyntheticEvent<HTMLInputElement>) => void,
	// focus is function setting 'showDropdown' param on state of container component
	focus: () => void,
	// blur is function setting 'showDropdown' param on state of container component
	blur: () => void,
	// findArtist is function to get current artist data (passed from container)
	findArtist: () => void,
	// fetchArtist is function to get current artist data (passed from container)
	fetchArtist: string => void,
}

const Search = ({
	change,
	keypress,
	focus,
	blur,
	findArtist,
	fetchArtist,
	showDropdown,
	query,
	results,
}: Props) => (
	<div>
		<div className="App-search_container">
			<input
				className="App-search"
				type="text"
				placeholder="Enter search query"
				onChange={change}
				onKeyPress={keypress}
				onFocus={focus}
				onBlur={blur}
			/>
			<button className="App-search-button" onClick={findArtist}>
				Search
			</button>
		</div>

		{showDropdown &&
			query !== '' &&
			query.length > 2 && (
				<ul className="Search-results">
					{results &&
						results.map((value, index) => (
							<li
								key={index}
								className="Search-result"
								onClick={() => fetchArtist(value.name)}
							>
								<img src={value.image['0']['#text']} alt="" />
								{value.name}
							</li>
						))}
				</ul>
			)}
	</div>
)

export default Search
