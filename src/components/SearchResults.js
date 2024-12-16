// SearchResults component to display the results of track search
// Shows list of tracks that match search criteria

import React from 'react';
import TrackList from './TrackList';
import './SearchResults.css';

const SearchResults = ({ searchResults, onAdd }) => {
  return (
    <div className="search-results">
      <h2>Results</h2>
      <TrackList 
        tracks={searchResults} 
        onAdd={onAdd}
        isRemoval={false}
      />
    </div>
  );
};

export default SearchResults;