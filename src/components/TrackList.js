// TrackList component for rendering a list of tracks
// Used by both SearchResults and Playlist components

import React from 'react';
import Track from './Track';
import './TrackList.css';

function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div className="track-list">
      {tracks.map(track => (
        <Track 
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
}

export default TrackList;