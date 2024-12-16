// Track component for displaying individual track information
// Shows track name, artist, album, and add/remove button

import React from 'react';
import './Track.css';

// Component to render individual track information
const Track = ({ track, isRemoval, onAdd, onRemove }) => {
  const handleClick = () => {
    if (isRemoval) {
      onRemove(track);
    } else {
      onAdd(track);
    }
  };

  return (
    <div className="track">
      <div className="track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button 
        className="track-action"
        onClick={handleClick}
      >
        {isRemoval ? '-' : '+'}
      </button>
    </div>
  );
};

export default Track;