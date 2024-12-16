// SearchBar component for handling user input and search functionality
// Provides interface for users to search for tracks

import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a song, album, or artist"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button type="submit" className="search-button">
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;