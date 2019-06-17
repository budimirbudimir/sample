import React from 'react'

const Search = ({
  change,
  keypress,
  focus,
  blur,
  findArtist,
  fetchArtist,
  showDropdown,
  query,
  results
}) => (
  <div>
    <div className="App-search_container">
      <input
        className="App-search"
        type="text"
        placeholder="Enter search query"
        onChange={change}
        onKeyUp={keypress}
        onFocus={focus}
        onBlur={blur}
      />
      <button className="App-search-button" onClick={findArtist}>
        Search
      </button>
    </div>

    {showDropdown && query !== '' && query.length > 2 && (
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
