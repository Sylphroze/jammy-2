// Playlist component for managing the user's custom playlist
// Allows users to name their playlist and view selected tracks

import React from 'react';
import TrackList from './TrackList';
import './Playlist.css';

const Playlist = ({ playlistName, playlistTracks, onNameChange, onRemove }) => {
  const handleNameChange = (event) => {
    onNameChange(event.target.value);
  };

  return (
    <div className="playlist">
      <input 
        value={playlistName}
        onChange={handleNameChange}
        placeholder="New Playlist"
      />
      <TrackList 
        tracks={playlistTracks}
        onRemove={onRemove}
        isRemoval={true}
      />
      <button className="playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};

export default Playlist;