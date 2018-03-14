import React from 'react'

type Props = {
	// change is function setting 'query' param on state of container component
	change: () => void,
	// keypress is function executing searchArtist() function on regular key press
	// or submitting search form by running findArtist() function on 'Enter' key
	keypress: () => void,
	// focus is function setting 'showDropdown' param on state of container component
	focus: () => void,
	// blur is function setting 'showDropdown' param on state of container component
	blur: () => void,
	// findArtist is function to get current artist data (passed from container)
	findArtist: () => void,
}

const Search = ({ change, keypress, focus, blur, findArtist }: Props) => (
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
)

export default Search
